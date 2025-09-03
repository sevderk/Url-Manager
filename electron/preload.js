const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // auth
  login: (u, p) => ipcRenderer.invoke("auth:login", u, p),
  changePassword: (c, n) => ipcRenderer.invoke("password:change", c, n),

  // urls
  listUrls: () => ipcRenderer.invoke("urls:list"),
  addUrl: (url) => ipcRenderer.invoke("urls:add", url),
  removeUrl: (url) => ipcRenderer.invoke("urls:remove", url),
  openAllUrls: () => ipcRenderer.invoke("urls:openAllExternal"),

  // security Q&A
  getSecQuestion: () => ipcRenderer.invoke("sec:get"),
  setSecQA: (q, a) => ipcRenderer.invoke("sec:set", q, a),
  resetWithSecAnswer: (ans, np) => ipcRenderer.invoke("sec:reset", ans, np),

  // factory reset
  factoryReset: () => ipcRenderer.invoke("factory:reset")
});

