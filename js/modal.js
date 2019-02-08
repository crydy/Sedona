'use string'

/*------- Вставить модалку на место -------*/

let popup = document.querySelector('.inn-search-pop-up');
let innSearch = document.querySelector('.inn-search');

innSearch.prepend(popup);


/*---------- Показывать по клику ----------*/

let showFormBtn = document.querySelector('.inn-search .btn-search');

function showForm(evt) {
  evt.preventDefault();
  popup.hidden = !popup.hidden;
}

showFormBtn.addEventListener('click', showForm);



/*------- Кастомизация и поведение инпутов в модалке -------*/

let numInputsWrap = document.querySelectorAll('.inn-search-pop-up .cust-wrap');


for (let wrap of numInputsWrap) {

  // получить инпут от обертки в текущей итерации
  let numInput = wrap.querySelector('.inn-search-pop-up .guest-amount');

  // убрать оригинальные кнопки-стрелки через CSS
  numInput.classList.add('delete-default-arrows');

  // включить новые кнопки через CSS
  wrap.classList.add('new-arrows');

  // очистить поле при фокусе внутри
  numInput.addEventListener('focus', function(evt) {
    this.value = '';
  });

  // ноль, если при потере фокуса поле пустое
  numInput.addEventListener('blur', function(evt) {
    if(!this.value) this.value = 0;
  });

  // имитация input-hover
  wrap.addEventListener('mouseenter', function() {
    numInput.classList.add('arrow-hover');
  })
  wrap.addEventListener('mouseleave', function() {
    numInput.classList.remove('arrow-hover');
    numInput.classList.remove('arrow-control');
  })

  // прослушка кликов
  wrap.addEventListener('click', function(evt) {
    evt.preventDefault();

    // псевдофокус на целевой input
    numInput.classList.add('arrow-control');

    // если клик на минус...
    if(evt.target.classList.contains('arrow-left') && numInput.value >= 1) {
      // ...убавляем значение input
      numInput.value--;
      // запретить выделение текста в инпуте при быстром парном клике
      dontSelectText();
    }

    // если клик на плюс...
    if(evt.target.classList.contains('arrow-right')) {
      // ...добавляем значение input
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


