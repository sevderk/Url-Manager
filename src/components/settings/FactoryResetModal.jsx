import { useState } from "react";
import { Modal, Button } from "../ui";

export default function FactoryResetModal({ open, onClose, onDone }) {
  const [busy, setBusy] = useState(false);

  const reset = async () => {
    setBusy(true);
    try {
      const res = await window.api?.factoryReset();
      if (res?.ok) onDone?.("Sıfırlandı. Varsayılan şifre: proder");
      else onDone?.("Sıfırlanamadı.");
      onClose?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal open={open} title="Fabrika Ayarlarına Dön" onClose={onClose}>
      <p>
        Bu işlem <b style={{color:'#d92020'}}>geri alınamaz</b>. Tüm yerel veriler (URL listesi, güvenlik sorusu, ayarlar) silinir.
      </p>
      <div className="row" style={{marginTop:8}}>
        <Button variant="danger" onClick={reset} disabled={busy}>
          {busy ? "Sıfırlanıyor…" : "Onayla ve Sıfırla"}
        </Button>
        <Button variant="ghost" onClick={onClose}>Vazgeç</Button>
      </div>
    </Modal>
  );
}
