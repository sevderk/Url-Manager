import { useEffect } from "react";

export default function Toast({ kind = "ok", msg, onClose, ms = 2600 }) {
  useEffect(() => {
    const id = setTimeout(() => onClose?.(), ms);
    return () => clearTimeout(id);
  }, [ms, onClose]);

  return (
    <div className={`toast ${kind === 'ok' ? 'ok' : 'err'}`}>
      <span style={{fontSize:14}}>{msg}</span>
      <button className="close" onClick={onClose}>×</button>
    </div>
  );
}
