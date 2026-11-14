const COOKIE = "dta_admin";
const SESSION_DAYS = 7;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
}
function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}
async function sha256(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}
function cookieValue(request) {
  const raw = request.headers.get("Cookie") || "";
  const match = raw.match(new RegExp("(?:^|;\\s*)" + COOKIE + "=([^;]+)"));
  return match ? match[1] : "";
}
function cookieHeader(value, maxAge) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}
async function requireAdmin(request, env) {
  if (!env.DB) return false;
  const token = cookieValue(request);
  if (!token) return false;
  const hash = await sha256(token);
  const row = await env.DB.prepare("SELECT token_hash FROM sessions WHERE token_hash = ? AND expires_at > datetime('now')").bind(hash).first();
  return !!row;
}
async function seedEvents(db) {
  const count = await db.prepare("SELECT COUNT(*) AS n FROM tournaments").first();
  if (count && count.n > 0) return;
  const rows = [
    ["Open Charlies","Charlies","2026-11-29","10:00","27/64","€10.00","Singles","https://dartsspace.com/nl/tournaments/20127"],
    ["B6 Darts Tournament","B6 Hotel Restaurante","2027-01-17","10:00","12/64","€10.00","Singles","https://dartsspace.com/nl/tournaments/20210"],
    ["'T Elfde Gebod Open Darts Tournament","'T Elfde Gebod","2027-01-23","14:00","5/32","€10.00","Singles","https://dartsspace.com/nl/tournaments/20250"],
    ["Open Manifesto 2027","Manifesto","2027-01-31","10:00","12/64","€10.00","Singles","https://dartsspace.com/nl/tournaments/20211"]
  ];
  const stmt = db.prepare("INSERT INTO tournaments (name,venue,event_date,event_time,registrations,entry_fee,format,registration_url,status) VALUES (?,?,?,?,?,?,?,?, 'published')");
  for (const row of rows) await stmt.bind(...row).run();
}
async function api(request, env) {
  if (!env.DB) return json({ error: "Database binding ontbreekt. Voeg de D1-binding met naam DB toe in Cloudflare Settings > Bindings." }, 503);
  const url = new URL(request.url);
  const path = url.pathname;
  if (request.method === "GET" && path === "/api/events") {
    await seedEvents(env.DB);
    const { results } = await env.DB.prepare("SELECT id,name,venue,event_date AS date,event_time AS time,registrations,entry_fee AS fee,format,registration_url AS url FROM tournaments WHERE status='published' ORDER BY event_date,event_time").all();
    return json({ events: results || [] }, 200, { "cache-control": "public, max-age=60" });
  }
  if (request.method === "POST" && path === "/api/login") {
    if (!env.ADMIN_PASSWORD || !env.ADMIN_USERNAME) return json({ error: "Admin secrets zijn nog niet ingesteld in Cloudflare." }, 503);
    let body; try { body = await request.json(); } catch { return json({ error: "Ongeldige aanvraag." }, 400); }
    if (body.username !== env.ADMIN_USERNAME || typeof body.password !== "string" || body.password !== env.ADMIN_PASSWORD) return json({ error: "Gebruikersnaam of wachtwoord is onjuist." }, 401);
    const token = randomToken(), hash = await sha256(token);
    const expiry = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString().replace("T"," ").slice(0,19);
    await env.DB.prepare("INSERT INTO sessions (token_hash,expires_at) VALUES (?,?)").bind(hash, expiry).run();
    return json({ ok: true }, 200, { "set-cookie": cookieHeader(token, SESSION_DAYS * 86400) });
  }
  if (request.method === "POST" && path === "/api/logout") {
    const token = cookieValue(request);
    if (token) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
    return json({ ok: true }, 200, { "set-cookie": cookieHeader("", 0) });
  }
  if (request.method === "GET" && path === "/api/me") return json({ authenticated: await requireAdmin(request, env) });
  if (!await requireAdmin(request, env)) return json({ error: "Niet ingelogd." }, 401);
  if (request.method === "GET" && path === "/api/admin/events") {
    const { results } = await env.DB.prepare("SELECT * FROM tournaments ORDER BY event_date,event_time").all();
    return json({ events: results || [] });
  }
  if (request.method === "POST" && path === "/api/admin/events") {
    let b; try { b = await request.json(); } catch { return json({error:"Ongeldige aanvraag."},400); }
    const fields = [b.name,b.venue,b.event_date,b.event_time,b.registrations,b.entry_fee,b.format,b.registration_url,b.status || "published"];
    if (!String(b.name || "").trim() || !/^\d{4}-\d{2}-\d{2}$/.test(b.event_date || "")) return json({error:"Vul minimaal een naam en geldige datum in."},400);
    if (b.registration_url && !/^https?:\/\//i.test(b.registration_url)) return json({error:"De inschrijflink moet met http:// of https:// beginnen."},400);
    const r = await env.DB.prepare("INSERT INTO tournaments (name,venue,event_date,event_time,registrations,entry_fee,format,registration_url,status) VALUES (?,?,?,?,?,?,?,?,?)").bind(...fields.map(v=>String(v ?? ""))).run();
    return json({ok:true,id:r.meta.last_row_id});
  }
  const edit = path.match(/^\/api\/admin\/events\/(\d+)$/);
  if (edit && request.method === "PUT") {
    let b; try { b = await request.json(); } catch { return json({error:"Ongeldige aanvraag."},400); }
    if (!String(b.name || "").trim() || !/^\d{4}-\d{2}-\d{2}$/.test(b.event_date || "")) return json({error:"Vul minimaal een naam en geldige datum in."},400);
    if (b.registration_url && !/^https?:\/\//i.test(b.registration_url)) return json({error:"De inschrijflink moet met http:// of https:// beginnen."},400);
    await env.DB.prepare("UPDATE tournaments SET name=?,venue=?,event_date=?,event_time=?,registrations=?,entry_fee=?,format=?,registration_url=?,status=? WHERE id=?").bind(String(b.name),String(b.venue||""),String(b.event_date),String(b.event_time||""),String(b.registrations||""),String(b.entry_fee||""),String(b.format||"Singles"),String(b.registration_url||""),String(b.status||"published"),Number(edit[1])).run();
    return json({ok:true});
  }
  if (edit && request.method === "DELETE") {
    await env.DB.prepare("DELETE FROM tournaments WHERE id=?").bind(Number(edit[1])).run();
    return json({ok:true});
  }
  return json({error:"Niet gevonden."},404);
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try { return await api(request, env); }
      catch (e) { return json({error:"Serverfout. Controleer de D1-tabellen en binding."},500); }
    }
    if (url.pathname === "/admin") return Response.redirect(new URL("/admin.html", request.url), 302);
    return env.ASSETS.fetch(request);
  }
};
