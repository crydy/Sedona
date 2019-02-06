'use-strict'

let logoImg = document.querySelector('.logo img');
let logoImgMap = document.querySelector('.logo map');

function hoverImg() {
  logoImg.src = 'img/logo-hover.png';
}

function normalImg() {
  logoImg.src = 'img/logo.png';
}

function activeImg() {
  logoImg.src = 'img/logo-active.png';
}

// CSS-hover-имитация для логотипа
logoImgMap.addEventListener('mouseover', hoverImg);
logoImgMap.addEventListener('mouseout', normalImg);

// CSS-active-имитация для логотипа
logoImgMap.addEventListener('mousedown', activeImg);
logoImgMap.addEventListener('mouseup', normalImg);