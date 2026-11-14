let events = [];

const copy = {
en:{navEvents:"Tournaments",navCalendar:"Calendar",navResults:"Results",navGallery:"Gallery",navSponsors:"Sponsors",navContact:"Contact",heroEyebrow:"THE HOME OF DARTS IN ALICANTE",heroLine1:"AIM HIGH.",heroLine2:"HIT THE BIG STAGE.",heroCopy:"Discover tournaments, meet fellow players and be part of the growing darts scene in the Alicante region.",heroCta:"EXPLORE TOURNAMENTS",heroContact:"GET IN TOUCH",eventsEyebrow:"ON THE OCHÉ",eventsTitle:"UPCOMING TOURNAMENTS",eventsEmptyTitle:"The first tournaments are coming soon",eventsEmptyCopy:"We're preparing our first events in the Alicante region. Check back soon for dates, venues and player registration.",eventsNotify:"ASK FOR TOURNAMENT UPDATES ↗",eventRegister:"REGISTER NOW",eventVenue:"VENUE",eventDate:"DATE",eventEntry:"ENTRY FEE",eventFormat:"FORMAT",eventSingles:"Singles",eventPerPerson:"per person",calendarRegister:"REGISTER",calendarEyebrow:"SAVE THE DATE",calendarTitle:"EVENT CALENDAR",calendarEmptyTitle:"Dates will be announced here",calendarEmptyCopy:"Our tournament calendar is being prepared. Follow our updates so you don't miss the opening events.",calendarCta:"REQUEST UPDATES",resultsEyebrow:"THE MOMENT OF TRUTH",resultsTitle:"RESULTS & RANKINGS",resultsEmptyTitle:"The first champions are yet to be crowned",resultsEmptyCopy:"Tournament results and player rankings will appear here after our first events.",galleryEyebrow:"THE ACTION. THE ATMOSPHERE.",galleryTitle:"PHOTO GALLERY",galleryEmptyTitle:"Our story starts soon",galleryEmptyCopy:"There are no past-event photos yet. This gallery will fill up with real moments from our tournaments.",sponsorEyebrow:"BACK THE GAME",sponsorTitle:"PARTNERS & SPONSORS",sponsorIntro:"Help us grow darts in the Alicante region. We welcome local businesses and brands who want to support exciting events and connect with the darts community.",foundingPartner:"FOUNDING PARTNER OPPORTUNITY",sponsorCallTitle:"YOUR BRAND. OUR NEXT BIG EVENT.",sponsorCallCopy:"Become one of our first partners and put your business in the spotlight.",sponsorCta:"BECOME A SPONSOR ↗",contactEyebrow:"LET'S TALK DARTS",contactTitle:"READY TO GET INVOLVED?",contactCopy:"Questions about tournaments, registration or sponsorship? We'd love to hear from you.",emailUs:"EMAIL US",contactNote:"Alicante region · Spain",footerRights:"All rights reserved."},
nl:{navEvents:"Toernooien",navCalendar:"Agenda",navResults:"Uitslagen",navGallery:"Foto's",navSponsors:"Sponsors",navContact:"Contact",heroEyebrow:"HÉT DARTSPLATFORM VAN ALICANTE",heroLine1:"MIK HOOG.",heroLine2:"SPEEL OP HET GROTE PODIUM.",heroCopy:"Ontdek dartstoernooien, ontmoet andere spelers en maak deel uit van de groeiende dartsgemeenschap in de regio Alicante.",heroCta:"BEKIJK TOERNOOIEN",heroContact:"NEEM CONTACT OP",eventsEyebrow:"AAN DE OCHÉ",eventsTitle:"AANKOMENDE TOERNOOIEN",eventsEmptyTitle:"De eerste toernooien komen eraan",eventsEmptyCopy:"We bereiden onze eerste evenementen in de regio Alicante voor. Kom binnenkort terug voor data, locaties en inschrijvingen.",eventsNotify:"VRAAG TOERNOOI-UPDATES AAN ↗",eventRegister:"SCHRIJF JE NU IN",eventVenue:"LOCATIE",eventDate:"DATUM",eventEntry:"INSCHRIJFGELD",eventFormat:"SPELTYPE",eventSingles:"Singles",eventPerPerson:"per persoon",calendarRegister:"INSCHRIJVEN",calendarEyebrow:"NOTEER DE DATUM",calendarTitle:"EVENEMENTENAGENDA",calendarEmptyTitle:"Data worden hier bekendgemaakt",calendarEmptyCopy:"Onze toernooikalender wordt voorbereid. Volg onze updates zodat je de eerste evenementen niet mist.",calendarCta:"VRAAG UPDATES AAN",resultsEyebrow:"HET MOMENT VAN DE WAARHEID",resultsTitle:"UITSLAGEN & RANGLIJSTEN",resultsEmptyTitle:"De eerste kampioenen moeten nog gekroond worden",resultsEmptyCopy:"Uitslagen en spelersranglijsten verschijnen hier na onze eerste evenementen.",galleryEyebrow:"DE ACTIE. DE SFEER.",galleryTitle:"FOTOGALERIJ",galleryEmptyTitle:"Ons verhaal begint binnenkort",galleryEmptyCopy:"Er zijn nog geen foto's van eerdere evenementen. Deze galerij wordt gevuld met echte momenten van onze toernooien.",sponsorEyebrow:"STEUN DE SPORT",sponsorTitle:"PARTNERS & SPONSORS",sponsorIntro:"Help ons darts in de regio Alicante te laten groeien. We verwelkomen lokale bedrijven en merken die evenementen willen steunen en contact willen leggen met de dartsgemeenschap.",foundingPartner:"KANS VOOR EEN EERSTE PARTNER",sponsorCallTitle:"JOUW MERK. ONS VOLGENDE GROTE EVENEMENT.",sponsorCallCopy:"Word een van onze eerste partners en zet je bedrijf in de schijnwerpers.",sponsorCta:"WORD SPONSOR ↗",contactEyebrow:"LATEN WE OVER DARTS PRATEN",contactTitle:"DOE JE MEE?",contactCopy:"Vragen over toernooien, inschrijving of sponsoring? We horen graag van je.",emailUs:"MAIL ONS",contactNote:"Regio Alicante · Spanje",footerRights:"Alle rechten voorbehouden."},
es:{navEvents:"Torneos",navCalendar:"Calendario",navResults:"Resultados",navGallery:"Galería",navSponsors:"Patrocinadores",navContact:"Contacto",heroEyebrow:"EL HOGAR DE LOS DARDOS EN ALICANTE",heroLine1:"APUNTA ALTO.",heroLine2:"LLEGA AL GRAN ESCENARIO.",heroCopy:"Descubre torneos, conoce a otros jugadores y forma parte de la creciente comunidad de dardos en la región de Alicante.",heroCta:"VER TORNEOS",heroContact:"CONTACTAR",eventsEyebrow:"EN LA LÍNEA DE TIRO",eventsTitle:"PRÓXIMOS TORNEOS",eventsEmptyTitle:"Los primeros torneos llegarán pronto",eventsEmptyCopy:"Estamos preparando nuestros primeros eventos en la región de Alicante. Vuelve pronto para consultar fechas, lugares e inscripciones.",eventsNotify:"SOLICITAR NOVEDADES ↗",eventRegister:"INSCRÍBETE AHORA",eventVenue:"LUGAR",eventDate:"FECHA",eventEntry:"CUOTA",eventFormat:"FORMATO",eventSingles:"Individual",eventPerPerson:"por persona",calendarRegister:"INSCRIBIRSE",calendarEyebrow:"RESERVA LA FECHA",calendarTitle:"CALENDARIO DE EVENTOS",calendarEmptyTitle:"Las fechas se anunciarán aquí",calendarEmptyCopy:"Estamos preparando nuestro calendario de torneos. Sigue nuestras novedades para no perderte los primeros eventos.",calendarCta:"SOLICITAR NOVEDADES",resultsEyebrow:"EL MOMENTO DE LA VERDAD",resultsTitle:"RESULTADOS Y CLASIFICACIONES",resultsEmptyTitle:"Los primeros campeones están por llegar",resultsEmptyCopy:"Los resultados y las clasificaciones aparecerán aquí después de nuestros primeros eventos.",galleryEyebrow:"LA ACCIÓN. EL AMBIENTE.",galleryTitle:"GALERÍA DE FOTOS",galleryEmptyTitle:"Nuestra historia empieza pronto",galleryEmptyCopy:"Todavía no hay fotos de eventos anteriores. Esta galería se llenará con momentos reales de nuestros torneos.",sponsorEyebrow:"APOYA EL JUEGO",sponsorTitle:"SOCIOS Y PATROCINADORES",sponsorIntro:"Ayúdanos a hacer crecer los dardos en la región de Alicante. Damos la bienvenida a empresas y marcas locales que quieran apoyar eventos y conectar con la comunidad.",foundingPartner:"OPORTUNIDAD PARA SOCIOS FUNDADORES",sponsorCallTitle:"TU MARCA. NUESTRO PRÓXIMO GRAN EVENTO.",sponsorCallCopy:"Conviértete en uno de nuestros primeros socios y da visibilidad a tu negocio.",sponsorCta:"HAZTE PATROCINADOR ↗",contactEyebrow:"HABLEMOS DE DARDOS",contactTitle:"¿QUIERES PARTICIPAR?",contactCopy:"¿Tienes preguntas sobre torneos, inscripciones o patrocinios? Nos encantará escucharte.",emailUs:"ESCRÍBENOS",contactNote:"Región de Alicante · España",footerRights:"Todos los derechos reservados."}
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
function setLanguage(code) {
  document.documentElement.lang = code;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (copy[code][key]) el.textContent = copy[code][key];
  });
  renderEvents(code);
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
