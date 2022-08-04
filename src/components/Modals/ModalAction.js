import React, { useRef, useEffect } from 'react';
import { t } from 'i18next';
import Transition from '../../utils/Transition.js';

function ModalAction({
  children,
  id,
  modalOpen,
  image,
  title,
  description,
  setModalOpen
}) {

  const modalContent = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (modalContent.current && modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener('mousedown', clickHandler);
    return () => document.removeEventListener('mousedown', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div ref={modalContent} className="bg-white rounded shadow-lg overflow-auto max-w-lg w-full max-h-full">
          <div className="p-6">
            <div className="relative">
            <div className="w-12 h-12 mx-auto my-2 flex items-center justify-center rounded-full flex-shrink-0 bg-gradient-to-tr from-green-500 to-green-300  ">
              <img className="w-6" src={image} alt="icon"/>
            </div>
            <div className="max-w-sm mx-auto text-center font-semibold text-lg text-gray-800">{t(`${title}`, {ns: "messages"})}</div>
            <div className="max-w-sm mx-auto text-center text-sm py-2 text-gray-600">{description}</div>   
              <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-500" onClick={(e) => { e.stopPropagation(); setModalOpen(false); }}>
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                </svg>
              </button>
              {React.Children.map(children, child => {
                return React.cloneElement(children, { setModalOpen: setModalOpen })
              })}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalAction;
