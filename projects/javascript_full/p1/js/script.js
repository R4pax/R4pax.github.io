"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против всех",
    "Шрек",
  ],
};

document.querySelector(".promo__adv").style.display = "none";
document.querySelector(".promo__content").style.width = "calc(100% - 300px)";
document.querySelector(".promo__genre").textContent = "Драма";
document.querySelector(".promo__bg").style.backgroundImage = "url(img/bg.jpg)";
const moviesList = document.querySelector(".promo__interactive-list");
moviesList.innerHTML = "";

const createListElem = (index, name) => {
  let li = document.createElement("li");
  li.classList.add("promo__interactive-item");
  li.innerHTML = `${index} - ${name}<div class="delete"></div>`;
  return li;
};

movieDB.movies.sort().forEach((name, index) => {
  moviesList.append(createListElem(index, name));
});
