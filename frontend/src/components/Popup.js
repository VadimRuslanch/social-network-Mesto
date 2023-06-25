import { useEffect } from "react";

export default function Popup({ isOpen, name, onClose, children }) {
    useEffect(() => {
        if (!isOpen) return
        const closeByEscape = (e) => {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape);
    }, [[isOpen, onClose]]);

    function handleOverlay(e) {
        if (e.target === e.currentTarget) {
            onClose();
        };
    };

    return (
        <div
            className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
            onClick={handleOverlay}
        >{children}
        </div>
    )
}