'use string'

/*------- Кастомизация инпутов в модалке -------*/

let numInputsWrap = document.querySelectorAll('.inn-search-pop-up .cust-wrap');


for (let wrap of numInputsWrap) {

  // получить инпут от обертки в текущей итерации
  let numInput = wrap.querySelector('.inn-search-pop-up .guest-amount');

  // убрать оригинальные кнопки-стрелки через CSS
  numInput.classList.add('delete-default-arrows');

  // включить новые кнопки через CSS
  wrap.classList.add('new-arrows');

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
      
      dontSelectText();
    }

    // если клик на плюс...
    if(evt.target.classList.contains('arrow-right')) {
      // ...добавляем значение input
      numInput.value++;

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


/* Вставить форму поверх карты */

/* let popup = document.querySelector('.inn-search-pop-up');
let innSearch = document.querySelector('.inn-search');
console.log(innSearch);

innSearch.prepend(popup); */