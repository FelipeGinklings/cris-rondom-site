import { useEffect, useState } from "react";
import { X } from "lucide-react";
import colors from "../constants/colors";

export default function ConfirmDialog({
  title = "Tem certeza?",
  message = "Essa ação não poderá ser desfeita.",
  onConfirm = () => {}, 
  onCancel = () => {},
  isVisible = false,
}) {
  const [isOpen, setIsOpen] = useState(isVisible);

 useEffect(() => {
    setIsOpen(isVisible);
  }, [isVisible]);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsOpen(false);
  };

  if (!isOpen) return null;


  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleCancel}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <dialog
          open
          onClose={handleCancel}
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl shadow-2xl p-8 max-w-md w-full"
          style={{
            margin: 0,
            backgroundColor: colors.texto.claro,
            color: colors.texto.escuro,
            boxShadow: `0 4px 20px ${colors.sombra.media}`,
            border: "none",
            position: "absolute",
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            zIndex: 50, 
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: colors.texto.escuro }}>
              {title}
            </h2>

            <button
              onClick={handleCancel}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              style={{ color: colors.texto.secundario }}
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-base mb-6">{message}</p>

          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              style={{
                borderColor: colors.background.terciario,
                color: colors.tonsEscuros.escuro,
              }}
            >
              Cancelar
            </button>

            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: colors.tonsEscuros.escuro,
              }}
            >
              Excluir
            </button>
          </div>
        </dialog>
      </div>
    </>
  );
}