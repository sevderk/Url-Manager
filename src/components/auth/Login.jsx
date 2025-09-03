import { useEffect, useRef, useState } from "react";
import { Card, Button, Input, Toast } from "../ui";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const userRef = useRef(null);

  useEffect(() => { userRef.current?.focus(); }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!window.api?.login) { setError("Lütfen Electron penceresini kullanın."); return; }
    setLoading(true); setError("");
    try {
      const res = await window.api.login(username, password);
      if (res?.ok) onSuccess();
      else setError("Kullanıcı adı veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <Card className="login-card">
        <div className="stack" style={{gap:16}}>
          <div className="stack" style={{gap:6}}>
            <h1 className="login-title">Proder E-ticaret</h1>
            <div className="login-sub">İlk kez giriş yapacaksanız demo bilgilerini kullanın. Şifre değiştirmek için 'Ayarlar' sekmesini kullanın.</div>
            <div className="login-demo"><i></i> demo: <strong>proder / proder</strong></div>
          </div>

          <form onSubmit={handleLogin} className="stack" style={{gap:14}}>
            <Input
              label="Kullanıcı adı"
              name="username"
              ref={userRef}
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="proder"
            />
            <Input
              label="Şifre"
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
            />

            {error && <div style={{color:'#d92020', fontSize:13, textAlign:'left'}}>{error}</div>}

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
            </Button>

            <div className="forgot-wrap">
              <button
                type="button"
                className="link-ghost"
                onClick={()=>setForgotOpen(true)}
                aria-label="Şifremi unuttum"
              >
                <svg className="icon-sm" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 17h.01M11 7a5 5 0 0 1 5 5 3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2" opacity=".3"/>
                </svg>
                Şifremi unuttum?
              </button>
            </div>
          </form>
        </div>
      </Card>

      <ForgotPasswordModal
        open={forgotOpen}
        onClose={()=>setForgotOpen(false)}
        onSuccess={(msg)=>setToast({ kind:"ok", msg })}
      />

      {toast && (
        <Toast kind={toast.kind} msg={toast.msg} onClose={()=>setToast(null)} />
      )}
    </div>
  );
}
