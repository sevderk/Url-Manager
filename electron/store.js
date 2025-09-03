const Store = require("electron-store");
const store = new Store();

function normalizeTr(s) {
  return (s ?? "")
    .trim()
    .toLocaleLowerCase("tr")
    .normalize("NFKD")
    .replace(/\p{Mn}/gu, "");
}

if (!store.get("password")) store.set("password", "proder");
if (!store.get("urls")) store.set("urls", []);

(function migrateSecAnswer() {
  const q = store.get("secQuestion");
  if (!q || typeof q.a !== "string") return;
  const fixed = normalizeTr(q.a);
  if (fixed !== q.a) {
    store.set("secQuestion", { ...q, a: fixed });
  }
})();

function login(username, password) {
  const userOk = username === "proder";
  const passOk = password === store.get("password");
  return userOk && passOk ? { ok: true } : { ok: false };
}

function changePassword(current, next) {
  const stored = store.get("password");
  if (stored !== current) return { ok: false, error: "Mevcut şifre yanlış" };
  if (!next || next.length < 4) return { ok: false, error: "Şifre en az 4 karakter olmalı" };
  store.set("password", next);
  return { ok: true };
}

function listUrls() {
  return store.get("urls") || [];
}

function addUrl(url) {
  if (!url) return { ok: false, error: "URL boş olamaz" };
  if (!/^https?:\/\//i.test(url)) return { ok: false, error: "URL http veya https ile başlamalı" };
  const urls = store.get("urls") || [];
  if (urls.includes(url)) return { ok: false, error: "URL zaten mevcut" };
  urls.push(url);
  store.set("urls", urls);
  return { ok: true, data: urls };
}

function removeUrl(url) {
  let urls = store.get("urls") || [];
  urls = urls.filter((u) => u !== url);
  store.set("urls", urls);
  return { ok: true, data: urls };
}

function setSecQuestion(question, answer) {
  store.set("secQuestion", {
    q: (question || "").trim(),
    a: normalizeTr(answer)
  });
  return { ok: true };
}

function getSecQuestion() {
  const q = store.get("secQuestion");
  if (!q) return { ok: false, error: "Tanımlı değil" };
  return { ok: true, question: q.q };
}

function resetWithSecAnswer(given, newPass) {
  const q = store.get("secQuestion");
  if (!q) return { ok: false, error: "Tanımlı değil" };

  const storedAnswer = normalizeTr(q.a);
  const givenAnswer  = normalizeTr(given);

  if (storedAnswer !== givenAnswer) {
    return { ok: false, error: "Cevap hatalı" };
  }
  if (!newPass || newPass.length < 4) {
    return { ok: false, error: "Şifre en az 4 karakter olmalı" };
  }
  store.set("password", newPass);
  return { ok: true };
}

function factoryReset() {
  store.clear();
  store.set("password", "proder");
  store.set("urls", []);
  return { ok: true };
}

module.exports = {
  login,
  changePassword,
  listUrls,
  addUrl,
  removeUrl,
  setSecQuestion,
  getSecQuestion,
  resetWithSecAnswer,
  factoryReset
};
