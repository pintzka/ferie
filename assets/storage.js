// Storage — leser/skriver brukerdata. Hovedlagring: GitHub Contents API.
// Fallback: localStorage hvis GitHub-konfig mangler.
//
// Config settes ved første gangs bruk via Bruker-modalen.
// Lagres i localStorage som FERIE_CFG (JSON: { owner, repo, branch, token, user }).
//
// Data lagres i mappen data/ i repoet:
//   data/wishlist.json    — ønsker (per bruker)
//   data/ratings.json     — stjerneratings
//   data/comments.json    — kommentarer per item
//   data/budget.json      — faktisk forbruk per dag/kategori
//   data/diary.json       — dagbokposter per dag
//   data/photos.json      — bildelenker per dag

const STORAGE = (() => {
  const CFG_KEY = "FERIE_CFG";
  const CACHE_PREFIX = "FERIE_CACHE_";

  function getCfg() {
    try { return JSON.parse(localStorage.getItem(CFG_KEY)) || {}; }
    catch { return {}; }
  }

  function setCfg(cfg) {
    localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
  }

  function isConfigured() {
    const c = getCfg();
    return c.owner && c.repo && c.token;
  }

  function isReadOnlyConfigured() {
    const c = getCfg();
    return c.owner && c.repo; // ingen token = read-only
  }

  function currentUser() {
    return getCfg().user || "Anonym";
  }

  // GitHub API
  async function ghGet(path) {
    const cfg = getCfg();
    if (!cfg.owner || !cfg.repo) return null;
    const branch = cfg.branch || "main";
    const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}?ref=${branch}`;
    const headers = { Accept: "application/vnd.github.v3+json" };
    if (cfg.token) headers.Authorization = `Bearer ${cfg.token}`;
    const r = await fetch(url, { headers });
    if (r.status === 404) return { content: null, sha: null };
    if (!r.ok) throw new Error(`GET ${path}: ${r.status}`);
    const j = await r.json();
    return { content: JSON.parse(atob(j.content.replace(/\n/g, ""))), sha: j.sha };
  }

  async function ghPut(path, data, sha) {
    const cfg = getCfg();
    if (!cfg.owner || !cfg.repo || !cfg.token) throw new Error("Mangler GitHub-konfig");
    const branch = cfg.branch || "main";
    const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${path}`;
    const body = {
      message: `Oppdater ${path} via ferieside`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2)))),
      branch
    };
    if (sha) body.sha = sha;
    const r = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (!r.ok) {
      const err = await r.text();
      throw new Error(`PUT ${path}: ${r.status} ${err}`);
    }
    return r.json();
  }

  // Lokal cache + lokal-only fallback
  function localGet(key) {
    try { return JSON.parse(localStorage.getItem(CACHE_PREFIX + key)) || null; }
    catch { return null; }
  }
  function localSet(key, value) {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(value));
  }

  // Public read
  async function read(filename) {
    // Først cache
    const cached = localGet(filename);
    if (!isReadOnlyConfigured()) return cached || defaultFor(filename);

    try {
      const { content, sha } = await ghGet(`data/${filename}.json`);
      if (content) {
        localSet(filename, content);
        localSet(filename + "_sha", sha);
        return content;
      }
      return defaultFor(filename);
    } catch (e) {
      console.warn("read fallback:", e.message);
      return cached || defaultFor(filename);
    }
  }

  // Public write — optimistisk locking via sha
  async function write(filename, data) {
    localSet(filename, data); // alltid cache først (snappy UX)
    if (!isConfigured()) {
      return { local: true };
    }
    try {
      const sha = localGet(filename + "_sha");
      const res = await ghPut(`data/${filename}.json`, data, sha);
      localSet(filename + "_sha", res.content.sha);
      return res;
    } catch (e) {
      // SHA-konflikt — hent ny, retry én gang
      if (e.message.includes("409") || e.message.includes("sha")) {
        try {
          const { sha: freshSha } = await ghGet(`data/${filename}.json`);
          const res = await ghPut(`data/${filename}.json`, data, freshSha);
          localSet(filename + "_sha", res.content.sha);
          return res;
        } catch (e2) {
          console.error("write retry failed:", e2);
          throw e2;
        }
      }
      throw e;
    }
  }

  function defaultFor(filename) {
    const defaults = {
      wishlist: {},   // { itemId: [user1, user2] }
      ratings: {},    // { itemId: { user: stars } }
      comments: {},   // { itemId: [{ user, time, text }] }
      diary: {},      // { date: { user, text, time } eller [{...}] }
      photos: {},     // { date: [{ url, caption, user }] }
      bookings: {},   // { bookingId: { done: bool, by, time } }
      packing: {}     // { whoId: { item: bool, extra: [str] } }
    };
    return defaults[filename] || {};
  }

  // Convenience
  async function toggleWish(itemId, user) {
    user = user || currentUser();
    const data = await read("wishlist");
    if (!data[itemId]) data[itemId] = [];
    const idx = data[itemId].indexOf(user);
    if (idx >= 0) data[itemId].splice(idx, 1);
    else data[itemId].push(user);
    if (data[itemId].length === 0) delete data[itemId];
    await write("wishlist", data);
    return data;
  }

  async function setRating(itemId, stars, user) {
    user = user || currentUser();
    const data = await read("ratings");
    if (!data[itemId]) data[itemId] = {};
    if (stars === 0) delete data[itemId][user];
    else data[itemId][user] = stars;
    if (Object.keys(data[itemId]).length === 0) delete data[itemId];
    await write("ratings", data);
    return data;
  }

  async function addComment(itemId, text, user) {
    user = user || currentUser();
    const data = await read("comments");
    if (!data[itemId]) data[itemId] = [];
    data[itemId].push({ user, time: new Date().toISOString(), text });
    await write("comments", data);
    return data;
  }

  async function addDiary(date, text, user) {
    user = user || currentUser();
    const data = await read("diary");
    if (!data[date]) data[date] = [];
    if (!Array.isArray(data[date])) data[date] = [data[date]];
    data[date].push({ user, text, time: new Date().toISOString() });
    await write("diary", data);
    return data;
  }

  async function addPhoto(date, url, caption, user) {
    user = user || currentUser();
    const data = await read("photos");
    if (!data[date]) data[date] = [];
    data[date].push({ url, caption, user, time: new Date().toISOString() });
    await write("photos", data);
    return data;
  }

  return {
    getCfg, setCfg, isConfigured, isReadOnlyConfigured, currentUser,
    read, write,
    toggleWish, setRating, addComment, addDiary, addPhoto
  };
})();
