let events = [];

const copy = {
en:{navEvents:"Tournaments",navCalendar:"Calendar",navResults:"Results",navGallery:"Gallery",navSponsors:"Sponsors",navContact:"Contact",heroEyebrow:"THE HOME OF DARTS IN ALICANTE",heroLine1:"AIM HIGH.",heroLine2:"HIT THE BIG STAGE.",heroCopy:"Discover tournaments, meet fellow players and be part of the growing darts scene in the Alicante region.",heroCta:"EXPLORE TOURNAMENTS",heroContact:"GET IN TOUCH",eventsEyebrow:"ON THE OCHÉ",eventsTitle:"UPCOMING TOURNAMENTS",eventsEmptyTitle:"The first tournaments are coming soon",eventsEmptyCopy:"We're preparing our first events in the Alicante region. Check back soon for dates, venues and player registration.",eventsNotify:"ASK FOR TOURNAMENT UPDATES ↗",eventRegister:"REGISTER NOW",eventVenue:"VENUE",eventDate:"DATE",eventEntry:"ENTRY FEE",eventFormat:"FORMAT",eventSingles:"Singles",eventPerPerson:"per person",calendarRegister:"REGISTER",calendarEyebrow:"SAVE THE DATE",calendarTitle:"EVENT CALENDAR",calendarEmptyTitle:"Dates will be announced here",calendarEmptyCopy:"Our tournament calendar is being prepared. Follow our updates so you don't miss the opening events.",calendarCta:"REQUEST UPDATES",resultsEyebrow:"THE MOMENT OF TRUTH",resultsTitle:"RESULTS & RANKINGS",resultsEmptyTitle:"The first champions are yet to be crowned",resultsEmptyCopy:"Tournament results and player rankings will appear here after our first events.",resultsPlace:"PLACE",resultsPlayers:"PLAYERS",galleryEyebrow:"THE ACTION. THE ATMOSPHERE.",galleryTitle:"PHOTO GALLERY",galleryEmptyTitle:"Our story starts soon",galleryEmptyCopy:"There are no past-event photos yet. This gallery will fill up with real moments from our tournaments.",sponsorEyebrow:"BACK THE GAME",sponsorTitle:"PARTNERS & SPONSORS",sponsorIntro:"Help us grow darts in the Alicante region. We welcome local businesses and brands who want to support exciting events and connect with the darts community.",foundingPartner:"FOUNDING PARTNER OPPORTUNITY",sponsorCallTitle:"YOUR BRAND. OUR NEXT BIG EVENT.",sponsorCallCopy:"Become one of our first partners and put your business in the spotlight.",sponsorCta:"BECOME A SPONSOR ↗",contactEyebrow:"LET'S TALK DARTS",contactTitle:"READY TO GET INVOLVED?",contactCopy:"Questions about tournaments, registration or sponsorship? We'd love to hear from you.",emailUs:"EMAIL US",contactNote:"Alicante region · Spain",footerRights:"All rights reserved.",navGuestbook:"Guestbook",guestbookEyebrow:"THE DARTS COMMUNITY",guestbookTitle:"DARTS GUESTBOOK",guestbookIntro:"Leave a message for the darts community in the Alicante region.",guestbookName:"Your name",guestbookCountry:"Country",guestbookMessage:"Your message",guestbookSubmit:"SEND MESSAGE",guestbookThanks:"Thanks! Your message has been sent for approval and will appear after review.",guestbookEmpty:"Be the first to leave a message.",guestbookError:"Your message could not be sent. Please try again."},
nl:{navEvents:"Toernooien",navCalendar:"Agenda",navResults:"Uitslagen",navGallery:"Foto's",navSponsors:"Sponsors",navContact:"Contact",heroEyebrow:"HÉT DARTSPLATFORM VAN ALICANTE",heroLine1:"MIK HOOG.",heroLine2:"SPEEL OP HET GROTE PODIUM.",heroCopy:"Ontdek dartstoernooien, ontmoet andere spelers en maak deel uit van de groeiende dartsgemeenschap in de regio Alicante.",heroCta:"BEKIJK TOERNOOIEN",heroContact:"NEEM CONTACT OP",eventsEyebrow:"AAN DE OCHÉ",eventsTitle:"AANKOMENDE TOERNOOIEN",eventsEmptyTitle:"De eerste toernooien komen eraan",eventsEmptyCopy:"We bereiden onze eerste evenementen in de regio Alicante voor. Kom binnenkort terug voor data, locaties en inschrijvingen.",eventsNotify:"VRAAG TOERNOOI-UPDATES AAN ↗",eventRegister:"SCHRIJF JE NU IN",eventVenue:"LOCATIE",eventDate:"DATUM",eventEntry:"INSCHRIJFGELD",eventFormat:"SPELTYPE",eventSingles:"Singles",eventPerPerson:"per persoon",calendarRegister:"INSCHRIJVEN",calendarEyebrow:"NOTEER DE DATUM",calendarTitle:"EVENEMENTENAGENDA",calendarEmptyTitle:"Data worden hier bekendgemaakt",calendarEmptyCopy:"Onze toernooikalender wordt voorbereid. Volg onze updates zodat je de eerste evenementen niet mist.",calendarCta:"VRAAG UPDATES AAN",resultsEyebrow:"HET MOMENT VAN DE WAARHEID",resultsTitle:"UITSLAGEN & RANGLIJSTEN",resultsEmptyTitle:"De eerste kampioenen moeten nog gekroond worden",resultsEmptyCopy:"Uitslagen en spelersranglijsten verschijnen hier na onze eerste evenementen.",resultsPlace:"PLAATS",resultsPlayers:"SPELERS",galleryEyebrow:"DE ACTIE. DE SFEER.",galleryTitle:"FOTOGALERIJ",galleryEmptyTitle:"Ons verhaal begint binnenkort",galleryEmptyCopy:"Er zijn nog geen foto's van eerdere evenementen. Deze galerij wordt gevuld met echte momenten van onze toernooien.",sponsorEyebrow:"STEUN DE SPORT",sponsorTitle:"PARTNERS & SPONSORS",sponsorIntro:"Help ons darts in de regio Alicante te laten groeien. We verwelkomen lokale bedrijven en merken die evenementen willen steunen en contact willen leggen met de dartsgemeenschap.",foundingPartner:"KANS VOOR EEN EERSTE PARTNER",sponsorCallTitle:"JOUW MERK. ONS VOLGENDE GROTE EVENEMENT.",sponsorCallCopy:"Word een van onze eerste partners en zet je bedrijf in de schijnwerpers.",sponsorCta:"WORD SPONSOR ↗",contactEyebrow:"LATEN WE OVER DARTS PRATEN",contactTitle:"DOE JE MEE?",contactCopy:"Vragen over toernooien, inschrijving of sponsoring? We horen graag van je.",emailUs:"MAIL ONS",contactNote:"Regio Alicante · Spanje",footerRights:"Alle rechten voorbehouden.",navGuestbook:"Gastenboek",guestbookEyebrow:"DE DARTSGEMEENSCHAP",guestbookTitle:"DARTS GASTENBOEK",guestbookIntro:"Laat een bericht achter voor de dartsgemeenschap in de regio Alicante.",guestbookName:"Je naam",guestbookCountry:"Land",guestbookMessage:"Je bericht",guestbookSubmit:"VERSTUUR BERICHT",guestbookThanks:"Bedankt! Je bericht is verstuurd ter goedkeuring en verschijnt na controle.",guestbookEmpty:"Wees de eerste die een bericht achterlaat.",guestbookError:"Je bericht kon niet worden verstuurd. Probeer het opnieuw."},
es:{navEvents:"Torneos",navCalendar:"Calendario",navResults:"Resultados",navGallery:"Galería",navSponsors:"Patrocinadores",navContact:"Contacto",heroEyebrow:"EL HOGAR DE LOS DARDOS EN ALICANTE",heroLine1:"APUNTA ALTO.",heroLine2:"LLEGA AL GRAN ESCENARIO.",heroCopy:"Descubre torneos, conoce a otros jugadores y forma parte de la creciente comunidad de dardos en la región de Alicante.",heroCta:"VER TORNEOS",heroContact:"CONTACTAR",eventsEyebrow:"EN LA LÍNEA DE TIRO",eventsTitle:"PRÓXIMOS TORNEOS",eventsEmptyTitle:"Los primeros torneos llegarán pronto",eventsEmptyCopy:"Estamos preparando nuestros primeros eventos en la región de Alicante. Vuelve pronto para consultar fechas, lugares e inscripciones.",eventsNotify:"SOLICITAR NOVEDADES ↗",eventRegister:"INSCRÍBETE AHORA",eventVenue:"LUGAR",eventDate:"FECHA",eventEntry:"CUOTA",eventFormat:"FORMATO",eventSingles:"Individual",eventPerPerson:"por persona",calendarRegister:"INSCRIBIRSE",calendarEyebrow:"RESERVA LA FECHA",calendarTitle:"CALENDARIO DE EVENTOS",calendarEmptyTitle:"Las fechas se anunciarán aquí",calendarEmptyCopy:"Estamos preparando nuestro calendario de torneos. Sigue nuestras novedades para no perderte los primeros eventos.",calendarCta:"SOLICITAR NOVEDADES",resultsEyebrow:"EL MOMENTO DE LA VERDAD",resultsTitle:"RESULTADOS Y CLASIFICACIONES",resultsEmptyTitle:"Los primeros campeones están por llegar",resultsEmptyCopy:"Los resultados y las clasificaciones aparecerán aquí después de nuestros primeros eventos.",resultsPlace:"PUESTO",resultsPlayers:"JUGADORES",galleryEyebrow:"LA ACCIÓN. EL AMBIENTE.",galleryTitle:"GALERÍA DE FOTOS",galleryEmptyTitle:"Nuestra historia empieza pronto",galleryEmptyCopy:"Todavía no hay fotos de eventos anteriores. Esta galería se llenará con momentos reales de nuestros torneos.",sponsorEyebrow:"APOYA EL JUEGO",sponsorTitle:"SOCIOS Y PATROCINADORES",sponsorIntro:"Ayúdanos a hacer crecer los dardos en la región de Alicante. Damos la bienvenida a empresas y marcas locales que quieran apoyar eventos y conectar con la comunidad.",foundingPartner:"OPORTUNIDAD PARA SOCIOS FUNDADORES",sponsorCallTitle:"TU MARCA. NUESTRO PRÓXIMO GRAN EVENTO.",sponsorCallCopy:"Conviértete en uno de nuestros primeros socios y da visibilidad a tu negocio.",sponsorCta:"HAZTE PATROCINADOR ↗",contactEyebrow:"HABLEMOS DE DARDOS",contactTitle:"¿QUIERES PARTICIPAR?",contactCopy:"¿Tienes preguntas sobre torneos, inscripciones o patrocinios? Nos encantará escucharte.",emailUs:"ESCRÍBENOS",contactNote:"Región de Alicante · España",footerRights:"Todos los derechos reservados."}
};
const flyerStyles = document.createElement("style");
flyerStyles.textContent = ".event-flyer-link{display:block;margin:-4px -4px 18px;overflow:hidden;border-radius:4px;background:#111}.event-flyer{display:block;width:100%;max-height:360px;object-fit:contain;margin:0 auto}.event-flyer-link:focus-visible{outline:2px solid #d7ad55;outline-offset:3px}";
document.head.appendChild(flyerStyles);
const lang = document.getElementById('language');
function formatDate(dateString, code) {
  const date = new Date(dateString + "T12:00:00");
  const locales = {en:"en-GB", nl:"nl-NL", es:"es-ES"};
  return new Intl.DateTimeFormat(locales[code] || "en-GB", {day:"numeric", month:"long", year:"numeric"}).format(date);
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
}
function safeEventUrl(value) {
  try { const u = new URL(value); return ["https:","http:"].includes(u.protocol) ? escapeHTML(u.href) : "#"; }
  catch { return "#"; }
}
function safeFlyerUrl(value) {
  try { const u = new URL(value, location.origin); return u.origin === location.origin && u.pathname.startsWith("/media/flyers/") ? escapeHTML(u.href) : ""; }
  catch { return ""; }
}
function renderEvents(code) {
  const t = copy[code];
  document.getElementById("event-list").innerHTML = events.map(event => `
    <article class="event-card">
      ${safeFlyerUrl(event.flyer_url) ? `<a class="event-flyer-link" href="${safeFlyerUrl(event.flyer_url)}" target="_blank" rel="noopener noreferrer"><img class="event-flyer" src="${safeFlyerUrl(event.flyer_url)}" alt="${escapeHTML(event.name)} flyer" loading="lazy"></a>` : ""}
      <div class="event-card-top"><span class="event-tag">${formatDate(event.date, code)}</span><span class="event-number">DTA / ${String(event.date || "").slice(2,4)}</span></div>
      <h3>${escapeHTML(event.name)}</h3>
      <p class="event-venue">📍 ${escapeHTML(event.venue)}</p>
      <div class="event-details">
        <div><span>${t.eventDate}</span><strong>${formatDate(event.date, code)} · ${escapeHTML(event.time)}</strong></div>
        <div><span>${t.eventVenue}</span><strong>${escapeHTML(event.venue)}</strong></div>
        <div><span>${t.eventFormat}</span><strong>${escapeHTML(event.format || t.eventSingles)}</strong></div>
        <div><span>${t.eventEntry}</span><strong>${escapeHTML(event.fee)} <small>${t.eventPerPerson}</small></strong></div>
      </div>
      <a class="btn btn-red event-register" href="${safeEventUrl(event.url)}" target="_blank" rel="noopener noreferrer">${t.eventRegister} ↗</a>
    </article>`).join("");
  document.getElementById("calendar-list").innerHTML = events.map(event => {
    const date = new Date(event.date + "T12:00:00");
    const month = new Intl.DateTimeFormat(({en:"en-GB",nl:"nl-NL",es:"es-ES"})[code], {month:"short"}).format(date);
    return `<article class="calendar-row">
      <div class="calendar-date"><strong>${date.getDate()}</strong><span>${month}</span></div>
      <div class="calendar-info"><h3>${escapeHTML(event.name)}</h3><p>📍 ${escapeHTML(event.venue)} · ${escapeHTML(event.time)}</p><span>${escapeHTML(event.format || t.eventSingles)} · ${escapeHTML(event.fee)} ${t.eventPerPerson}</span></div>
      <a class="btn btn-outline" href="${safeEventUrl(event.url)}" target="_blank" rel="noopener noreferrer">${t.calendarRegister} ↗</a>
    </article>`;
  }).join("");
}
async function loadResults(code) {
  const target = document.getElementById("results-content");
  if (!target) return;
  try {
    const response = await fetch("/api/results");
    if (!response.ok) throw new Error("Results unavailable");
    const data = await response.json();
    const rows = Array.isArray(data.results) ? data.results : [];
    if (!rows.length) {
      const t = copy[code];
      target.innerHTML = `<div class="empty-panel"><div class="empty-icon">🏆</div><h3>${t.resultsEmptyTitle}</h3><p>${t.resultsEmptyCopy}</p></div>`;
      return;
    }
    const groups = new Map();
    rows.forEach(row => {
      if (!groups.has(row.tournament_id)) groups.set(row.tournament_id, {id:row.tournament_id,name:row.tournament_name,date:row.date,players:[]});
      groups.get(row.tournament_id).players.push(row.player_name);
    });
    target.innerHTML = [...groups.values()].map(group => `
      <article class="result-card">
        <button class="result-toggle" type="button" aria-expanded="false" aria-controls="result-details-${group.id}">
          <span class="result-heading"><span class="result-title"><span class="eyebrow">${formatDate(group.date,code)}</span><span class="result-name">${escapeHTML(group.name)}</span></span><span class="result-meta"><span class="result-count">${group.players.length} ${copy[code].resultsPlayers}</span><span class="result-chevron" aria-hidden="true">＋</span></span></span>
        </button>
        <div class="result-details" id="result-details-${group.id}" hidden>
          <ol class="result-list">${group.players.map((name,i)=>`<li><span class="result-position">${i+1}</span><span>${escapeHTML(name)}</span></li>`).join("")}</ol>
        </div>
      </article>`).join("");
    target.querySelectorAll('.result-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        button.querySelector('.result-chevron').textContent = expanded ? '＋' : '−';
        const details = document.getElementById(button.getAttribute('aria-controls'));
        if (details) details.hidden = expanded;
      });
    });
  } catch (_) {
    const t = copy[code];
    target.innerHTML = `<div class="empty-panel"><div class="empty-icon">🏆</div><h3>${t.resultsEmptyTitle}</h3><p>${t.resultsEmptyCopy}</p></div>`;
  }
}


let countdownInterval = null;
function updateCountdown() {
  const panel = document.getElementById("next-event-countdown");
  if (!panel) return;
  const now = Date.now();
  const nextEvent = events
    .map(event => ({...event, startsAt: new Date(`${event.date}T${event.time || "00:00"}:00`).getTime()}))
    .filter(event => Number.isFinite(event.startsAt) && event.startsAt > now && event.url)
    .sort((a,b) => a.startsAt - b.startsAt)[0];
  if (!nextEvent) {
    panel.hidden = true;
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = null;
    return;
  }
  panel.hidden = false;
  document.getElementById("countdown-event-name").textContent = nextEvent.name;
  document.getElementById("countdown-register").href = safeEventUrl(nextEvent.url);
  const remaining = Math.max(0, nextEvent.startsAt - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  document.getElementById("countdown-days").textContent = String(days).padStart(2,"0");
  document.getElementById("countdown-hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("countdown-minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("countdown-seconds").textContent = String(seconds).padStart(2,"0");
  if (!countdownInterval) countdownInterval = setInterval(updateCountdown,1000);
}


async function loadGallery(code) {
  const target = document.getElementById('gallery-content');
  if (!target) return;
  const t = copy[code];
  try {
    const response = await fetch('/api/gallery');
    if (!response.ok) throw new Error('Gallery unavailable');
    const data = await response.json();
    const photos = Array.isArray(data.photos) ? data.photos : [];
    if (!photos.length) {
      target.innerHTML = `<div class="gallery-placeholder"><div class="gallery-symbol">◎</div><h3>${t.galleryEmptyTitle}</h3><p>${t.galleryEmptyCopy}</p></div>`;
      return;
    }
    const groups = new Map();
    photos.forEach(photo => { if (!groups.has(photo.tournament_id)) groups.set(photo.tournament_id,{name:photo.tournament_name,date:photo.date,photos:[]}); groups.get(photo.tournament_id).photos.push(photo); });
    target.innerHTML = [...groups.entries()].map(([id,group]) => {
      const winner = group.photos.find(x=>x.media_type==='winner');
      const others = group.photos.filter(x=>x.media_type!=='winner');
      return `<section class="gallery-event"><div class="gallery-event-heading"><h3>${escapeHTML(group.name)}</h3><span>${formatDate(group.date,code)}</span></div>${winner?`<div class="gallery-winner"><a href="${escapeHTML(winner.url)}" target="_blank" rel="noopener"><img src="${escapeHTML(winner.url)}" alt="${escapeHTML(winner.caption||'Winner')}" loading="lazy"></a><div><span class="eyebrow">${code==='nl'?'TOERNOOIWINNAAR':code==='es'?'GANADOR DEL TORNEO':'TOURNAMENT WINNER'}</span><strong>${escapeHTML(winner.caption)}</strong></div></div>`:''}${others.length?`<div class="gallery-grid">${others.map(photo=>`<a href="${escapeHTML(photo.url)}" target="_blank" rel="noopener" aria-label="${escapeHTML(group.name)} photo"><img src="${escapeHTML(photo.url)}" alt="${escapeHTML(photo.caption||group.name)}" loading="lazy"></a>`).join('')}</div>`:''}</section>`;
    }).join('');
  } catch (_) { target.innerHTML = `<div class="gallery-placeholder"><div class="gallery-symbol">◎</div><h3>${t.galleryEmptyTitle}</h3><p>${t.galleryEmptyCopy}</p></div>`; }
}


async function loadGuestbook(code) {
  const target = document.getElementById("guestbook-messages");
  if (!target) return;
  try {
    const response = await fetch("/api/guestbook");
    if (!response.ok) throw new Error("Guestbook unavailable");
    const data = await response.json();
    const messages = Array.isArray(data.messages) ? data.messages : [];
    target.innerHTML = messages.length ? messages.map(item => `
      <article class="guestbook-message">
        <strong>${escapeHTML(item.name)}</strong>${item.country ? `<small> · ${escapeHTML(item.country)}</small>` : ""}
        <p>${escapeHTML(item.message).replace(/\r?\n/g, "<br>")}</p>
        <small>${formatDate(String(item.created_at || "").slice(0,10), code)}</small>
      </article>`).join("") : `<p class="guestbook-empty">${copy[code].guestbookEmpty}</p>`;
  } catch (_) {
    target.innerHTML = `<p class="guestbook-empty">${copy[code].guestbookEmpty}</p>`;
  }
}

const guestbookForm = document.getElementById("guestbook-form");
if (guestbookForm) guestbookForm.addEventListener("submit", async event => {
  event.preventDefault();
  const status = document.getElementById("guestbook-status");
  const button = guestbookForm.querySelector('button[type="submit"]');
  const code = lang.value || "en";
  const values = Object.fromEntries(new FormData(guestbookForm).entries());
  button.disabled = true;
  status.textContent = "";
  try {
    const response = await fetch("/api/guestbook", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || copy[code].guestbookError);
    guestbookForm.reset();
    status.textContent = copy[code].guestbookThanks;
  } catch (error) {
    status.textContent = error.message || copy[code].guestbookError;
  } finally {
    button.disabled = false;
  }
});

function setLanguage(code) {
  document.documentElement.lang = code;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (copy[code][key]) el.textContent = copy[code][key];
  });
  renderEvents(code);
  updateCountdown();
  loadResults(code);
  loadGallery(code);
  loadGuestbook(code);
  localStorage.setItem('dta-lang', code);
}
async function loadPublishedEvents() {
  try {
    const response = await fetch('/api/events');
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.events)) events = data.events;
    }
  } catch (_) { /* API unavailable: show no stale hard-coded tournament data. */ }
}
const saved = localStorage.getItem('dta-lang') || 'en';
lang.value = saved;
setLanguage(saved);
loadPublishedEvents().then(() => setLanguage(lang.value));
lang.addEventListener('change', e => setLanguage(e.target.value));
document.querySelector('.menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
  document.querySelector('.menu-toggle').setAttribute('aria-expanded', nav.classList.contains('open'));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => document.querySelector('.nav').classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

// Privacy-conscious first-party analytics: anonymous random visitor ID, no names or IP storage.
(function(){
  const track=(type,target='')=>{try{fetch('/api/analytics/track',{method:'POST',headers:{'content-type':'application/json',navGuestbook:"Libro de visitas",guestbookEyebrow:"LA COMUNIDAD DE DARDOS",guestbookTitle:"LIBRO DE VISITAS",guestbookIntro:"Deja un mensaje para la comunidad de dardos de la región de Alicante.",guestbookName:"Tu nombre",guestbookCountry:"País",guestbookMessage:"Tu mensaje",guestbookSubmit:"ENVIAR MENSAJE",guestbookThanks:"¡Gracias! Tu mensaje se ha enviado para su aprobación y aparecerá tras revisarlo.",guestbookEmpty:"Sé la primera persona en dejar un mensaje.",guestbookError:"No se pudo enviar tu mensaje. Inténtalo de nuevo."},body:JSON.stringify({type,page:location.pathname+location.hash,target}) ,keepalive:true})}catch(_){}};
  track('pageview');
  document.addEventListener('click',e=>{
    const el=e.target.closest('a,button'); if(!el)return;
    const label=(el.getAttribute('data-analytics')||el.textContent||el.getAttribute('aria-label')||el.href||'link').trim().replace(/\\s+/g,' ').slice(0,150);
    const href=el.getAttribute('href')||'';
    track('click',label+(href?' | '+href:''));
  },true);
})();// Load and display active sponsor advertisements
async function loadSponsorAds() {
  const container = document.getElementById('sponsorAds');
  if (!container) return;

  try {
    const response = await fetch('/api/sponsors');
    if (!response.ok) throw new Error('Sponsoradvertenties laden mislukt');

    const data = await response.json();
    const sponsors = data.sponsors || [];

    container.replaceChildren();

    sponsors.forEach(sponsor => {
      const card = document.createElement('div');
      card.className = 'sponsor-ad-card';

      const link = document.createElement('a');
      link.href = sponsor.website_url || '#';
      if (sponsor.website_url) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      const image = document.createElement('img');
      image.src = sponsor.image_url;
      image.alt = sponsor.name || 'Sponsoradvertentie';
      image.loading = 'lazy';

      link.appendChild(image);
      card.appendChild(link);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Sponsoradvertenties:', error);
  }
}

loadSponsorAds();
