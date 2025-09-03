import { useState } from "react";
import { Button, Input } from "../ui";

export default function SecurityQuestionForm() {
  const [q, setQ] = useState("En sevdiğiniz şehir?");
  const [a, setA] = useState("");
  const [msg, setMsg] = useState("");

  const save = async () => {
    setMsg("");
    if (!q.trim() || !a.trim()) { setMsg("Soru ve cevap zorunludur."); return; }
    const res = await window.api?.setSecQA(q, a);
    if (res?.ok) { setA(""); setMsg("Kaydedildi."); }
    else setMsg(res?.error || "Kaydedilemedi.");
  };

  return (
    <div className="stack">
      <div className="muted">
        Şifrenizi unutursanız burada belirlediğiniz <b>soru &amp; cevap</b> ile yeni şifre oluşturabilirsiniz.
      </div>
      <Input label="Soru" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Örn: En sevdiğiniz şehir?" />
      <Input label="Cevap" value={a} onChange={(e)=>setA(e.target.value)} placeholder="Cevabınız" />
      {msg && (
        <div style={{color: msg.includes("Kaydedildi") ? '#0b8a2a' : '#d92020'}}>{msg}</div>
      )}
      <div>
        <Button variant="outline" onClick={save}>Kaydet</Button>
      </div>
    </div>
  );
}
