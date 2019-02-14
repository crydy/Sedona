/* ------- Слайдер ранжирования цены -------- */

// задать градацию цен для слайдера
// (единица равна сотне)
let gradation = 50;

// вписать максимальную цену в документ
document.querySelector('.price-ranging .end-price').innerHTML = gradation * 100;

// ползунки в переменные
let thumb1 = document.querySelector('.thumb-1');
let thumb2 = document.querySelector('.thumb-2');

// слушать вжатие клавиши на ползунки
thumb1.addEventListener('mousedown', moveThumb);
thumb2.addEventListener('mousedown', moveThumb);

function moveThumb(evt) {
  // обрабатывать только левую клавишу мышы
  if (evt.which != 1) return;
  evt.preventDefault();

  let target = evt.target;
  let slider = target.closest('.ranging-slider');
  let innerBar = slider.querySelector('.inner-bar');

  // получить размер шкалы
  let scaleDivision = (slider.offsetWidth - thumb1.offsetWidth * 2) / (gradation - 1);
  console.log(`scaleDivition = ${scaleDivision}`);

  // обозначить границы сдвига
  if (target.classList.contains('thumb-1')) {
    var leftBound = 0;
    var rightBound = thumb2.getBoundingClientRect().left - slider.getBoundingClientRect().left - target.offsetWidth;
  }
  if (target.classList.contains('thumb-2')) {
    var leftBound = thumb1.getBoundingClientRect().right - slider.getBoundingClientRect().left;
    var rightBound = slider.offsetWidth - target.offsetWidth;
  }

  // сдвиг курсора на целевом элементе по горизонтали
  let shiftX = evt.clientX - target.getBoundingClientRect().left;

  // захватить целевой элемент под курсор
  catchUnderCursor(evt.clientX);

  function catchUnderCursor(PositionX) {

    // новая позиция элемента (место клика - левый край слайдера - сдвиг курсора по оси X на элементе)
    let newPosition = PositionX - slider.getBoundingClientRect().left - shiftX;

    // не выходить за пределы границ
    if (newPosition < leftBound) newPosition = leftBound;
    if (newPosition > rightBound) newPosition = rightBound;
    
    // двигать целевой элемент
    target.style.left = newPosition + 'px';

    // для первого ползунка...
    if (target.classList.contains('thumb-1')) {

      // двигать inner-bar
      innerBar.style.left = newPosition + target.offsetWidth / 2 + 'px';

      // корректная точка отсчета в пикселях относительно величины слайдера
      let leftPoint = newPosition;

      // получить деление шкалы
      let scalePoint = Math.floor(leftPoint / scaleDivision);

      // отобразить цену
      document.querySelector('.price-ranging .start-price').innerHTML = scalePoint * 100;
    }

    // для второго ползунка...
    if (target.classList.contains('thumb-2')) {

      // двигать inner-bar
      innerBar.style.right = slider.offsetWidth - newPosition + 'px';

      // корректная точка отсчета в пикселях относительно величины слайдера
      let rightPoint = newPosition - target.offsetWidth;

      // получить деление шкалы
      let scalePoint = Math.floor(rightPoint / scaleDivision);

      // отобразить цену
      document.querySelector('.price-ranging .end-price').innerHTML = scalePoint * 100 + 100;
    }
  }

  // двигать ползунок с движением курсора
  document.body.addEventListener('mousemove', moveAt);

  function moveAt(evt) {
    catchUnderCursor(evt.clientX);
  }
  
  // оборвать прослушку движения при отжатии мыши
  document.body.onmouseup = function() {
    document.body.removeEventListener('mousemove', moveAt);
    document.body.onmouseleave = null;
    document.body.onmouseup = null;
  }
  // оборвать прослушку движения при ухода курсора с вьюпорта
  // (устраняется глюк с прилипанием ползунка к курсору,
  // в случае, если "отжатие мыши" произошло за пределами
  // окна браузера и не произошло событие mouseup)
  document.body.onmouseleave = function() {
    document.body.removeEventListener('mousemove', moveAt);
    document.body.onmouseleave = null;
    document.body.onmouseup = null;
  }
}