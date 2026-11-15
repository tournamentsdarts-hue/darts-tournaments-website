const COOKIE = "dta_admin";
const SESSION_DAYS = 7;
const MAX_FLYER_BYTES = 8 * 1024 * 1024;
const MAX_GALLERY_BYTES = 8 * 1024 * 1024;
const ALLOWED_FLYER_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

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
function flyerUrl(key) {
  return key ? `/media/${key.split("/").map(encodeURIComponent).join("/")}` : null;
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
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS tournament_gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tournament_id INTEGER NOT NULL,
    media_key TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK(media_type IN ('winner','photo')),
    caption TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS tournament_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tournament_id INTEGER NOT NULL,
    player_name TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE
  )`).run();
  await env.DB.prepare(`CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_hash TEXT NOT NULL,
    event_type TEXT NOT NULL,
    page TEXT NOT NULL DEFAULT '',
    target TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`).run();
  const url = new URL(request.url);
  const path = url.pathname;
  if (request.method === "POST" && path === "/api/analytics/track") {
    let body; try { body = await request.json(); } catch { return json({ok:false},400); }
    const type = body.type === "click" ? "click" : body.type === "pageview" ? "pageview" : "";
    if (!type) return json({ok:false},400);
    const existingVisitor = request.headers.get("Cookie")?.match(/(?:^|;\\s*)dta_visitor=([a-f0-9]{32,64})/)?.[1];
    const rawId = existingVisitor || randomToken();
    const visitorHash = await sha256(rawId);
    const page = String(body.page || "/").slice(0,180);
    const target = String(body.target || "").slice(0,180);
    await env.DB.prepare("INSERT INTO analytics_events (visitor_hash,event_type,page,target) VALUES (?,?,?,?)").bind(visitorHash,type,page,target).run();
    const headers = existingVisitor ? {} : { "set-cookie": `dta_visitor=${rawId}; Path=/; Max-Age=31536000; Secure; SameSite=Lax` };
    return json({ok:true},200,headers);
  }

  if (request.method === "GET" && path === "/api/gallery") {
    const { results } = await env.DB.prepare("SELECT g.id,g.tournament_id,g.media_type,g.caption,g.media_key,t.name AS tournament_name,t.event_date AS date FROM tournament_gallery g JOIN tournaments t ON t.id=g.tournament_id WHERE t.status='published' ORDER BY t.event_date DESC, CASE g.media_type WHEN 'winner' THEN 0 ELSE 1 END, g.id DESC").all();
    return json({ photos: (results || []).map(x => ({ ...x, url: flyerUrl(x.media_key) })) }, 200, { "cache-control": "public, max-age=60" });
  }
  if (request.method === "GET" && path === "/api/results") {
    const { results } = await env.DB.prepare("SELECT r.tournament_id, r.player_name, r.position, t.name AS tournament_name, t.event_date AS date FROM tournament_results r JOIN tournaments t ON t.id=r.tournament_id WHERE t.status='published' ORDER BY t.event_date DESC, r.position ASC").all();
    return json({ results: results || [] }, 200, { "cache-control": "public, max-age=60" });
  }

  if (request.method === "GET" && path === "/api/events") {
    await seedEvents(env.DB);
    const { results } = await env.DB.prepare("SELECT id,name,venue,event_date AS date,event_time AS time,registrations,entry_fee AS fee,format,registration_url AS url,flyer_key FROM tournaments WHERE status='published' ORDER BY event_date,event_time").all();
    return json({ events: (results || []).map(event => ({ ...event, flyer_url: flyerUrl(event.flyer_key) })) }, 200, { "cache-control": "public, max-age=60" });
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

  // Publicly serve only objects stored under the flyers/ prefix.
  if (path.startsWith("/media/") && request.method === "GET") {
    if (!env.BUCKET) return new Response("Media storage is not configured.", { status: 503 });
    let key;
    try { key = path.slice("/media/".length).split("/").map(decodeURIComponent).join("/"); }
    catch { return new Response("Invalid media path.", { status: 400 }); }
    if ((!key.startsWith("flyers/") && !key.startsWith("gallery/")) || key.includes("..")) return new Response("Not found.", { status: 404 });
    const object = await env.BUCKET.get(key);
    if (!object) return new Response("Not found.", { status: 404 });
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("cache-control", "public, max-age=86400");
    headers.set("x-content-type-options", "nosniff");
    return new Response(object.body, { headers });
  }

  if (!await requireAdmin(request, env)) return json({ error: "Niet ingelogd." }, 401);
  if (request.method === "GET" && path === "/api/admin/analytics") {
    const period = url.searchParams.get("period") || "30";
    const days = period === "all" ? 36500 : Math.min(3650, Math.max(1, Number(period) || 30));
    const since = new Date(Date.now() - days * 86400000).toISOString().slice(0,19).replace("T"," ");
    const filter = period === "all" ? "" : " WHERE created_at >= ?";
    const bind = period === "all" ? [] : [since];
    const total = await env.DB.prepare("SELECT COUNT(*) AS n FROM analytics_events" + filter).bind(...bind).first();
    const visitors = await env.DB.prepare("SELECT COUNT(DISTINCT visitor_hash) AS n FROM analytics_events" + filter).bind(...bind).first();
    const pages = await env.DB.prepare("SELECT COUNT(*) AS n FROM analytics_events WHERE event_type='pageview'" + (period === "all" ? "" : " AND created_at>=?")).bind(...bind).first();
    const clicks = await env.DB.prepare("SELECT COUNT(*) AS n FROM analytics_events WHERE event_type='click'" + (period === "all" ? "" : " AND created_at>=?")).bind(...bind).first();
    const top = await env.DB.prepare("SELECT target,COUNT(*) AS clicks FROM analytics_events WHERE event_type='click'" + (period === "all" ? "" : " AND created_at>=?") + " GROUP BY target ORDER BY clicks DESC LIMIT 15").bind(...bind).all();
    const daily = await env.DB.prepare("SELECT substr(created_at,1,10) AS day,SUM(event_type='pageview') AS pageviews,SUM(event_type='click') AS clicks,COUNT(DISTINCT visitor_hash) AS visitors FROM analytics_events" + (period === "all" ? "" : " WHERE created_at>=?") + " GROUP BY day ORDER BY day DESC LIMIT 60").bind(...bind).all();
    return json({visitors:visitors?.n||0,pageviews:pages?.n||0,clicks:clicks?.n||0,events:total?.n||0,top:top.results||[],daily:daily.results||[]});
  }
  if (request.method === "GET" && path === "/api/admin/analytics.csv") {
    const csvPeriod = url.searchParams.get("period") || "30";
    const csvDays = csvPeriod === "all" ? 36500 : Math.min(3650, Math.max(1, Number(csvPeriod) || 30));
    const csvSince = new Date(Date.now() - csvDays * 86400000).toISOString().slice(0,19).replace("T"," ");
    const rows = csvPeriod === "all"
      ? await env.DB.prepare("SELECT created_at,event_type,page,target,visitor_hash FROM analytics_events ORDER BY created_at DESC LIMIT 50000").all()
      : await env.DB.prepare("SELECT created_at,event_type,page,target,visitor_hash FROM analytics_events WHERE created_at>=? ORDER BY created_at DESC LIMIT 50000").bind(csvSince).all();
    const escCsv = v => '"' + String(v ?? '').replace(/"/g,'""') + '"';
    const csv = ["Datum,type,pagina,link,anonieme_bezoeker",...(rows.results||[]).map(r=>[r.created_at,r.event_type,r.page,r.target,r.visitor_hash].map(escCsv).join(","))].join("\\r\\n");
    return new Response("\\ufeff"+csv,{headers:{"content-type":"text/csv; charset=utf-8","content-disposition":"attachment; filename=website-statistieken.csv","cache-control":"no-store"}});
  }

  if (request.method === "GET" && path === "/api/admin/events") {
    const { results } = await env.DB.prepare("SELECT * FROM tournaments ORDER BY event_date,event_time").all();
    return json({ events: (results || []).map(event => ({ ...event, flyer_url: flyerUrl(event.flyer_key) })) });
  }
  if (request.method === "GET" && path === "/api/admin/results") {
    const tournamentId = Number(url.searchParams.get("tournament_id"));
    if (!Number.isInteger(tournamentId) || tournamentId < 1) return json({error:"Kies een toernooi."},400);
    const { results } = await env.DB.prepare("SELECT player_name FROM tournament_results WHERE tournament_id=? ORDER BY position").bind(tournamentId).all();
    return json({ entries: (results || []).map(x => x.player_name) });
  }
  if (request.method === "DELETE" && path === "/api/admin/results") {
    const tournamentId = Number(url.searchParams.get("tournament_id"));
    if (!Number.isInteger(tournamentId) || tournamentId < 1) return json({error:"Kies een toernooi."},400);
    const tournament = await env.DB.prepare("SELECT id FROM tournaments WHERE id=?").bind(tournamentId).first();
    if (!tournament) return json({error:"Toernooi niet gevonden."},404);
    await env.DB.prepare("DELETE FROM tournament_results WHERE tournament_id=?").bind(tournamentId).run();
    return json({ok:true});
  }
  if (request.method === "POST" && path === "/api/admin/results") {
    let b; try { b = await request.json(); } catch { return json({error:"Ongeldige aanvraag."},400); }
    const tournamentId = Number(b.tournament_id);
    if (!Number.isInteger(tournamentId) || tournamentId < 1) return json({error:"Kies een toernooi."},400);
    const tournament = await env.DB.prepare("SELECT id FROM tournaments WHERE id=?").bind(tournamentId).first();
    if (!tournament) return json({error:"Toernooi niet gevonden."},404);
    if (!Array.isArray(b.entries)) return json({error:"Voer de spelers als lijst in."},400);
    const entries = b.entries.map(x => String(x || "").trim()).filter(Boolean);
    if (entries.length > 512 || entries.some(x => x.length > 100)) return json({error:"Maximaal 512 spelers; namen maximaal 100 tekens."},400);
    const statements = [env.DB.prepare("DELETE FROM tournament_results WHERE tournament_id=?").bind(tournamentId)];
    entries.forEach((name, i) => statements.push(env.DB.prepare("INSERT INTO tournament_results (tournament_id,player_name,position) VALUES (?,?,?)").bind(tournamentId,name,i+1)));
    await env.DB.batch(statements);
    return json({ok:true,count:entries.length});
  }
  if (request.method === "POST" && path === "/api/admin/events") {
    let b; try { b = await request.json(); } catch { return json({error:"Ongeldige aanvraag."},400); }
    const fields = [b.name,b.venue,b.event_date,b.event_time,b.registrations,b.entry_fee,b.format,b.registration_url,b.status || "published"];
    if (!String(b.name || "").trim() || !/^\d{4}-\d{2}-\d{2}$/.test(b.event_date || "")) return json({error:"Vul minimaal een naam en geldige datum in."},400);
    if (b.registration_url && !/^https?:\/\//i.test(b.registration_url)) return json({error:"De inschrijflink moet met http:// of https:// beginnen."},400);
    const r = await env.DB.prepare("INSERT INTO tournaments (name,venue,event_date,event_time,registrations,entry_fee,format,registration_url,status) VALUES (?,?,?,?,?,?,?,?,?)").bind(...fields.map(v=>String(v ?? ""))).run();
    return json({ok:true,id:r.meta.last_row_id});
  }

  if (request.method === "GET" && path === "/api/admin/gallery") {
    const tournamentId = Number(url.searchParams.get("tournament_id"));
    if (!Number.isInteger(tournamentId) || tournamentId < 1) return json({error:"Kies een toernooi."},400);
    const { results } = await env.DB.prepare("SELECT id,media_type,caption,media_key FROM tournament_gallery WHERE tournament_id=? ORDER BY CASE media_type WHEN 'winner' THEN 0 ELSE 1 END,id DESC").bind(tournamentId).all();
    return json({ photos: (results || []).map(x => ({...x,url:flyerUrl(x.media_key)})) });
  }
  const galleryRoute = path.match(/^\/api\/admin\/events\/(\d+)\/gallery$/);
  if (galleryRoute && request.method === "POST") {
    if (!env.BUCKET) return json({error:"De R2-binding BUCKET ontbreekt in Cloudflare."},503);
    const tournamentId = Number(galleryRoute[1]);
    const event = await env.DB.prepare("SELECT id FROM tournaments WHERE id=?").bind(tournamentId).first();
    if (!event) return json({error:"Toernooi niet gevonden."},404);
    const form = await request.formData();
    const file = form.get("photo");
    const mediaType = form.get("media_type") === "winner" ? "winner" : "photo";
    const caption = String(form.get("caption") || "").trim().slice(0,120);
    if (!file || typeof file.arrayBuffer !== "function") return json({error:"Kies eerst een foto."},400);
    if (!ALLOWED_FLYER_TYPES.has(file.type)) return json({error:"Gebruik een JPG-, PNG- of WebP-afbeelding."},415);
    if (file.size > MAX_GALLERY_BYTES) return json({error:"De foto is groter dan 8 MB."},413);
    const ext = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
    const key = `gallery/${tournamentId}/${randomToken()}.${ext}`;
    await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    if (mediaType === "winner") {
      const old = await env.DB.prepare("SELECT id,media_key FROM tournament_gallery WHERE tournament_id=? AND media_type='winner'").bind(tournamentId).all();
      for (const item of old.results || []) { await env.DB.prepare("DELETE FROM tournament_gallery WHERE id=?").bind(item.id).run(); await env.BUCKET.delete(item.media_key); }
    }
    const result = await env.DB.prepare("INSERT INTO tournament_gallery (tournament_id,media_key,media_type,caption) VALUES (?,?,?,?)").bind(tournamentId,key,mediaType,caption).run();
    return json({ok:true,id:result.meta.last_row_id,url:flyerUrl(key)});
  }
  const galleryItemRoute = path.match(/^\/api\/admin\/gallery\/(\d+)$/);
  if (galleryItemRoute && request.method === "DELETE") {
    const id = Number(galleryItemRoute[1]);
    const item = await env.DB.prepare("SELECT media_key FROM tournament_gallery WHERE id=?").bind(id).first();
    if (!item) return json({error:"Foto niet gevonden."},404);
    if (env.BUCKET) await env.BUCKET.delete(item.media_key);
    await env.DB.prepare("DELETE FROM tournament_gallery WHERE id=?").bind(id).run();
    return json({ok:true});
  }

  const flyerRoute = path.match(/^\/api\/admin\/events\/(\d+)\/flyer$/);
  if (flyerRoute && request.method === "POST") {
    if (!env.BUCKET) return json({error:"De R2-binding BUCKET ontbreekt in Cloudflare."},503);
    const id = Number(flyerRoute[1]);
    const event = await env.DB.prepare("SELECT id,flyer_key FROM tournaments WHERE id=?").bind(id).first();
    if (!event) return json({error:"Toernooi niet gevonden."},404);
    const form = await request.formData();
    const file = form.get("flyer");
    if (!file || typeof file.arrayBuffer !== "function") return json({error:"Kies eerst een flyer."},400);
    if (!ALLOWED_FLYER_TYPES.has(file.type)) return json({error:"Gebruik een JPG-, PNG- of WebP-afbeelding."},415);
    if (file.size > MAX_FLYER_BYTES) return json({error:"De flyer is groter dan 8 MB."},413);
    const ext = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
    const key = `flyers/${id}/${randomToken()}.${ext}`;
    await env.BUCKET.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    await env.DB.prepare("UPDATE tournaments SET flyer_key=? WHERE id=?").bind(key,id).run();
    if (event.flyer_key) await env.BUCKET.delete(event.flyer_key);
    return json({ok:true,flyer_url:flyerUrl(key)});
  }
  if (flyerRoute && request.method === "DELETE") {
    const id = Number(flyerRoute[1]);
    const event = await env.DB.prepare("SELECT flyer_key FROM tournaments WHERE id=?").bind(id).first();
    if (!event) return json({error:"Toernooi niet gevonden."},404);
    if (event.flyer_key && env.BUCKET) await env.BUCKET.delete(event.flyer_key);
    await env.DB.prepare("UPDATE tournaments SET flyer_key=NULL WHERE id=?").bind(id).run();
    return json({ok:true});
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
    const id = Number(edit[1]);
    const event = await env.DB.prepare("SELECT flyer_key FROM tournaments WHERE id=?").bind(id).first();
    if (event?.flyer_key && env.BUCKET) await env.BUCKET.delete(event.flyer_key);
    await env.DB.prepare("DELETE FROM tournaments WHERE id=?").bind(id).run();
    return json({ok:true});
  }
  return json({error:"Niet gevonden."},404);
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/media/")) {
      try { return await api(request, env); }
      catch (e) { return json({error:"Serverfout. Controleer de D1-tabellen, R2-binding en databasekolom flyer_key."},500); }
    }
    return env.ASSETS.fetch(request);
  }
};