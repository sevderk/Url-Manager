import { useEffect, useState } from "react";
import { Modal, Button, Input } from "../ui";

export default function ForgotPasswordModal({ open, onClose, onSuccess }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    setMsg("");
    setAnswer("");
    setNewPass("");

    (async () => {
      try {
        const res = await window.api?.getSecQuestion();
        if (res?.ok) {
          setQuestion(res.question || "");
        } else {
          setQuestion("");
          setMsg(res?.error || "Güvenlik sorusu tanımlı değil.");
        }
      } catch {
        setQuestion("");
        setMsg("Bağlantı hatası.");
      }
    })();
  }, [open]);

  const submit = async () => {
    setMsg("");

    const a = (answer || "").trim();
    const p = (newPass || "").trim();

    if (!a) { setMsg("Cevap boş olamaz."); return; }
    if (p.length < 4) { setMsg("Yeni şifre en az 4 karakter olmalı."); return; }

    setBusy(true);
    try {
      const res = await window.api?.resetWithSecAnswer(a, p);
      if (!res?.ok) {
        setMsg(res?.error || "İşlem başarısız.");
        return;
      }
      onSuccess?.("Şifre güncellendi. Yeni şifre ile giriş yapabilirsiniz.");
      onClose?.();
    } catch {
      setMsg("İşlem başarısız.");
    } finally {
      setBusy(false);
    }
  };

  const hasQuestion = Boolean(question);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Şifremi Unuttum"
      subtitle={
        hasQuestion
          ? "Güvenlik sorusunu yanıtlayın ve yeni şifrenizi belirleyin."
          : "Önce Ayarlar bölümünden güvenlik sorusu tanımlayın."
      }
      icon="🛡️"
    >
      {hasQuestion ? (
        <div className="stack" style={{ gap: 12 }}>
          <div className="callout">
            <div className="callout-icon">❓</div>
            <div className="callout-text">{question}</div>
          </div>

          <Input
            label="Cevap"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Cevabınızı yazın"
          />
          <Input
            label="Yeni şifre"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="En az 4 karakter"
          />

          {msg && <div className="form-error">{msg}</div>}

          <div className="actions">
            <Button variant="ghost" onClick={onClose}>Vazgeç</Button>
            <Button variant="primary" onClick={submit} disabled={busy}>
              {busy ? "Sıfırlanıyor…" : "Şifreyi Sıfırla"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="stack" style={{ gap: 12 }}>
          <div className="empty-state">
            <div className="empty-emoji" aria-hidden>📝</div>
            <div className="empty-text">
              Güvenlik sorusu tanımlı değil. Ayarlar → <b>Güvenlik Sorusu</b> bölümünden soru &amp; cevap belirleyin.
            </div>
          </div>
          {msg && <div className="form-error">{msg}</div>}
          <div className="actions">
            <Button variant="ghost" onClick={onClose}>Kapat</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
