import { useEffect, useState } from "react";
import { Card, Button, Toast } from "../ui";

export default function Home({ onGoUrls }) {
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState(null);

  const refresh = async () => {
    const data = await window.api?.listUrls();
    setCount(Array.isArray(data) ? data.length : 0);
  };

  useEffect(() => { refresh(); }, []);

  const openAll = async () => {
    const res = await window.api?.openAllUrls();
    if (!res?.ok) {
      if (count === 0) {
        setToast({ kind: "err", msg: "Henüz eklenmiş URL yok. Önce URL ekleyin." });
      } else {
        setToast({ kind: "err", msg: "URL’ler açılamadı." });
      }
      return;
    }
    setToast({ kind: "ok", msg: `${res.opened}/${res.total} bağlantı açıldı.` });
  };

  return (
    <>
      <Card>
        <div className="stack" style={{ gap: 10 }}>
          <h2>Hoş geldiniz 👋</h2>
          <div className="muted">
            Proder uygulamasına hoş geldiniz. Sık kullandığınız bağlantıları yönetin ve tek tıkla hepsini açın.
          </div>

          <div className="divider" />

          <div className="row" style={{ justifyContent: "space-between" }}>
            <div className="muted">
              Kayıtlı bağlantı sayısı: <b>{count}</b>
            </div>
            <div className="row" style={{ gap: 8 }}>
              <Button variant="primary" onClick={openAll}>
                Tüm bağlantıları aç
              </Button>
              <Button variant="outline" onClick={onGoUrls}>
                URL’leri yönet
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {toast && <Toast kind={toast.kind} msg={toast.msg} onClose={() => setToast(null)} />}
    </>
  );
}
