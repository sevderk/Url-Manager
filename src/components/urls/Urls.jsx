import { useEffect, useState } from "react";
import { Card, Button, Input } from "../ui";

function toFavicon(u) {
  try { return `https://www.google.com/s2/favicons?domain=${new URL(u).hostname}&sz=32`; }
  catch { return null; }
}

export default function Urls() {
  const [list, setList] = useState([]);
  const [url, setUrl] = useState("");
  const [msg, setMsg] = useState("");

  const refresh = async () => {
    const data = await window.api?.listUrls();
    setList(data || []);
  };
  useEffect(() => { refresh(); }, []);

  const add = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await window.api?.addUrl(url);
    if (!res?.ok) setMsg(res?.error || "Hata oluştu.");
    else { setUrl(""); setList(res.data); }
  };

  const remove = async (u) => {
    const res = await window.api?.removeUrl(u);
    if (res?.ok) setList(res.data);
  };

  return (
    <Card>
      <h2>Bağlantılar</h2>
      <div className="muted">Sık kullandığınız linkleri ekleyin. http/https doğrulaması yapılır.</div>

      <div className="spacer"></div>

      <form className="row" onSubmit={add}>
        <div style={{flex:1}}>
          <Input
            inputClassName="h-10"
            placeholder="https://ornek.com"
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
          />
        </div>
        <Button type="submit" variant="primary">Ekle</Button>
      </form>

      {msg && <div style={{color:'#d92020', marginTop:10}}>{msg}</div>}

      <div className="divider"></div>

      <div className="url-list">
        {list.length === 0 && <div className="muted">Henüz bağlantı yok.</div>}
        {list.map((u) => (
          <div key={u} className="url-item">
            <div style={{display:'flex', alignItems:'center', gap:10, minWidth:0}}>
              {toFavicon(u) && <img alt="" src={toFavicon(u)} width={16} height={16} style={{borderRadius:4}} />}
              <a
                href={u}
                onClick={(e)=>{ e.preventDefault(); window.open(u, "_blank"); }}
                title={u}
              >
                {u}
              </a>
              <span aria-hidden className="ext-icon">↗</span>
            </div>
            <button type="button" onClick={()=>remove(u)}>Kaldır</button>
          </div>
        ))}
      </div>
    </Card>
  );
}
