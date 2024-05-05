import React, { useState, ReactNode, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

// Define the types for the props the component expects
interface ModalProps {
    bID: string;
  title: string;
  children: ReactNode;
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ bID, title, children, onClick}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Define the state with a type
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  return (
    <>
      <button className="btn btn-error" onClick={openModal}>Delete Book</button>
      {isOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{children}</p>
            <div className="modal-action">
              <form method="dialog" className='space-x-2'>
                <button type="button" className="btn btn-error" onClick={onClick}> <MdOutlineDelete className='inline-block'/> Delete</button>
                <button type="button" className="btn" onClick={closeModal}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
