import { useState } from "react";
import { Card, Button, Input, Toast } from "../ui";
import SecurityQuestionForm from "../auth/SecurityQuestionForm";
import FactoryResetModal from "./FactoryResetModal";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");

  const [factoryOpen, setFactoryOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (newPassword.length < 4) { setStatus("Yeni şifre en az 4 karakter olmalı."); return; }
    if (newPassword !== confirm) { setStatus("Şifreler eşleşmiyor."); return; }
    try {
      const res = await window.api?.changePassword(currentPassword, newPassword);
      if (!res?.ok) setStatus(res?.error || "Şifre değiştirilemedi.");
      else {
        setStatus("Parola başarıyla güncellendi.");
        setCurrentPassword(""); setNewPassword(""); setConfirm("");
        setToast({ kind:"ok", msg:"Şifre güncellendi." });
      }
    } catch {
      setStatus("Beklenmeyen bir hata oluştu.");
    }
  };

  return (
    <div className="container" style={{display:'flex', justifyContent:'center', padding:'24px 16px'}}>
      <Card className="w-full" style={{maxWidth: 720}}>
        <div style={{marginBottom:6}}>
          <h2 style={{margin:'0 0 4px 0'}}>Ayarlar</h2>
          <div className="muted">Hesap güvenliği ve geri kazanım seçenekleri.</div>
        </div>

        {/* Şifre */}
        <div className="section">
          <div className="section-title">Şifre</div>
          <form className="stack" onSubmit={submit}>
            <Input label="Mevcut şifre" type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
            <Input label="Yeni şifre" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
            <Input label="Yeni şifre (tekrar)" type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} />

            {status && (
              <div style={{color: status.includes("başarı") ? '#0b8a2a' : '#d92020', fontWeight:600}}>
                {status}
              </div>
            )}

            <div className="row">
              <Button type="submit" variant="primary">Şifreyi Güncelle</Button>
              <Button type="button" variant="ghost" onClick={()=>{ setCurrentPassword(""); setNewPassword(""); setConfirm(""); }}>Sıfırla</Button>
            </div>
          </form>
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-title">Güvenlik Sorusu</div>
          <SecurityQuestionForm />
        </div>

        <div className="divider" />

        <div className="section">
          <div className="section-title">Gelişmiş</div>
          <div className="muted" style={{marginBottom:10}}>
            Fabrika ayarlarına dönüş <b>tüm yerel verileri</b> (URL’ler ve güvenlik sorusu dahil) siler.
          </div>
          <Button variant="danger" onClick={()=>setFactoryOpen(true)}>Fabrika Ayarlarına Dön</Button>
        </div>
      </Card>

      <FactoryResetModal
        open={factoryOpen}
        onClose={()=>setFactoryOpen(false)}
        onDone={(msg)=>setToast({ kind:"ok", msg })}
      />

      {toast && <Toast kind={toast.kind} msg={toast.msg} onClose={()=>setToast(null)} />}
    </div>
  );
}
