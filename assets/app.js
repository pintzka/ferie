// Sommerferie 2026 — hovedlogikk
(() => {

const $app = document.getElementById("app");

// ===== Tema =====
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("FERIE_THEME", t);
  document.getElementById("themeToggle").textContent = t === "dark" ? "☀️" : "🌙";
}
applyTheme(localStorage.getItem("FERIE_THEME") || "light");
document.getElementById("themeToggle").addEventListener("click", () => {
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ===== Hash-routing =====
function parseRoute() {
  const h = location.hash.replace(/^#/, "");
  if (!h) return { view: "dashboard" };
  const [view, ...rest] = h.split("/");
  return { view, param: rest.join("/") };
}
function navigate(view, param) { location.hash = param ? `${view}/${param}` : view; }
window.addEventListener("hashchange", render);

document.querySelectorAll("[data-view]").forEach(btn => {
  btn.addEventListener("click", () => navigate(btn.dataset.view));
});

// ===== Live nedtelling i header =====
function tickHeaderCountdown() {
  const el = document.getElementById("headerCountdown");
  if (!el) return;
  const target = new Date(TRIP.countdown_target);
  const now = new Date();
  const ms = target - now;
  if (ms <= 0) {
    // På reise — vis hvilken dag
    const today = now.toISOString().slice(0,10);
    const idx = DAYS.findIndex(d => d.date === today);
    if (idx >= 0) {
      el.innerHTML = `🌴 <span class="hc-num">Dag ${idx + 1}</span> <span class="hc-lab">av ${DAYS.length}</span>`;
    } else if (today > DAYS[DAYS.length - 1].date) {
      el.innerHTML = `🏠 <span class="hc-num">Hjemme igjen</span>`;
    } else {
      el.innerHTML = `🚀 <span class="hc-num">Snart!</span>`;
    }
    return;
  }
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  el.innerHTML = `⏳ <span class="hc-num">${days}d ${String(hours).padStart(2,"0")}t ${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s</span> <span class="hc-lab">til avreise</span>`;
}
tickHeaderCountdown();
setInterval(tickHeaderCountdown, 1000);

// ===== Helpers =====
function el(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html.trim();
  return tmp.firstChild;
}

function fmtDate(s) {
  const d = new Date(s);
  return d.toLocaleDateString("nb-NO", { weekday: "short", day: "numeric", month: "short" });
}

function fmtTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("nb-NO", { hour: "2-digit", minute: "2-digit" });
}

function dayIndex(today) {
  today = today || new Date().toISOString().slice(0, 10);
  const idx = DAYS.findIndex(d => d.date === today);
  if (idx >= 0) return { idx, day: DAYS[idx] };
  if (today < DAYS[0].date) return { idx: -1, day: null, before: true };
  return { idx: DAYS.length, day: null, after: true };
}

function countryClass(country) {
  const map = { "Norge": "country-norge", "Tyskland": "country-tyskland", "Østerrike": "country-osterrike", "Italia": "country-italia", "Skagerrak": "country-skagerrak" };
  return map[country] || "";
}

function countryCode(country) {
  return { "Norge": "no", "Tyskland": "de", "Østerrike": "at", "Italia": "it" }[country];
}

function toast(msg) {
  document.querySelectorAll(".toast").forEach(t => t.remove());
  const t = el(`<div class="toast">${msg}</div>`);
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function lodgingFor(day) {
  return LODGINGS[day.lodging_id] || null;
}

function gmapsLink(lat, lng, label) {
  return `https://maps.google.com/?q=${lat},${lng}${label ? `(${encodeURIComponent(label)})` : ""}`;
}
function applemapsLink(lat, lng, label) {
  return `https://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(label || "")}`;
}

// ===== Bruker / GitHub-konfig modal =====
function userModal() {
  const cfg = STORAGE.getCfg();
  const modal = el(`
    <div class="modal-overlay" id="userOverlay">
      <div class="modal">
        <h3>Bruker og lagring</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-top:4px;">
          Hvem er du, og hvor skal endringene lagres? Token lagres kun i denne nettleseren.
        </p>
        <label>Ditt navn</label>
        <select id="cfgUser">
          ${TRIP.travelers.map(t => `<option value="${t.name}" ${cfg.user===t.name?"selected":""}>${t.emoji} ${t.name}</option>`).join("")}
        </select>
        <label>GitHub eier</label>
        <input id="cfgOwner" placeholder="pintzka" value="${cfg.owner || ""}" />
        <label>GitHub repo</label>
        <input id="cfgRepo" placeholder="ferie" value="${cfg.repo || ""}" />
        <label>Branch</label>
        <input id="cfgBranch" placeholder="main" value="${cfg.branch || "main"}" />
        <label>Fine-grained Personal Access Token</label>
        <input id="cfgToken" type="password" placeholder="github_pat_…" value="${cfg.token || ""}" />
        <small style="color:var(--text-muted);font-size:12px;">
          Generer på <a href="https://github.com/settings/personal-access-tokens" target="_blank">github.com/settings/personal-access-tokens</a> med Contents: read &amp; write.
        </small>
        <div class="row">
          <button class="btn" id="cfgCancel">Avbryt</button>
          <button class="btn" id="cfgClear" style="margin-right:auto">Logg ut</button>
          <button class="btn btn-primary" id="cfgSave">Lagre</button>
        </div>
      </div>
    </div>
  `);
  document.body.appendChild(modal);
  modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });
  modal.querySelector("#cfgCancel").addEventListener("click", () => modal.remove());
  modal.querySelector("#cfgClear").addEventListener("click", () => {
    localStorage.removeItem("FERIE_CFG");
    toast("Logget ut."); modal.remove(); render();
  });
  modal.querySelector("#cfgSave").addEventListener("click", () => {
    STORAGE.setCfg({
      user: modal.querySelector("#cfgUser").value,
      owner: modal.querySelector("#cfgOwner").value.trim(),
      repo: modal.querySelector("#cfgRepo").value.trim(),
      branch: modal.querySelector("#cfgBranch").value.trim() || "main",
      token: modal.querySelector("#cfgToken").value.trim()
    });
    toast("Lagret."); modal.remove(); render();
  });
}
document.getElementById("userBtn").addEventListener("click", userModal);

// ===== Søk =====
function buildSearchIndex() {
  const idx = [];
  Object.entries(CITIES).forEach(([slug, c]) => {
    idx.push({ type: "by", name: c.name, hint: c.country, action: () => navigate("city", slug) });
    (c.attractions || []).forEach(a => idx.push({ type: "severdighet", name: a.name, hint: c.name, action: () => navigate("city", slug) }));
    (c.restaurants || []).forEach(r => idx.push({ type: "restaurant", name: r.name, hint: c.name, action: () => navigate("city", slug) }));
    (c.beaches || []).forEach(b => idx.push({ type: "strand", name: b.name, hint: c.name, action: () => navigate("city", slug) }));
    (c.day_trips || []).forEach(d => idx.push({ type: "dagstur", name: d.name, hint: c.name, action: () => navigate("city", slug) }));
    (c.runningRoutes || []).forEach(r => idx.push({ type: "løperute", name: r.name, hint: c.name, action: () => navigate("city", slug) }));
  });
  BOOKINGS.forEach(b => idx.push({ type: "booking", name: b.what, hint: CITIES[b.city]?.name || b.city, action: () => navigate("booking") }));
  return idx;
}
const SEARCH_INDEX = buildSearchIndex();
const $searchInput = document.getElementById("searchInput");
const $searchResults = document.getElementById("searchResults");
$searchInput.addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  if (q.length < 2) { $searchResults.hidden = true; return; }
  const hits = SEARCH_INDEX.filter(i => i.name.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)).slice(0, 12);
  if (hits.length === 0) { $searchResults.hidden = true; return; }
  $searchResults.innerHTML = hits.map((h, i) => `
    <div class="search-results-item" data-i="${i}">
      ${h.name} <small>${h.type} · ${h.hint}</small>
    </div>
  `).join("");
  $searchResults.hidden = false;
  $searchResults.querySelectorAll(".search-results-item").forEach(node => {
    node.addEventListener("click", () => {
      hits[+node.dataset.i].action();
      $searchInput.value = ""; $searchResults.hidden = true;
    });
  });
});
document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrap")) $searchResults.hidden = true;
});

// ===== OSRM routing — cache via sessionStorage =====
async function osrmRoute(from, to, via) {
  const points = [from, ...(via || []), to];
  const key = "OSRM_" + points.map(p => p.map(c => c.toFixed(3)).join(",")).join("|");
  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  const coords = points.map(p => `${p[1]},${p[0]}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    if (!j.routes?.[0]) return null;
    const route = j.routes[0].geometry.coordinates.map(c => [c[1], c[0]]); // til [lat,lng]
    sessionStorage.setItem(key, JSON.stringify(route));
    return route;
  } catch (e) { return null; }
}

// ===== Bilder — faste URLs fra CITIES, fallback til Wikipedia =====
async function cityImage(slug) {
  const c = CITIES[slug];
  if (c?.image) return c.image; // forhåndsdefinert
  // Fallback til Wikipedia
  const key = "WIKI_" + slug;
  const cached = sessionStorage.getItem(key);
  if (cached) return cached;
  try {
    // Bruk engelsk navn — c.name kan inneholde norske ord
    const query = c.name.replace(/ i Tirol/, " in Tirol");
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    const thumb = (j.originalimage?.source || j.thumbnail?.source || "").replace(/\/\d+px-/, "/640px-");
    if (thumb) sessionStorage.setItem(key, thumb);
    return thumb || null;
  } catch { return null; }
}

// ===== Solnedgang/-oppgang =====
async function sunTimes(lat, lng, date) {
  const key = `SUN_${lat.toFixed(3)}_${lng.toFixed(3)}_${date}`;
  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);
  try {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    if (j.status !== "OK") return null;
    sessionStorage.setItem(key, JSON.stringify(j.results));
    return j.results;
  } catch { return null; }
}

// ============================================================
// VIEWS
// ============================================================

async function renderDashboard() {
  const { idx, day, before, after } = dayIndex();
  const totalDays = DAYS.length;
  const startI = Math.max(0, idx);

  $app.innerHTML = `
    ${before || after ? "" : todayCard(day)}

    <h2 style="margin:0 0 8px 0;">Neste 7 dager</h2>
    <div id="next7" class="calendar-list"></div>

    <h2 style="margin:24px 0 8px 0;">Vær der dere skal</h2>
    <div id="weatherGrid" class="card-grid"></div>
  `;

  // Today action
  $app.querySelectorAll('[data-action="city"]').forEach(b => {
    b.addEventListener("click", () => navigate("city", b.dataset.city));
  });

  // Neste 7 dager
  const next7 = $app.querySelector("#next7");
  DAYS.slice(startI, startI + 7).forEach((d, i) => {
    const city = CITIES[d.city];
    if (!city) return;
    const isToday = i === 0 && !before && !after;
    next7.appendChild(makeCalRow(d, city, isToday));
  });
  next7.querySelectorAll(".cal-day").forEach(node => {
    node.addEventListener("click", () => navigate("city", node.dataset.city));
  });

  // Vær for fire kommende destinasjoner
  const $w = $app.querySelector("#weatherGrid");
  const upcoming = [...new Set(DAYS.slice(startI, startI + 14).map(d => d.city))].filter(c => CITIES[c]?.lat && c !== "ferge").slice(0, 4);
  upcoming.forEach(slug => {
    const c = CITIES[slug];
    const card = el(`
      <div class="card">
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
          <span style="font-size:24px;">${c.flag}</span>
          <strong>${c.name}</strong>
        </div>
        <div data-w="${slug}"></div>
        <div data-sun="${slug}" style="margin-top:6px;font-size:12px;color:var(--text-muted);"></div>
      </div>
    `);
    $w.appendChild(card);
    card.querySelector(`[data-w="${slug}"]`).appendChild(WEATHER.render(slug, DAYS.find(d => d.city === slug)?.date));
    // Sol
    sunTimes(c.lat, c.lng, DAYS.find(d => d.city === slug)?.date).then(s => {
      const sunEl = card.querySelector(`[data-sun="${slug}"]`);
      if (s) sunEl.innerHTML = `🌅 Soloppgang ${fmtTime(s.sunrise)} · 🌇 solnedgang ${fmtTime(s.sunset)}`;
    });
  });
}

function todayCard(day) {
  const lodg = lodgingFor(day);
  return `
    <div class="today-card">
      <div class="today-card-title">I dag</div>
      <h2 style="margin:4px 0 8px 0;">${CITIES[day.city]?.flag || ""} ${day.from} ${day.to !== day.from ? "→ " + day.to : ""}</h2>
      ${day.note ? `<p style="margin:0 0 12px 0;color:var(--text-muted);">${day.note}</p>` : ""}
      ${lodg ? `<div style="margin:0 0 12px 0;font-size:13px;">
        🏠 <strong>${lodg.name}</strong> · ${lodg.address}
        ${lodg.gmaps ? ` · <a href="${lodg.gmaps}" target="_blank">Maps ↗</a>` : ""}
        ${lodg.url ? ` · <a href="${lodg.url}" target="_blank">Booking ↗</a>` : ""}
      </div>` : ""}
      ${day.km > 0 ? `<p style="margin:0;font-size:14px;"><strong>${day.km} km</strong> · ${day.drivetime_h} t kjøring${day.charging_leg ? " · ⚡ " + CHARGING[day.charging_leg].stops.length + " ladestopp" : ""}</p>` : ""}
      <button class="btn btn-primary" style="margin-top:12px;" data-action="city" data-city="${day.city}">Detaljer for ${CITIES[day.city]?.name || day.to}</button>
    </div>
  `;
}

function makeCalRow(d, city, isToday) {
  const lodg = lodgingFor(d);
  return el(`
    <div class="cal-day ${countryClass(city.country)} ${isToday ? "is-today" : ""}" data-city="${d.city}">
      <div>
        <div class="date-num">${new Date(d.date).getDate()}</div>
        <div class="date-day">${d.weekday.slice(0,3)}</div>
      </div>
      <div class="city-flag">${city.flag}</div>
      <div>
        <div class="city-name">${d.from === d.to ? city.name : d.from + " → " + d.to}</div>
        ${d.note ? `<div class="day-note">${d.note}</div>` : ""}
        ${lodg && lodg.address ? `<div class="day-note">🏠 ${lodg.address}</div>` : ""}
        ${d.charging_leg ? `<div class="day-note" style="color:#10b981;">⚡ ${CHARGING[d.charging_leg].stops.length} ladestopp · ${CHARGING[d.charging_leg].charge_min} min</div>` : ""}
      </div>
      ${d.km > 0 ? `<div class="km-pill">${d.km} km · ${d.drivetime_h} t</div>` : `<div class="km-pill">${city.name}</div>`}
    </div>
  `);
}

// ===== Hovedkart med OSRM =====
async function renderMap() {
  $app.innerHTML = `<div id="map"></div>
    <div style="margin-top:12px;font-size:13px;color:var(--text-muted);">
      <span id="routeStatus">Henter kjøreruter fra OSRM …</span>
    </div>`;
  setTimeout(async () => {
    const map = L.map("map", { scrollWheelZoom: false }).setView([52, 11], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://openstreetmap.org">OSM</a>', maxZoom: 18
    }).addTo(map);

    // Bymarkører
    Object.entries(CITIES).forEach(([slug, c]) => {
      if (!c.lat || slug === "trondheim") return;
      const marker = L.marker([c.lat, c.lng], {
        icon: L.divIcon({
          html: `<div style="background:${c.color};color:white;padding:6px 10px;border-radius:8px;font-size:13px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${c.flag} ${c.name}${c.nights ? " · " + c.nights + "n" : ""}</div>`,
          className: "", iconSize: [120, 30], iconAnchor: [60, 15]
        })
      }).addTo(map);
      marker.on("click", () => navigate("city", slug));
      marker.bindPopup(`<strong>${c.flag} ${c.name}</strong><br>${c.country}<br><a href="#city/${slug}">Detaljer →</a>`);
    });

    // Trondheim som start/slutt
    L.marker([63.4305, 10.3951], {
      icon: L.divIcon({
        html: `<div style="background:#1e40af;color:white;padding:6px 10px;border-radius:8px;font-size:13px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);">🇳🇴 Trondheim</div>`,
        className: "", iconSize: [120, 30], iconAnchor: [60, 15]
      })
    }).addTo(map);

    // Ladestopp-pins
    Object.entries(CHARGING).forEach(([legId, leg]) => {
      leg.stops.forEach(s => {
        if (s.lat && s.lng) {
          L.marker([s.lat, s.lng], {
            icon: L.divIcon({
              html: `<div style="background:#10b981;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3);">⚡</div>`,
              className: "", iconSize: [24, 24], iconAnchor: [12, 12]
            })
          }).addTo(map).bindPopup(`<strong>${s.name}</strong><br>${s.kw} kW · ${s.stalls} ladere<br>${s.minutes} min · ${s.arrive_soc}%→${s.depart_soc}%${s.food ? "<br><em>" + s.food + "</em>" : ""}`);
        }
      });
    });

    // OSRM-ruter per etappe (asynkront)
    const statusEl = document.getElementById("routeStatus");
    let loaded = 0;
    for (const leg of LEGS) {
      const color = leg.ferry ? "#0ea5e9" : "#c2410c";
      const dashArray = leg.ferry ? "8 6" : null;
      if (leg.ferry) {
        // Ferge: trekk rett strek
        L.polyline([leg.from, leg.to], { color, weight: 3, opacity: 0.7, dashArray }).addTo(map);
        loaded++;
        statusEl.textContent = `Lastet ${loaded}/${LEGS.length} etapper`;
        continue;
      }
      osrmRoute(leg.from, leg.to, leg.via).then(coords => {
        loaded++;
        if (coords) {
          L.polyline(coords, { color, weight: 3, opacity: 0.75 }).addTo(map);
        } else {
          L.polyline([leg.from, ...(leg.via || []), leg.to], { color, weight: 3, opacity: 0.5, dashArray: "4 4" }).addTo(map);
        }
        statusEl.textContent = loaded === LEGS.length ? "Klikk på et stopp for å hoppe til detaljer." : `Lastet ${loaded}/${LEGS.length} etapper`;
      });
    }

    map.fitBounds(L.latLngBounds(LEGS.flatMap(l => [l.from, l.to])).pad(0.1));
  }, 50);
}

// ===== Kalender =====
async function renderCalendar() {
  $app.innerHTML = `
    <h2 style="margin-top:8px;">Hele turen, dag for dag</h2>
    <p style="color:var(--text-muted);margin-bottom:16px;">${DAYS.length} dager. Klikk en dag for detaljer.</p>
    <div class="calendar-list" id="calList"></div>
    <div style="margin-top:16px;font-size:12px;color:var(--text-muted);display:flex;gap:6px;flex-wrap:wrap;">
      <span class="badge-info">🇳🇴 Norge</span>
      <span class="badge-info" style="background:#fafaf9;color:#525252;">🇩🇪 Tyskland</span>
      <span class="badge-info" style="background:#dcfce7;color:#166534;">🇦🇹 Østerrike</span>
      <span class="badge-info" style="background:#fed7aa;color:#c2410c;">🇮🇹 Italia</span>
      <span class="badge-info" style="background:#dbeafe;color:#0c4a6e;">⛴️ Ferge</span>
    </div>
  `;
  const list = $app.querySelector("#calList");
  const today = new Date().toISOString().slice(0,10);
  DAYS.forEach(d => {
    const city = CITIES[d.city];
    if (!city) return;
    const node = makeCalRow(d, city, d.date === today);
    node.addEventListener("click", () => navigate("city", d.city));
    list.appendChild(node);
  });
}

// ===== Steder-oversikt =====
async function renderCities() {
  $app.innerHTML = `
    <h2 style="margin-top:8px;">Steder vi besøker</h2>
    <p style="color:var(--text-muted);margin-bottom:16px;">Klikk på et sted for full detaljside.</p>
    <div class="card-grid" id="cityGrid"></div>
  `;
  const grid = $app.querySelector("#cityGrid");
  Object.entries(CITIES).forEach(([slug, c]) => {
    if (slug === "trondheim") return;
    const days = DAYS.filter(d => d.city === slug);
    const node = el(`
      <div class="card" style="cursor:pointer;border-left:4px solid ${c.color};overflow:hidden;">
        <div data-img="${slug}" style="height:120px;background:var(--bg-elevated) center/cover no-repeat;border-radius:8px;margin:-16px -16px 12px -16px;"></div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
          <span style="font-size:36px;">${c.flag}</span>
          <div>
            <div style="font-weight:600;font-size:17px;">${c.name}</div>
            <div style="font-size:12px;color:var(--text-muted);">${c.country} · ${days.length} ${days.length === 1 ? "dag" : "dager"}</div>
          </div>
        </div>
        <p style="font-size:13px;color:var(--text-muted);margin:0;">${c.summary || ""}</p>
        <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">
          ${c.attractions?.length ? `<span class="tag">${c.attractions.length} severdigheter</span>` : ""}
          ${c.restaurants?.length ? `<span class="tag">${c.restaurants.length} restauranter</span>` : ""}
          ${c.beaches?.length ? `<span class="tag">${c.beaches.length} strender</span>` : ""}
          ${c.runningRoutes?.length ? `<span class="tag">${c.runningRoutes.length} løperuter</span>` : ""}
          ${c.day_trips?.length ? `<span class="tag">${c.day_trips.length} dagsturer</span>` : ""}
        </div>
      </div>
    `);
    node.addEventListener("click", () => navigate("city", slug));
    grid.appendChild(node);
    // Hent bilde
    cityImage(slug).then(url => {
      if (url) node.querySelector(`[data-img="${slug}"]`).style.backgroundImage = `url('${url}')`;
    });
  });
}

// ===== By-detalj =====
async function renderCity(slug) {
  const c = CITIES[slug];
  if (!c) { $app.innerHTML = "<p>Sted ikke funnet.</p>"; return; }
  const days = DAYS.filter(d => d.city === slug);

  const tabs = [
    { key: "oversikt", label: "Oversikt", show: true },
    { key: "kart", label: "Kart", show: !!CITY_POIS[slug]?.length },
    { key: "mat", label: "Mat", show: !!c.restaurants?.length },
    { key: "se", label: "Severdigheter", show: !!c.attractions?.length },
    { key: "strand", label: "Strender", show: !!c.beaches?.length },
    { key: "dagstur", label: "Dagsturer", show: !!c.day_trips?.length },
    { key: "trening", label: "Trening", show: !!c.runningRoutes?.length },
    { key: "barn", label: "For barna", show: !!c.kids?.length },
    { key: "vaer", label: "Vær", show: true },
    { key: "praktisk", label: "Praktisk", show: !!c.practical }
  ].filter(t => t.show);

  // Bolig fra dagsplan
  const lodgings = [...new Set(days.map(d => d.lodging_id).filter(Boolean))].map(id => LODGINGS[id]).filter(Boolean);

  $app.innerHTML = `
    <div class="city-header">
      <span class="city-flag-big">${c.flag}</span>
      <div style="flex:1;min-width:0;">
        <h2>${c.name}</h2>
        <div class="country">${c.country} · ${days.length} ${days.length === 1 ? "dag" : "dager"} (${days[0]?.date} – ${days[days.length-1]?.date})</div>
        ${c.summary ? `<p style="margin:4px 0 0 0;color:var(--text-muted);max-width:680px;">${c.summary}</p>` : ""}
        ${lodgings.length ? lodgings.map(l => `
          <div style="margin-top:8px;font-size:14px;background:var(--bg-elevated);padding:8px 12px;border-radius:8px;">
            🏠 <strong>${l.name}</strong>${l.address ? " · " + l.address : ""}
            ${l.gmaps ? ` · <a href="${l.gmaps}" target="_blank">Google Maps ↗</a>` : ""}
            ${l.url ? ` · <a href="${l.url}" target="_blank">Booking ↗</a>` : ""}
          </div>
        `).join("") : ""}
      </div>
      <div data-img="${slug}" style="width:200px;height:120px;background:var(--bg-elevated) center/cover no-repeat;border-radius:10px;flex-shrink:0;"></div>
    </div>

    <div class="city-tabs">
      ${tabs.map((t, i) => `<button class="city-tab ${i===0?"active":""}" data-tab="${t.key}">${t.label}</button>`).join("")}
    </div>

    <div id="tabBody"></div>
  `;

  cityImage(slug).then(url => {
    if (url) $app.querySelector(`[data-img="${slug}"]`).style.backgroundImage = `url('${url}')`;
  });

  function showTab(key) {
    $app.querySelectorAll(".city-tab").forEach(t => t.classList.toggle("active", t.dataset.tab === key));
    renderCityTab(c, slug, key);
  }
  $app.querySelectorAll(".city-tab").forEach(btn => btn.addEventListener("click", () => showTab(btn.dataset.tab)));
  showTab("oversikt");
}

async function renderCityTab(c, slug, tab) {
  const $body = $app.querySelector("#tabBody");
  const userData = {
    wish: await STORAGE.read("wishlist"),
    rate: await STORAGE.read("ratings"),
    com:  await STORAGE.read("comments")
  };

  function itemHtml(itemId, title, meta, body, extras, lat, lng) {
    const wishList = userData.wish[itemId] || [];
    const ratings = userData.rate[itemId] || {};
    const ratingVals = Object.values(ratings);
    const avg = ratingVals.length ? (ratingVals.reduce((a,b)=>a+b,0)/ratingVals.length).toFixed(1) : null;
    const comments = userData.com[itemId] || [];
    const mapsLink = lat && lng ? `<a href="${gmapsLink(lat, lng, title)}" target="_blank" style="font-size:11px;">📍 Maps</a>` : "";
    return `
      <div class="item" data-id="${itemId}">
        <div class="item-title">${title} ${mapsLink}</div>
        ${meta ? `<div class="item-meta">${meta}</div>` : ""}
        ${body ? `<div class="item-body">${body}</div>` : ""}
        ${extras || ""}
        <div class="item-actions">
          <button class="wish-btn ${wishList.includes(STORAGE.currentUser()) ? "active" : ""}" data-act="wish">
            ${wishList.includes(STORAGE.currentUser()) ? "★ I min liste" : "☆ Vil prøve"}
          </button>
          ${wishList.length > 0 ? `<span style="font-size:11px;color:var(--text-muted);">${wishList.join(", ")}</span>` : ""}
          <div class="stars" data-act="stars">
            ${[1,2,3,4,5].map(n => `<button class="star ${ratings[STORAGE.currentUser()]>=n?"filled":""}" data-star="${n}">★</button>`).join("")}
          </div>
          ${avg ? `<span style="font-size:12px;color:var(--text-muted);">snitt ${avg}</span>` : ""}
          <button class="rate-btn" data-act="comment">💬 ${comments.length}</button>
        </div>
        ${comments.length > 0 ? `<div style="margin-top:8px;">${comments.map(c => `<div class="comment"><div class="comment-meta">${c.user} · ${new Date(c.time).toLocaleString("nb-NO",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})}</div>${c.text}</div>`).join("")}</div>` : ""}
      </div>
    `;
  }

  function attachItemHandlers(scope) {
    scope.querySelectorAll(".item").forEach(item => {
      const id = item.dataset.id;
      item.querySelector('[data-act="wish"]').addEventListener("click", async () => {
        await STORAGE.toggleWish(id); toast("Lagret."); renderCityTab(c, slug, tab);
      });
      item.querySelectorAll(".star").forEach(s => {
        s.addEventListener("click", async () => {
          const n = parseInt(s.dataset.star);
          const cur = (await STORAGE.read("ratings"))[id]?.[STORAGE.currentUser()];
          await STORAGE.setRating(id, cur === n ? 0 : n);
          renderCityTab(c, slug, tab);
        });
      });
      item.querySelector('[data-act="comment"]').addEventListener("click", () => {
        const text = prompt("Skriv kommentar:");
        if (text) {
          STORAGE.addComment(id, text).then(() => { toast("Lagt til."); renderCityTab(c, slug, tab); });
        }
      });
    });
  }

  if (tab === "oversikt") {
    $body.innerHTML = `
      <div class="card-grid">
        <div class="card">
          <div class="section-h">Reisedøgn</div>
          ${DAYS.filter(d => d.city === slug).map(d => {
            const lodg = lodgingFor(d);
            return `
              <div style="padding:6px 0;border-bottom:1px dashed var(--border);font-size:13px;">
                <strong>${fmtDate(d.date)}</strong> — ${d.from === d.to ? "her" : d.from + " → " + d.to}
                ${d.note ? `<div style="color:var(--text-muted);font-size:12px;">${d.note}</div>` : ""}
                ${lodg && lodg.address ? `<div style="color:var(--text-muted);font-size:12px;">🏠 ${lodg.address}</div>` : ""}
              </div>
            `;
          }).join("")}
        </div>

        ${c.evening ? `<div class="card"><div class="section-h">Kveldsforslag</div><p style="margin:0;font-size:14px;line-height:1.6;">${c.evening}</p></div>` : ""}
        ${c.quick_2h ? `<div class="card"><div class="section-h">Hvis bare 2 timer</div><p style="margin:0;font-size:14px;">${c.quick_2h}</p></div>` : ""}

        ${c.day_plan ? `
          <div class="card" style="grid-column: 1 / -1;">
            <div class="section-h">${c.day_plan.title}</div>
            ${c.day_plan.schedule.map(s => `<div class="schedule-row"><div class="schedule-time">${s.time}</div><div>${s.what}</div></div>`).join("")}
            ${c.day_plan.bad_weather ? `<div style="margin-top:12px;padding:10px;background:var(--bg-elevated);border-radius:8px;font-size:13px;"><strong>Hvis dårlig vær:</strong> ${c.day_plan.bad_weather}</div>` : ""}
            ${c.day_plan.strong_weather ? `<div style="margin-top:8px;padding:10px;background:var(--bg-elevated);border-radius:8px;font-size:13px;"><strong>Hvis topp form og vær:</strong> ${c.day_plan.strong_weather}</div>` : ""}
          </div>
        ` : ""}

        ${c.evening_plan ? `<div class="card" style="grid-column: 1 / -1;"><div class="section-h">Kveldsplan</div><p style="margin:0;font-size:14px;line-height:1.7;">${c.evening_plan}</p></div>` : ""}
        ${c.morning_plan ? `<div class="card" style="grid-column: 1 / -1;"><div class="section-h">Morgenplan før avreise</div><p style="margin:0;font-size:14px;line-height:1.7;">${c.morning_plan}</p></div>` : ""}

        ${c.booking_priority?.length ? `
          <div class="card" style="grid-column: 1 / -1;">
            <div class="section-h">Booking-rekkefølge</div>
            <ol style="margin:0;padding-left:20px;">
              ${c.booking_priority.map(b => `<li style="margin-bottom:4px;">${b}</li>`).join("")}
            </ol>
          </div>
        ` : ""}

        ${c.must_try_dishes ? `<div class="card" style="grid-column: 1 / -1;"><div class="section-h">Lokale må-prøv-retter</div><p style="margin:0;font-size:14px;">${c.must_try_dishes}</p></div>` : ""}

        ${c.hotels?.length ? `
          <div class="card" style="grid-column: 1 / -1;">
            <div class="section-h">Hotellforslag</div>
            ${c.hotels.map(h => `
              <div style="padding:10px 0;border-bottom:1px dashed var(--border);">
                <strong>${h.name}</strong> · ${h.address}<br>
                <span style="font-size:13px;color:var(--text-muted);">${h.price_eur} €/natt · Parkering ${h.parking}</span><br>
                <span style="font-size:13px;">${h.note}</span>
              </div>
            `).join("")}
          </div>
        ` : ""}

        ${c.avoid ? `<div class="card" style="grid-column: 1 / -1;border-left:4px solid #ef4444;"><div class="section-h">Unngå</div><p style="margin:0;font-size:14px;">${c.avoid}</p></div>` : ""}
      </div>
    `;
  } else if (tab === "kart") {
    $body.innerHTML = `<div id="cityMap" style="height:60vh;border-radius:14px;border:1px solid var(--border);"></div>
      <div style="margin-top:8px;font-size:12px;color:var(--text-muted);">Pinner: 🏠 bolig (oransje, stor) · 🏖️ strand · 🍽️ mat · ⛪ severdighet · 🚠 dagstur · ⚡ lading · 💊 praktisk</div>`;
    setTimeout(() => {
      const pois = CITY_POIS[slug] || [];
      // Start tett zoomet rundt boligen — bruker kan zoome ut for dagsturer
      const lodgingPoi = pois.find(p => p.type === "lodging");
      const center = lodgingPoi ? [lodgingPoi.lat, lodgingPoi.lng] : [c.lat, c.lng];
      const cm = L.map("cityMap", { scrollWheelZoom: false }).setView(center, 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OSM', maxZoom: 19
      }).addTo(cm);
      const colorFor = { lodging: "#c2410c", strand: "#0ea5e9", mat: "#7c3aed", se: "#16a34a", dagstur: "#f59e0b", lade: "#10b981", praktisk: "#64748b" };
      const bounds = [];
      let lodgingMarker = null;
      pois.forEach(p => {
        const isLodging = p.type === "lodging";
        const color = colorFor[p.type] || "#525252";
        const size = isLodging ? 44 : 30;
        const m = L.marker([p.lat, p.lng], {
          icon: L.divIcon({
            html: isLodging
              ? `<div style="position:relative;">
                  <div style="background:${color};color:white;width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 14px rgba(194,65,12,0.5);border:3px solid white;">${p.icon}</div>
                  <div style="position:absolute;top:${size + 4}px;left:50%;transform:translateX(-50%);background:#c2410c;color:white;font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.2);">DU BOR HER</div>
                </div>`
              : `<div style="background:${color};color:white;width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 6px rgba(0,0,0,0.3);">${p.icon}</div>`,
            className: "", iconSize: [size, size], iconAnchor: [size / 2, size / 2]
          }),
          zIndexOffset: isLodging ? 1000 : 0
        }).addTo(cm);
        const popupContent = `<strong>${p.icon} ${p.name}</strong><br><a href="${gmapsLink(p.lat, p.lng, p.name)}" target="_blank">Maps ↗</a>${p.url ? ` · <a href="${p.url}" target="_blank">Booking ↗</a>` : ""}`;
        m.bindPopup(popupContent);
        if (isLodging) lodgingMarker = m;
        bounds.push([p.lat, p.lng]);
      });
      // Behold tett zoom rundt boligen. Brukere kan zoome ut manuelt.
      // Åpne bolig-popup automatisk
      if (lodgingMarker) setTimeout(() => lodgingMarker.openPopup(), 400);
    }, 50);
  } else if (tab === "mat") {
    $body.innerHTML = c.restaurants.map((r, i) => {
      const poi = (CITY_POIS[slug] || []).find(p => p.name.includes(r.name.split(" ")[0]) || r.name.includes(p.name.split(" ")[0]));
      return itemHtml(
        `${slug}-mat-${i}`,
        r.name,
        `${r.address} · ${r.type}`,
        r.must_try || "",
        `<div style="margin-top:6px;">
          <span class="tag tag-price">${r.price}</span>
          <span class="tag">Barn: ${r.kids}</span>
          ${r.booking ? `<span class="tag">📅 ${r.booking}</span>` : ""}
        </div>`,
        poi?.lat, poi?.lng
      );
    }).join("");
    attachItemHandlers($body);
  } else if (tab === "se") {
    $body.innerHTML = c.attractions.map((a, i) => {
      const poi = (CITY_POIS[slug] || []).find(p => p.name.includes(a.name.split(" ")[0]) || a.name.includes(p.name.split(" ")[0]));
      return itemHtml(
        `${slug}-se-${i}`, a.name,
        a.distance ? `Avstand: ${a.distance}` : "",
        a.why,
        a.kids ? `<div style="margin-top:6px;"><span class="tag">Barn: ${a.kids}</span></div>` : "",
        poi?.lat, poi?.lng
      );
    }).join("");
    attachItemHandlers($body);
  } else if (tab === "strand") {
    $body.innerHTML = c.beaches.map((b, i) => {
      const poi = (CITY_POIS[slug] || []).find(p => p.name.includes(b.name.split(" ")[0]) || b.name.includes(p.name.split(" ")[0]));
      return itemHtml(
        `${slug}-strand-${i}`, b.name,
        `${b.address} · ${b.distance}`,
        `<strong>Underlag:</strong> ${b.surface}<br><strong>Familie:</strong> ${b.family}<br><strong>Pris:</strong> ${b.price}`,
        `<div style="margin-top:6px;font-size:12px;color:var(--text-muted);"><strong>Best:</strong> ${b.best_for} · <strong>Parkering:</strong> ${b.parking}</div>`,
        poi?.lat, poi?.lng
      );
    }).join("");
    attachItemHandlers($body);
  } else if (tab === "dagstur") {
    $body.innerHTML = c.day_trips.map((d, i) => {
      const poi = (CITY_POIS[slug] || []).find(p => p.name.includes(d.name.split(" ")[0]));
      return itemHtml(
        `${slug}-dag-${i}`, d.name,
        `${d.drive_min} min kjøring`,
        d.why,
        d.plan ? `<div style="margin-top:6px;padding:8px 10px;background:var(--bg-elevated);border-radius:6px;font-size:13px;"><strong>Plan:</strong> ${d.plan}</div>` : "",
        poi?.lat, poi?.lng
      );
    }).join("");
    attachItemHandlers($body);
  } else if (tab === "trening") {
    let html = `<div style="margin-bottom:12px;color:var(--text-muted);font-size:13px;">Løperuter for Carl. ⬇ GPX gir startpunkt — for full rute bruk Komoot/ABRP.</div>`;
    html += c.runningRoutes.map((r, i) => itemHtml(
      `${slug}-løp-${i}`, r.name,
      `${r.distance_km} km · ${r.elevation_m} hm · ${r.surface}`,
      r.note || "",
      `<div style="margin-top:6px;"><button class="btn" data-gpx="${i}" style="font-size:12px;padding:4px 10px;">⬇ GPX</button> <a class="btn" href="https://www.komoot.com/discover/${encodeURIComponent(c.name)}/hiking" target="_blank" style="font-size:12px;padding:4px 10px;text-decoration:none;">Komoot ↗</a></div>`
    )).join("");
    if (c.bike_routes?.length) {
      html += `<h3 style="margin-top:24px;">Sykkelruter</h3>`;
      html += c.bike_routes.map((r, i) => itemHtml(
        `${slug}-syk-${i}`, r.name,
        `${r.distance_km} km · ${r.elevation_m} hm · ${r.difficulty}`,
        r.surface + (r.time ? " · " + r.time : ""),
        r.family ? `<div style="margin-top:6px;"><span class="tag">${r.family}</span></div>` : ""
      )).join("");
    }
    if (c.bike_rental?.length) {
      html += `<div class="card" style="margin-top:12px;"><div class="section-h">Sykkelutleie</div><ul style="margin:0;padding-left:18px;">${c.bike_rental.map(b => `<li style="margin-bottom:4px;font-size:13px;">${b}</li>`).join("")}</ul></div>`;
    }
    $body.innerHTML = html;
    attachItemHandlers($body);
    $body.querySelectorAll("[data-gpx]").forEach(btn => {
      btn.addEventListener("click", () => exportGpx(c, c.runningRoutes[+btn.dataset.gpx]));
    });
  } else if (tab === "barn") {
    $body.innerHTML = c.kids.map((k, i) => {
      if (typeof k === "string") {
        const parts = k.split(" — ");
        return itemHtml(`${slug}-barn-${i}`, parts[0], "", parts.slice(1).join(" — "), "");
      }
      return itemHtml(`${slug}-barn-${i}`, k.name || k.title || "", "", k.why || k.note || "", "");
    }).join("");
    attachItemHandlers($body);
  } else if (tab === "vaer") {
    const wrap = el(`<div class="card"><div class="section-h">7-dagers varsel</div><div id="weatherBody"></div></div>`);
    $body.innerHTML = "";
    $body.appendChild(wrap);
    wrap.querySelector("#weatherBody").appendChild(WEATHER.render(slug, DAYS.find(d => d.city === slug)?.date));

    // Sol per dag
    const sunWrap = el(`<div class="card" style="margin-top:12px;"><div class="section-h">Sol per dag (for løperuter og kveld)</div><div id="sunList" style="font-size:13px;color:var(--text-muted);">Henter sol-tider …</div></div>`);
    $body.appendChild(sunWrap);
    const sunList = sunWrap.querySelector("#sunList");
    sunList.innerHTML = "";
    DAYS.filter(d => d.city === slug).slice(0, 5).forEach(async d => {
      const s = await sunTimes(c.lat, c.lng, d.date);
      if (s) {
        sunList.appendChild(el(`<div style="padding:4px 0;border-bottom:1px dashed var(--border);">
          <strong>${fmtDate(d.date)}</strong>: 🌅 ${fmtTime(s.sunrise)} · ☀️ middag ${fmtTime(s.solar_noon)} · 🌇 ${fmtTime(s.sunset)} · dagslys ${Math.floor(s.day_length / 3600)}t ${Math.floor((s.day_length % 3600) / 60)}m
        </div>`));
      }
    });

    if (c.rainy?.length) {
      const rainy = el(`<div class="card" style="margin-top:12px;"><div class="section-h">Hvis det regner</div><ul style="margin:0;padding-left:18px;">${c.rainy.map(r => `<li style="margin-bottom:6px;font-size:14px;">${r}</li>`).join("")}</ul></div>`);
      $body.appendChild(rainy);
    }
  } else if (tab === "praktisk") {
    const p = c.practical || {};
    const country = countryCode(c.country);
    const em = EMERGENCY[country];
    $body.innerHTML = `
      <div class="card-grid">
        ${p.charging ? `<div class="card"><div class="section-h">⚡ Lading</div><p style="margin:0;font-size:14px;">${p.charging}</p></div>` : ""}
        ${p.market ? `<div class="card"><div class="section-h">🛍️ Marked</div><p style="margin:0;font-size:14px;">${p.market}</p></div>` : ""}
        ${p.supermarket ? `<div class="card"><div class="section-h">🛒 Supermarked</div><p style="margin:0;font-size:14px;">${p.supermarket}</p></div>` : ""}
        ${p.pharmacy ? `<div class="card"><div class="section-h">💊 Apotek</div><p style="margin:0;font-size:14px;">${p.pharmacy}</p></div>` : ""}
        ${p.parking ? `<div class="card"><div class="section-h">🅿️ Parkering</div><p style="margin:0;font-size:14px;">${p.parking}</p></div>` : ""}
        ${p.ztl ? `<div class="card"><div class="section-h">🚫 ZTL</div><p style="margin:0;font-size:14px;">${p.ztl}</p></div>` : ""}
        ${p.tips ? `<div class="card"><div class="section-h">Tips</div><p style="margin:0;font-size:14px;">${p.tips}</p></div>` : ""}
        ${em ? `<div class="card" style="border-left:4px solid #ef4444;">
          <div class="section-h">🚨 Nødnummer i ${c.country}</div>
          <div style="font-size:14px;line-height:1.7;">
            <strong>Ambulanse:</strong> ${em.ambulance}<br>
            <strong>Politi:</strong> ${em.police}<br>
            <strong>Brann:</strong> ${em.fire}<br>
            ${em.embassy ? `<div style="margin-top:6px;font-size:13px;">${em.embassy}</div>` : ""}
          </div>
        </div>` : ""}
      </div>
    `;
  }
}

function exportGpx(city, route) {
  const gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Ferie 2026" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata><name>${route.name}</name><time>${new Date().toISOString()}</time></metadata>
  <wpt lat="${city.lat}" lon="${city.lng}"><name>${route.name}</name>
    <desc>${route.distance_km} km · ${route.elevation_m} hm · ${route.surface || ""}. ${route.note || ""}</desc>
  </wpt>
</gpx>`;
  const blob = new Blob([gpx], { type: "application/gpx+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `${route.name.replace(/[^\w]+/g,"_")}.gpx`; a.click();
  URL.revokeObjectURL(url);
  toast("GPX eksportert (startpunkt). Bruk Komoot for full rute.");
}

// ===== Ladeplan =====
function renderCharging() {
  $app.innerHTML = `
    <h2 style="margin-top:8px;">Ladeplan — Tesla Model Y Juniper</h2>
    <p style="color:var(--text-muted);">${TRIP.car.notes} Strategi: ankomst 10–25 %, lade til 60–75 %.</p>
    <div id="chargeList" style="margin-top:16px;"></div>
  `;
  const list = $app.querySelector("#chargeList");
  Object.entries(CHARGING).forEach(([id, leg]) => {
    const isCritical = leg.km > 700;
    const node = el(`
      <div class="card" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:start;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
          <div>
            <h3 style="margin:0 0 2px 0;">${leg.from} → ${leg.to}</h3>
            <div style="font-size:13px;color:var(--text-muted);">${leg.km} km · ${leg.drive_h} t kjøring · ${leg.charge_min} min lading</div>
          </div>
          ${isCritical ? `<span class="badge-crit">KRITISK</span>` : leg.km > 400 ? `<span class="badge-warn">LANG</span>` : ""}
        </div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px;">${leg.route}</div>
        ${leg.stops.length === 0 ? `<div style="font-size:13px;color:#10b981;font-weight:500;">✓ Direkte — ingen ladestopp nødvendig</div>` : leg.stops.map(s => `
          <div class="charge-stop">
            <span class="charge-stop-icon">⚡</span>
            <div style="flex:1;">
              <strong>${s.name}</strong>
              ${s.lat && s.lng ? ` · <a href="${gmapsLink(s.lat, s.lng, s.name)}" target="_blank" style="font-size:11px;">📍 Maps</a>` : ""}
              <span class="tag tag-price">${s.minutes} min</span>
              <div class="charge-stop-meta">${s.type} · ${s.kw} kW · ${s.stalls} ladere · ${s.arrive_soc}% → ${s.depart_soc}%</div>
              ${s.food ? `<div class="charge-stop-meta">🍔 ${s.food}</div>` : ""}
              ${s.backup ? `<div class="charge-stop-meta" style="color:var(--text-muted);">↪ Backup: ${s.backup}</div>` : ""}
            </div>
          </div>
        `).join("")}
        ${leg.notes ? `<div style="margin-top:8px;font-size:13px;color:var(--text-muted);font-style:italic;">${leg.notes}</div>` : ""}
      </div>
    `);
    list.appendChild(node);
  });
}

// ===== Bookinger =====
async function renderBookings() {
  const data = await STORAGE.read("bookings");
  $app.innerHTML = `
    <h2 style="margin-top:8px;">Bookings-tracker</h2>
    <p style="color:var(--text-muted);">${BOOKINGS.length} ting å bestille. Huk av når ferdig.</p>
    <div id="bookList" style="margin-top:16px;"></div>
  `;
  const list = $app.querySelector("#bookList");
  const today = new Date().toISOString().slice(0,10);
  BOOKINGS.forEach(b => {
    const done = data[b.id]?.done;
    const overdue = b.deadline && b.deadline < today && !done;
    const node = el(`
      <div class="card" style="margin-bottom:8px;border-left:4px solid ${done ? "#10b981" : overdue ? "#ef4444" : "var(--accent)"};">
        <div style="display:flex;gap:10px;align-items:flex-start;">
          <input type="checkbox" data-id="${b.id}" ${done ? "checked" : ""} style="width:20px;height:20px;cursor:pointer;flex-shrink:0;margin-top:2px;">
          <div style="flex:1;">
            <div style="font-weight:600;${done ? "text-decoration:line-through;color:var(--text-muted);" : ""}">${b.what}</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">
              ${CITIES[b.city]?.flag || ""} ${CITIES[b.city]?.name || b.city}
              ${b.deadline ? ` · 📅 frist ${fmtDate(b.deadline)}${overdue ? ' <span class="badge-crit">FORSINKET</span>' : ''}` : ""}
            </div>
            ${b.note ? `<div style="font-size:13px;margin-top:6px;">${b.note}</div>` : ""}
            ${b.url ? `<div style="margin-top:6px;"><a href="${b.url}" target="_blank">${b.url} ↗</a></div>` : ""}
          </div>
        </div>
      </div>
    `);
    list.appendChild(node);
  });
  list.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", async () => {
      const id = cb.dataset.id;
      const d = await STORAGE.read("bookings");
      d[id] = { done: cb.checked, by: STORAGE.currentUser(), time: new Date().toISOString() };
      await STORAGE.write("bookings", d);
      toast(cb.checked ? "Bestilt ✓" : "Ikke bestilt");
      renderBookings();
    });
  });
}

// ===== Pakkeliste =====
const PACKING_TEMPLATE = {
  felles: [
    "Pass × 5",
    "Reisedokumenter mappe",
    "Color Line-billetter",
    "Bestilling-bekreftelser (Airbnb, hoteller)",
    "Bilen: førerkort, vognkort, grønt forsikringskort",
    "Førstehjelpsskrin",
    "Solkrem ×2",
    "Insektsmiddel",
    "Reseptmedisiner",
    "Vannflasker × 5",
    "Garmin-ladere, telefonladere, adaptere (EU)",
    "Tesla CCS-ladekort (backup)",
    "Strandhåndklær × 5",
    "Vannskor til Elias",
    "Sykkelhjelmer (hvis vi leier sykler)",
    "Mat-pakke for kjøredager (snacks, frukt, sjokomelk)"
  ],
  carl: ["Løpesko ×2", "Garmin", "Stryd løpseffektmåler", "Laktatmåler", "HRV-måler", "Løpetøy 7 sett", "Humira (kjøledose for hele turen)"],
  anne: ["Løpesko", "Treningstøy 5 sett", "Snorkel/finner", "Bok"],
  miriam: ["Telefon + ladere", "Bok ×2", "Strandbag", "Egne strandklær"],
  daniel: ["Telefon", "Switch + spill", "Skytebriller (Gardaland)", "Strandutstyr"],
  elias: ["Switch", "Egne strandleker", "Vannskor", "Sjøs-kart-puttebok"]
};

async function renderPacking() {
  const data = await STORAGE.read("packing");
  $app.innerHTML = `
    <h2 style="margin-top:8px;">Pakkeliste</h2>
    <p style="color:var(--text-muted);">Huk av etter hvert som ting pakkes. Endringer lagres på tvers av familien.</p>
    <div id="packList" style="margin-top:16px;"></div>
  `;
  const list = $app.querySelector("#packList");
  Object.entries(PACKING_TEMPLATE).forEach(([who, items]) => {
    const userEmoji = TRIP.travelers.find(t => t.id === who)?.emoji || "🎒";
    const card = el(`<div class="card" style="margin-bottom:12px;">
      <div class="section-h">${userEmoji} ${who === "felles" ? "Felles" : who.charAt(0).toUpperCase() + who.slice(1)}</div>
      <div data-who="${who}"></div>
      <div style="margin-top:8px;display:flex;gap:6px;">
        <input class="search-input" data-who="${who}" placeholder="Legg til ny ting …" style="flex:1;font-size:13px;">
        <button class="btn btn-primary" data-add="${who}" style="font-size:12px;">+</button>
      </div>
    </div>`);
    list.appendChild(card);
    const container = card.querySelector(`[data-who="${who}"]`);
    const allItems = [...items, ...((data[who]?.extra) || [])];
    allItems.forEach(item => {
      const done = data[who]?.[item];
      const row = el(`<div style="padding:4px 0;display:flex;gap:8px;align-items:center;font-size:14px;">
        <input type="checkbox" data-w="${who}" data-i="${item}" ${done ? "checked" : ""} style="width:18px;height:18px;cursor:pointer;">
        <span style="${done ? "text-decoration:line-through;color:var(--text-muted);" : ""}">${item}</span>
      </div>`);
      container.appendChild(row);
    });
  });
  list.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", async () => {
      const d = await STORAGE.read("packing");
      const who = cb.dataset.w, item = cb.dataset.i;
      if (!d[who]) d[who] = {};
      d[who][item] = cb.checked;
      await STORAGE.write("packing", d);
      renderPacking();
    });
  });
  list.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const who = btn.dataset.add;
      const inp = list.querySelector(`input[data-who="${who}"]`);
      const text = inp.value.trim();
      if (!text) return;
      const d = await STORAGE.read("packing");
      if (!d[who]) d[who] = {};
      if (!d[who].extra) d[who].extra = [];
      d[who].extra.push(text);
      await STORAGE.write("packing", d);
      toast("Lagt til.");
      renderPacking();
    });
  });
}

// ===== Dagbok =====
async function renderDiary() {
  const data = await STORAGE.read("diary");
  $app.innerHTML = `
    <h2 style="margin-top:8px;">Reisedagbok</h2>
    <p style="color:var(--text-muted);">Skriv noen ord per kveld. Vises kronologisk.</p>
    <div id="diaryList" style="margin-top:16px;"></div>
  `;
  const list = $app.querySelector("#diaryList");
  DAYS.forEach(d => {
    const c = CITIES[d.city];
    const entries = data[d.date];
    const arr = Array.isArray(entries) ? entries : (entries ? [entries] : []);
    list.appendChild(el(`
      <div class="card" style="margin-bottom:12px;">
        <div style="font-weight:600;margin-bottom:4px;">${fmtDate(d.date)} · ${c?.flag || ""} ${c?.name || d.to}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">${d.note || ""}</div>
        ${arr.map(e => `
          <div class="diary-entry">
            <div class="diary-meta">${e.user || "?"} · ${e.time ? new Date(e.time).toLocaleString("nb-NO", {hour:"2-digit",minute:"2-digit"}) : ""}</div>
            ${e.text}
          </div>
        `).join("")}
        <textarea class="diary-textarea" data-date="${d.date}" placeholder="Skriv noe fra ${fmtDate(d.date)} …"></textarea>
        <div style="text-align:right;margin-top:6px;">
          <button class="btn btn-primary" data-save="${d.date}" style="font-size:13px;">+ Legg til</button>
        </div>
      </div>
    `));
  });
  list.querySelectorAll("[data-save]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const date = btn.dataset.save;
      const ta = list.querySelector(`textarea[data-date="${date}"]`);
      const text = ta.value.trim();
      if (!text) return;
      await STORAGE.addDiary(date, text);
      toast("Lagret."); renderDiary();
    });
  });
}

// ===== Print-versjon =====
function renderPrint() {
  $app.innerHTML = `
    <button class="btn btn-primary" onclick="window.print()" style="margin-bottom:12px;">🖨️ Skriv ut</button>
    <div style="background:white;color:black;padding:20px;border-radius:8px;font-family:-apple-system,Helvetica,Arial;">
      <h1 style="margin:0 0 8px 0;color:#c2410c;">Sommerferie 2026 — kompakt oversikt</h1>
      <p style="margin:0 0 16px 0;">${TRIP.travelers.map(t => t.name).join(", ")}. ${TRIP.car.model}. Total ${TRIP.totals.km} km · ${TRIP.totals.drivetime_h} t.</p>

      <h2 style="border-bottom:2px solid #c2410c;padding-bottom:4px;">Overnattinger</h2>
      ${[...new Set(DAYS.map(d => d.lodging_id))].filter(Boolean).map(id => {
        const l = LODGINGS[id]; if (!l) return "";
        const nightsHere = DAYS.filter(d => d.lodging_id === id).length;
        return `<div style="padding:6px 0;border-bottom:1px solid #eee;">
          <strong>${l.name}</strong> — ${nightsHere} ${nightsHere === 1 ? "natt" : "netter"}<br>
          ${l.address}${l.url ? "<br>" + l.url : ""}
        </div>`;
      }).join("")}

      <h2 style="border-bottom:2px solid #c2410c;padding-bottom:4px;margin-top:20px;">Dag-for-dag</h2>
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        <thead><tr style="background:#f3f4f6;"><th style="text-align:left;padding:6px;border:1px solid #ddd;">Dato</th><th style="text-align:left;padding:6px;border:1px solid #ddd;">Rute</th><th style="text-align:left;padding:6px;border:1px solid #ddd;">Km</th><th style="text-align:left;padding:6px;border:1px solid #ddd;">Overnatting</th></tr></thead>
        <tbody>
          ${DAYS.map(d => {
            const l = lodgingFor(d);
            return `<tr>
              <td style="padding:4px 6px;border:1px solid #ddd;">${fmtDate(d.date)}</td>
              <td style="padding:4px 6px;border:1px solid #ddd;">${d.from === d.to ? d.from : d.from + " → " + d.to}</td>
              <td style="padding:4px 6px;border:1px solid #ddd;">${d.km || "—"}</td>
              <td style="padding:4px 6px;border:1px solid #ddd;">${l ? l.name + (l.address ? " · " + l.address : "") : "—"}</td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>

      <h2 style="border-bottom:2px solid #c2410c;padding-bottom:4px;margin-top:20px;">Ladeplan (Tesla Model Y)</h2>
      ${Object.entries(CHARGING).map(([id, leg]) => `
        <div style="padding:8px 0;border-bottom:1px solid #eee;">
          <strong>${leg.from} → ${leg.to}</strong> · ${leg.km} km · ${leg.drive_h} t kjøring
          ${leg.stops.length ? "<br>" + leg.stops.map(s => `Lade: ${s.name} (${s.minutes} min, ${s.kw} kW)`).join("<br>") : "<br>Direkte, ingen lading"}
        </div>
      `).join("")}

      <h2 style="border-bottom:2px solid #c2410c;padding-bottom:4px;margin-top:20px;">Nødnummer</h2>
      <div style="font-size:13px;">
        <strong>Norge:</strong> 112 (politi/akutt), 113 (ambulanse), 110 (brann)<br>
        <strong>Tyskland/Østerrike/Italia:</strong> 112 (felles), 144 (ambulanse AT), 118 (ambulanse IT)<br>
        ${Object.entries(EMERGENCY).filter(([k]) => k !== "no" && EMERGENCY[k].embassy).map(([k, em]) => `<div style="margin-top:4px;">${em.embassy}</div>`).join("")}
      </div>
    </div>
  `;
}

// ===== Router =====
function render() {
  const { view, param } = parseRoute();
  document.querySelectorAll(".nav-tab, .mobile-nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.view === view);
  });
  switch (view) {
    case "dashboard": renderDashboard(); break;
    case "map": renderMap(); break;
    case "calendar": renderCalendar(); break;
    case "cities": renderCities(); break;
    case "city": renderCity(param); break;
    case "charging": renderCharging(); break;
    case "booking": renderBookings(); break;
    case "packing": renderPacking(); break;
    case "diary": renderDiary(); break;
    case "print": renderPrint(); break;
    default: renderDashboard();
  }
  window.scrollTo(0, 0);
}

render();

})();
