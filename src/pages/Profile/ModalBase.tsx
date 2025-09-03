import React from "react";
import type { ReactNode } from "react";

interface ModalBaseProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalBase: React.FC<ModalBaseProps> = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="bg-white p-6 rounded-lg shadow-xl w-96"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default ModalBase;