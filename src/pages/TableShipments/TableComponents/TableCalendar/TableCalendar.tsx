import classNames from 'classnames';
import React, { useState } from 'react';

import "./TableCalendar.css";

function TableCalendar() {
  // Состояние, улетит на бэк скорее всего
  const [activeCells , setActiveCells] : any = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  // Дни недели на русском
  const weekdays : any = {
    monday: 'Пн',
    tuesday: 'Вт',
    wednesday: 'Ср',
    thursday: 'Чт',
    friday: 'Пт',
    saturday: 'Сб',
    sunday: 'Вс',
  };

  // Часы
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  function toggleCell(event: any) {
    const btn = event.currentTarget;
    // Достаем час и день недели из ячейки
    const { hour, weekday } = btn.dataset;

    // Будем хранить hour в состоянии как число, "23" => 23
    const parsedHour = Number(hour);

    setActiveCells((prevState : any) => ({
      ...prevState,
      // Если час уже был выделен, удаляем его, иначе добавляем в состояние
      [weekday]: prevState[weekday].includes(parsedHour)
        ? prevState[weekday].filter((item : any) => item !== parsedHour)
        : prevState[weekday].concat(parsedHour),
    }));
  }

  // Посмотри что происходит когда кликаешь по ячейкам
  console.log('activeCells', activeCells);

  return (
    <table className="schedule-table">
      <thead>
        <tr>
          {/* Специальная пустая ячейка, удали и увидешь для чего она была нужна. */}
          <th />

          {/* Выводим часы */}
          {hours.map((hour) => (
            <th
              key={hour}
              className="schedule-table__th schedule-table__th_time"
            >
              {hour}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Object.keys(weekdays).map((weekday) => (
          <tr key={weekday}>
            {/* Выводим дни недели */}
            <th className="schedule-table__th schedule-table__th_weekday">
              {weekdays[weekday]}
            </th>

            {/* Выводим ячейки для выбора времени */}
            {hours.map((hour) => (
              <td key={hour} className="schedule-table__td">
                <button
                  type="button"
                  className={classNames('schedule-table__btn', {
                    // Если в состоянии есть этот час, выделяем цветом ячейку
                    'schedule-table__btn_active':
                      activeCells[weekday].includes(hour),
                  })}
                  onClick={toggleCell}
                  data-hour={hour}
                  data-weekday={weekday}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableCalendar;