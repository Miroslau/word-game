import { FC, PropsWithChildren } from 'react';
import Portal from './portal.tsx';

interface ModalProps extends PropsWithChildren {}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Portal wrapperId="react-portal-modal-container">
      <div className="fixed inset-0 flex justify-center items-center transition-colors bg-black/20">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow p-6 transition-all">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
