import React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';

import debounce from 'lodash.debounce';
import isEqual from "lodash.isequal";
import { Button } from 'components';

import trashBin from 'assets/images/trashBin.svg';

function ColumnChooserSidebar({ deleteColumn, columns, setColumnData }) {
  const [columnsToShow, setColumnsToShow] = React.useState();
  const [columnsToEqualCheck, setColumnsToEqualCheck] = React.useState();
  const [stickyColumns, setStickyColumns] = React.useState();

  React.useEffect(() => {
    if (columns) {
      const withoutStickyCols = filterColumnsByStickyKey(columns);
      setStickyColumns(columns.filter(item => item.hasOwnProperty("sticky") && typeof item.sticky === "string"))
      setColumnsToShow(withoutStickyCols);
      setColumnsToEqualCheck(withoutStickyCols);
    }
  }, [columns]);

  const moveCard = (dragIndex, hoverIndex) => {
    setColumnsToShow((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      }),
    );
  };

  React.useEffect(() => {
    if (columnsToEqualCheck && columnsToShow && !isEqual(columnsToShow, columnsToEqualCheck)) {
      debouncedMoveCard(columnsToShow, stickyColumns);
    }
  }, [columnsToShow, columnsToEqualCheck]);

  const filterColumnsByStickyKey = (data) => {
    const dataToSort = [...data];
    return dataToSort.filter((item) => {
      return !item.hasOwnProperty("sticky") || typeof item.sticky !== "string"
    })
  }

  const setRealColumns = (movedColumns, stickyColumns) => {
    if (movedColumns) {
      setColumnData([...stickyColumns, ...movedColumns]);
    }
  };

  const debouncedMoveCard = React.useCallback(debounce(setRealColumns, 1000), []);

  const renderCard = React.useCallback((column, index) => {
    if (column) {
      return (
        <Card
          index={index}
          key={column.accessor}
          id={column.accessor}
          moveCard={moveCard}
          text={column.Header}
          deleteColumn={deleteColumn}
          column={column}
        />
      );
    }
  }, []);

  return (
    <div className="w-4/12 mr-5">
      <div className="mb-4 font-bold">Выбранные колонки:</div>
      {columnsToShow && columnsToShow.length > 0 ? (
        columnsToShow.map((column, i) => renderCard(column, i))
      ) : (
        <div>Добавьте колонки и они появятся здесь</div>
      )}
      <div className="mb-4 font-bold">Pinned:</div>
      {
        stickyColumns && stickyColumns.length > 0 ?
          stickyColumns.map(item => (
            <div key={item.Header} className="flex items-center justify-between pb-4">
              <div>{item.Header}</div>
              <Button clickHandler={() => deleteColumn(item)}>
                <img src={trashBin} alt="delete" />
              </Button>
            </div>
          )) :
          <div>Закрепите колонку и она появится здесь</div>
      }
    </div>
  );
}

export default ColumnChooserSidebar;

const Card = ({ id, column, index, moveCard, deleteColumn }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', opacity: isDragging ? 0 : 1 }}>
      <div key={column.Header} className="flex items-center justify-between pb-4">
        <div>{column.Header}</div>
        <Button clickHandler={() => deleteColumn(column)}>
          <img src={trashBin} alt="delete" />
        </Button>
      </div>
    </div>
  );
};
