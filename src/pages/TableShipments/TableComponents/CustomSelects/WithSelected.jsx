import React from 'react';

import openSelectIcon from 'assets/images/openSelectIcon.svg';
import closeSelectIcon from 'assets/images/closeSelectIcon.svg';

import { Button } from "components"

function WithSelected({ selectedRows, deleteRow }) {
  const [menuOpen, setMenuOpen] = React.useState();
  const [arrOfSelectedRowsValues, setArrOfSelectedRowsValues] = React.useState();

  React.useEffect(() => {
    let arr = selectedRows.map((item) => item.original);
    setArrOfSelectedRowsValues(arr);
  }, [selectedRows]);

  const select = React.useRef();

  // close on click outside
  React.useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!select || select.current.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const deleteRowsHandler = () => {
    deleteRow(arrOfSelectedRowsValues);
  };

  return (
    <div
      ref={select}
      onClick={() => setMenuOpen(!menuOpen)}
      style={{ maxWidth: '200px' }}
      className="flex items-center justify-between text-sm font-medium mb-1 mt-2 px-2 py-1 relative border border-slate-200 rounded-md w-full cursor-pointer">
      <div>С отмеченными ({selectedRows.length})</div>
      <img src={menuOpen ? closeSelectIcon : openSelectIcon} alt="open" />

      {menuOpen && (
        <div className="bg-white z-10 flex flex-col left-0 top-8 absolute border rounded-lg">
          <Button customClassName="px-2 py-2">Выгрузка на МП</Button>
          <hr></hr>
          <Button customClassName="px-2 py-2">Скачать фото Wildberries</Button>
          <hr></hr>
          <Button customClassName="px-2 py-2">Скачать продукты XLSX</Button>
          <hr></hr>
          <Button customClassName="px-2 py-2">Скачать категории XLSX</Button>
          <hr></hr>
          <Button clickHandler={deleteRowsHandler} customClassName="px-2 py-2">
            Удалить
          </Button>
          <hr></hr>
          <Button customClassName="px-2 py-2">Создать копии</Button>
        </div>
      )}
    </div>
  );
}

export default WithSelected;
