import React from 'react';

import { Button } from 'components';

import changeIcon from 'assets/images/changeIcon.svg';
import copyIcon from 'assets/images/copyIcon.svg';
import trashBlack from 'assets/images/trashBlack.svg';

function ActionWithRow({ row, deleteRow }) {
  const [menuOpen, setMenuOpen] = React.useState();

  const selectContent = React.useRef(null);

  // close on click outside
  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!selectContent.current || selectContent.current.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const copyToBuffer = (row) => {
    navigator.clipboard.writeText(JSON.stringify(row))
  };

  return (
    <div
      ref={selectContent}
      onClick={() => setMenuOpen(!menuOpen)}
      className="flex items-center justify-between text-sm font-medium mb-1 mt-2 px-2 py-1 relative border border-slate-200 rounded-md w-full cursor-pointer z-50">
      <svg width="17" height="4" viewBox="0 0 17 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.45996" cy="1.99973" r="2" fill="#94A3B8" />
        <circle cx="2.45996" cy="1.99973" r="2" fill="#94A3B8" />
        <circle cx="14.46" cy="1.99973" r="2" fill="#94A3B8" />
      </svg>

      {menuOpen && (
        <div
          className="bg-white flex flex-col right-[3.25rem] bottom-[-6rem] absolute border rounded-lg w-[12rem]">
          <Button customClassName="px-2 py-2 flex items-center justify-between">
            Изменить
            <img src={changeIcon} alt="change" />
          </Button>
          <hr></hr>
          <Button
            clickHandler={() => copyToBuffer(row)}
            customClassName="px-2 py-2 flex items-center justify-between">
            Копировать
            <img src={copyIcon} alt="copy" />
          </Button>
          <hr></hr>
          <Button
            clickHandler={() => deleteRow(row)}
            customClassName="px-2 py-2 flex items-center justify-between">
            Удалить
            <img src={trashBlack} alt="delete" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ActionWithRow;
