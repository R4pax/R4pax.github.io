"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

document.querySelector(".promo__adv").remove();
document.querySelector(".promo__content").style.width = "calc(100% - 300px)";
document.querySelector(".promo__genre").textContent = "Драма";
document.querySelector(".promo__bg").style.backgroundImage = "url(img/bg.jpg)";
const form = document.querySelector("form.add");
const deleteBtns = document.querySelectorAll("div.delete");
const moviesList = document.querySelector(".promo__interactive-list");
form.addEventListener("submit", addMovie);

function addMovie(e) {
  e.preventDefault();
  const value = document.querySelector("input.adding__input").value;
  const checkbox = document.querySelector("input[type='checkbox']").checked;
  checkbox && console.log("Добавляем любимый");
  movieDB.movies.push(value.length < 21 ? value : value.slice(0, 21) + "...");
  refreshMoviesList();
}

const createListElem = (index, name) => {
  let li = document.createElement("li");
  li.setAttribute("data-num", index);
  li.classList.add("promo__interactive-item");
  li.innerHTML = `${index} - ${name}<div class="delete"></div>`;
  return li;
};

const refreshMoviesList = () => {
  moviesList.innerHTML = "";
  movieDB.movies.sort().forEach((name, index) => {
    moviesList.append(createListElem(index, name));
  });
  addDeleteEvents();
};

const addDeleteEvents = () => {
  document.querySelectorAll("div.delete").forEach((el, i) => {
    el.addEventListener("click", () => {
      movieDB.movies.splice(i, 1);
      refreshMoviesList();
    });
  });
};

refreshMoviesList();
