'use string'

/*------- Вставить модалку на место -------*/

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
    // фокус на первое поле формы
    popup.querySelector('input').focus();
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


/*------- Кастомизация и поведение инпутов в модалке -------*/

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