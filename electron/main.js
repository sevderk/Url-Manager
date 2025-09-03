const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const storeApi = require("./store.js");

const isDev = !!process.env.VITE_DEV_SERVER_URL;
let mainWindow;

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();
else {
  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 980,
    minHeight: 600,
    backgroundColor: "#ffffff",
    title: "Proder E-ticaret",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.once("ready-to-show", () => mainWindow.show());

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    const indexPath = path.join(__dirname, "..", "dist", "index.html");
    mainWindow.loadFile(indexPath);
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  app.setName("Proder E-ticaret");
  app.setAppUserModelId("com.proder.eticaret");
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ------------ IPC handlers ------------ */
ipcMain.handle("auth:login", (_e, u, p) => storeApi.login(u, p));
ipcMain.handle("password:change", (_e, c, n) => storeApi.changePassword(c, n));

ipcMain.handle("urls:list", () => storeApi.listUrls());
ipcMain.handle("urls:add", (_e, url) => storeApi.addUrl(url));
ipcMain.handle("urls:remove", (_e, url) => storeApi.removeUrl(url));
ipcMain.handle("urls:openAllExternal", async () => {
  const all = storeApi.listUrls() || [];
  let opened = 0;
  for (const u of all) {
    if (/^https?:\/\//i.test(u)) {
      try { await shell.openExternal(u); opened++; } catch {}
    }
  }
  return { ok: opened > 0, opened, total: all.length };
});

ipcMain.handle("sec:get", () => storeApi.getSecQuestion());
ipcMain.handle("sec:set", (_e, q, a) => storeApi.setSecQuestion(q, a));
ipcMain.handle("sec:reset", (_e, ans, np) => storeApi.resetWithSecAnswer(ans, np));

ipcMain.handle("factory:reset", () => storeApi.factoryReset());
