import { useState } from "react";
import { Button } from "./ui";
import Home from "./home/Home.jsx";
import Settings from "./settings/Settings.jsx";
import Urls from "./urls/Urls.jsx";

export default function Layout({ onLogout }) {
  const [tab, setTab] = useState("home");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="title">
            <span className="brand-dot" />
            Proder E-ticaret
          </div>
          <span className="app-badge">v1.0</span>
        </div>

        {/* metin sekmeleri */}
        <div className="tabs">
          <button
            className={`tab ${tab === "home" ? "active" : ""}`}
            onClick={() => setTab("home")}
          >
            Ana Sayfa
          </button>
          <button
            className={`tab ${tab === "urls" ? "active" : ""}`}
            onClick={() => setTab("urls")}
          >
            URL’ler
          </button>
          <button
            className={`tab ${tab === "settings" ? "active" : ""}`}
            onClick={() => setTab("settings")}
          >
            Ayarlar
          </button>
          <Button variant="danger" onClick={onLogout}>Çıkış</Button>
        </div>
      </header>

      {/* Content */}
      <main className="container" style={{ flex: 1 }}>
        {tab === "home" && <Home onGoUrls={() => setTab("urls")} />}
        {tab === "urls" && <Urls />}
        {tab === "settings" && <Settings />}
      </main>

      {/* Footer */}
      <footer className="footer">© {new Date().getFullYear()} Proder Yazılım</footer>
    </div>
  );
}

