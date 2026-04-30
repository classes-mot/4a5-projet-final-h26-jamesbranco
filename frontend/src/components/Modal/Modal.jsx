import { createPortal } from "react-dom";
import "./Modal.css";

function Modal({ isOpen, onClose, onConfirm, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}

        <div className="modal-actions">
          {onConfirm && (
            <button className="confirm" onClick={onConfirm}>
              Confirmer
            </button>
          )}
          <button className="cancel" onClick={onClose}>
            Annuler
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}

export default Modal;
