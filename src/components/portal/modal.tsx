import { FC, PropsWithChildren } from 'react';
import Portal from './portal.tsx';

interface ModalProps extends PropsWithChildren {}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <Portal wrapperId="react-portal-modal-container">
      <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center transition-all duration-300 ease-in-out overflow-hidden z-[999] p-10 pt-20">
        <div className="w-[70%] h-[70%] bg-white rounded-lg text-white flex-col items-center justify-center text-2xl">
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
