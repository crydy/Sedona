'use string'
// Скрипт работает с модальным окном поиска гостиницы на главной странице

/*------- Вставить модальное окно на место -------*/

let popup = document.querySelector('.inn-search-pop-up');
let innSearch = document.querySelector('.inn-search');

innSearch.prepend(popup);


/*---------- Показывать и скрывать по клику ----------*/

let showFormBtn = document.querySelector('.inn-search .btn-search');

function toggleDisplayElem(evt) {
  evt.preventDefault();

  if (popup.hidden && !timerId) {

    // отобразить форму
    popup.hidden = false;
    // css-анимация появления
    popup.classList.add('show');

  } else if (!popup.hidden) {

    // css-анимация скрытия
    popup.classList.remove('show');
    // удалить форму через 0.6сек
    var timerId = setTimeout(function() {
      popup.hidden = true;
    }, 600);
    
  };
  
}

showFormBtn.addEventListener('click', toggleDisplayElem);


/*------- Автозаполнение дат -------*/

let dateInputs = document.querySelectorAll('.inn-search-pop-up input[type="date"]');

for (let input of dateInputs) {
  
  // автозаполнение дат
  let date = new Date();
  input.classList.contains('arrival-date') ?
    date.setDate(date.getDate() + 7) : date.setDate(date.getDate() + 14);
  
  // Формат даты в инпуте yyyy-mm-dd с нулями перед единичными числами, например: 2019-09-02
  let d = `${date.getDate()}`; if(d.length !== 2) d = 0 + d;
  let m = `${date.getMonth()}`; if(m.length !== 2) m = 0 + m;
  let y = `${date.getFullYear()}`;
  
  // вписать в инпут
  input.value = `${y}-${m}-${d}`;
}


/*------- Кастомизация и поведение числовых инпутов -------*/

let numInputsWrap = document.querySelectorAll('.inn-search-pop-up .cust-wrap');


for (let wrap of numInputsWrap) {

  // получить инпут от обертки в текущей итерации
  let numInput = wrap.querySelector('.inn-search-pop-up .guest-amount');
  // хранение значения input
  let inputValue;

  // убрать оригинальные кнопки-стрелки через CSS
  numInput.classList.add('delete-default-arrows');
  // включить новые кнопки через CSS
  wrap.classList.add('new-arrows');

  // очистить поле при получении фокуса инпутом
  numInput.addEventListener('focus', function() {
    inputValue = this.value;
    this.value = '';
  });

  // если при потере фокуса поле пустое, вернуть предыдущее значение
  numInput.addEventListener('blur', function() {
    if(!this.value) this.value = inputValue;
  });

  // имитация input-hover
  wrap.addEventListener('mouseenter', function() {
    numInput.classList.add('arrow-hover');
  })
  wrap.addEventListener('mouseleave', function() {
    numInput.classList.remove('arrow-hover');
    numInput.classList.remove('arrow-control');
  })

  // прослушка кликов на кастомные кнопки
  wrap.addEventListener('click', function(evt) {
    evt.preventDefault();

    // псевдофокус на целевой input
    numInput.classList.add('arrow-control');

    // если клик на минус...
    if(evt.target.classList.contains('arrow-left') && numInput.value >= 1) {
      // ...убавить значение input
      numInput.value--;
      // запретить выделение текста в инпуте при быстром парном клике
      dontSelectText();
    }

    // если клик на плюс...
    if(evt.target.classList.contains('arrow-right')) {
      // ...добавить значение input
      numInput.value++;
      // запретить выделение текста в инпуте при быстром парном клике
      dontSelectText();
    }

    function dontSelectText() {
      // не выделять текст внутри инпута двойным кликом
      wrap.onmousedown = function() { return false };

      // очистить запрет выделения текста
      // при уходе мыши с целевого элемента
      evt.target.addEventListener('mouseleave', clearBlockInput);
      function clearBlockInput() {
        wrap.onmousedown = null;
        evt.target.removeEventListener('mouseleave', clearBlockInput);
      };
    }
  });

}


