// Vær via open-meteo.com — gratis, ingen API-nøkkel.
// 7-dagers prognose når aktuell, ellers klimanormaler (statiske månedsverdier).

const WEATHER = (() => {
  const cache = {}; // { citySlug: { ts, data } }
  const TTL_MS = 30 * 60 * 1000; // 30 min cache

  // Klimanormaler juni/juli for hver by (omtrentlige verdier basert på meteo-statistikk)
  const CLIMATE = {
    oslo:     { jun: { hi: 19, lo: 11, rain: 30 }, jul: { hi: 22, lo: 13, rain: 35 } },
    berlin:   { jun: { hi: 23, lo: 13, rain: 28 }, jul: { hi: 25, lo: 15, rain: 30 } },
    dresden:  { jun: { hi: 23, lo: 12, rain: 30 }, jul: { hi: 25, lo: 14, rain: 35 } },
    seefeld:  { jun: { hi: 19, lo: 9,  rain: 40 }, jul: { hi: 21, lo: 11, rain: 45 } },
    bardolino:{ jun: { hi: 27, lo: 17, rain: 25 }, jul: { hi: 30, lo: 19, rain: 20 } },
    grado:    { jun: { hi: 27, lo: 17, rain: 22 }, jul: { hi: 29, lo: 19, rain: 18 } },
    hof:      { jun: { hi: 21, lo: 11, rain: 35 }, jul: { hi: 23, lo: 13, rain: 38 } },
    hamburg:  { jun: { hi: 21, lo: 12, rain: 30 }, jul: { hi: 23, lo: 14, rain: 35 } },
    trondheim:{ jun: { hi: 17, lo: 9,  rain: 35 }, jul: { hi: 19, lo: 11, rain: 40 } },
    ferge:    { jun: { hi: 18, lo: 12, rain: 25 }, jul: { hi: 20, lo: 13, rain: 25 } }
  };

  function iconFor(code) {
    // WMO codes
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    if (code <= 99) return "⛈️";
    return "🌤️";
  }

  async function fetchForecast(slug) {
    const city = CITIES[slug];
    if (!city || !city.lat) return null;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto`;
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      const j = await r.json();
      return j.daily;
    } catch (e) {
      console.warn("vær feilet:", e.message);
      return null;
    }
  }

  async function get(slug) {
    if (!CITIES[slug]) return null;
    const now = Date.now();
    if (cache[slug] && now - cache[slug].ts < TTL_MS) return cache[slug].data;
    const data = await fetchForecast(slug);
    cache[slug] = { ts: now, data };
    return data;
  }

  function climateFor(slug) {
    const c = CLIMATE[slug];
    if (!c) return null;
    return c; // returnerer både juni og juli
  }

  function isInsideForecastWindow(dateStr) {
    const target = new Date(dateStr + "T12:00:00");
    const now = Date.now();
    const days = (target - now) / 86400000;
    return days >= -1 && days < 7;
  }

  function render(slug, dateStr) {
    const climate = climateFor(slug);
    const month = dateStr ? new Date(dateStr).getMonth() : new Date().getMonth();
    const clim = climate ? climate[month === 5 ? "jun" : "jul"] : null;

    if (isInsideForecastWindow(dateStr || new Date().toISOString().slice(0,10))) {
      const wrap = document.createElement("div");
      wrap.className = "weather-row";
      wrap.innerHTML = `<div style="grid-column: 1 / -1; color: var(--text-muted); font-size: 12px;">Henter live varsel …</div>`;
      get(slug).then(daily => {
        if (!daily) {
          if (clim) wrap.innerHTML = climateHtml(clim, dateStr);
          else wrap.innerHTML = `<div style="color: var(--text-muted); font-size: 12px;">Vær ikke tilgjengelig.</div>`;
          return;
        }
        const cells = daily.time.map((d, i) => {
          const date = new Date(d);
          const dayName = ["søn","man","tir","ons","tor","fre","lør"][date.getDay()];
          const hi = Math.round(daily.temperature_2m_max[i]);
          const lo = Math.round(daily.temperature_2m_min[i]);
          const code = daily.weather_code[i];
          const rain = daily.precipitation_sum[i];
          return `<div class="weather-cell">
            <div class="w-day">${dayName} ${date.getDate()}</div>
            <div class="w-icon">${iconFor(code)}</div>
            <div class="w-temp">${hi}° <small>${lo}°</small></div>
            ${rain > 0.5 ? `<div style="color:#0ea5e9;font-size:10px;">${rain.toFixed(0)} mm</div>` : ""}
          </div>`;
        }).join("");
        wrap.innerHTML = cells;
      });
      return wrap;
    }

    // Utenfor varselvindu — vis klimanormaler
    if (clim) {
      const div = document.createElement("div");
      div.innerHTML = climateHtml(clim, dateStr);
      return div;
    }
    const fall = document.createElement("div");
    fall.style.fontSize = "12px";
    fall.style.color = "var(--text-muted)";
    fall.textContent = "Vær: data ikke tilgjengelig.";
    return fall;
  }

  function climateHtml(clim, dateStr) {
    const month = dateStr ? new Date(dateStr).toLocaleDateString("nb-NO", { month: "long" }) : "denne måneden";
    return `<div style="font-size:13px;color:var(--text-muted);">
      <strong style="color:var(--text);">${clim.hi}° / ${clim.lo}°</strong> typisk ${month}.
      Nedbør ~ ${clim.rain} mm. <em>Live varsel tilgjengelig fra 7 dager før.</em>
    </div>`;
  }

  return { get, render, climateFor };
})();
