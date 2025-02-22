function generateYearCalendar(year) {
  const calendarContainer = document.getElementById('calendar-container');
  calendarContainer.innerHTML = '';  // Очищаем контейнер перед генерацией

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const startWorkCycle = new Date(year, 0, 7); // Начало года

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDate = new Date(year, month, 1);
    const startDay = startDate.getDay();

    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';
    monthDiv.innerHTML = `<h2>${monthNames[month]}</h2>`;

    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';

    const daysHeader = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    let headerRow = '';
    for (const day of daysHeader) {
      headerRow += `<div class="header">${day}</div>`;
    }
    calendarGrid.innerHTML = headerRow;

    // Добавляем пустые ячейки для предыдущих дней
    for (let i = 0; i < startDay; i++) {
      calendarGrid.innerHTML += '<div class="empty"></div>';
    }

    // Вычисляем рабочие и выходные дни для текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const totalDaysSinceStart = Math.floor((currentDate - startWorkCycle) / (1000 * 60 * 60 * 24));
      const workBlock = Math.floor(totalDaysSinceStart % 8 / 4);

      if (workBlock === 0) {
        calendarGrid.innerHTML += `<div class="workday">${day}</div>`;
      } else {
        calendarGrid.innerHTML += `<div class="offday">${day}</div>`;
      }
    }

    // Добавляем пустые ячейки для завершения недели
    const totalCells = calendarGrid.children.length;
    const rows = Math.ceil(totalCells / 7);
    for (let i = totalCells; i < rows * 7; i++) {
      calendarGrid.innerHTML += '<div class="empty"></div>';
    }

    monthDiv.appendChild(calendarGrid);
    calendarContainer.appendChild(monthDiv);
  }
}

const currentYear = new Date().getFullYear();
generateYearCalendar(currentYear);
