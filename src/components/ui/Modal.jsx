export default function Modal({ open, title, subtitle, onClose, children, icon = "🔒" }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Kapat">×</button>

        <div className="modal-header">
          <div className="circle-icon" aria-hidden>{icon}</div>
          <div className="modal-titles">
            <h3 className="modal-title">{title}</h3>
            {subtitle && <div className="modal-sub">{subtitle}</div>}
          </div>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
