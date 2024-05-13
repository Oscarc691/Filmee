
const movieListEl = document.querySelector(".movie__list");
const searchValue = document.querySelector(".search__value");
const carousel = document.querySelector('.carousel');
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const n = 6;
let movieData = {};
let isModalOpen = false;
let currentIndex = 0;
let rotateY = 0;


function searchTerm(event) {
  const movieId = event.target.value;
  getMovies(movieId);
  loading();
  searchValue.innerHTML = movieId;
}


function renderMovies() {
  if (movieData.Search) {
    movieListEl.innerHTML = movieData.Search
    .map((movie) => getMovieDescription(movie))
    .slice(0, n)
    .join("");

    document.querySelector('.no__movies--container').style.display = 'none';
    movieListEl.style.display = 'block';
  }
  else {
    console.log("Movie not found");
      
    document.querySelector('.no__movies--container').style.display = 'block';
    movieListEl.style.display = 'none';
  }
}



async function getMovies(movieId) {
  const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=fb20479&s=${movieId}`);
  movieData = await movies.json();
  setTimeout(() => {
    renderMovies();
  }, 1000);
}



function getMovieDescription(movie) {
  return `<div class="movie" onclick="toggleModal()">
            <figure>
                <img src="${movie.Poster}"alt="" class="movie__img"/>
            </figure>
            <div class="movie__description--list">
                <h3 class="movie__description movie__title">${movie.Title}</h3>
                <p class="movie__description movie__year"><span class="movie__description--heading">Year:</span> ${movie.Year}</p>
            </div>
          </div>

          <div class="modal">
            <div class="modal__half modal__about">
              <figure>
                <img src="${movie.Poster}"alt="" class="movie__img"/>
              </figure>
            </div>
              
            <div class="modal__half modal__contact">
              <i class="fas fa-times modal__exit click" onclick="toggleModal()"></i>
              <div>
              <h3 class="movie__description movie__title">${movie.Title}</h3>
              </div>
            </div>
          </div>`;
}

function renderFilteredMovies(filteredMovies) {
  movieListEl.innerHTML = filteredMovies
    .slice(0, n)
    .map((movie) => getMovieDescription(movie))
    .join("");
}



function loading(load) {
  const loading = document.querySelector(".loading__spinner");

  loading.classList += " loading__spinner--visible";
  setTimeout(() => {
    loading.classList.remove("loading__spinner--visible");
  }, 2000);
}



function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}

// Function to rotate the carousel
function rotateCarousel() {
  rotateY = -currentIndex * 60; /* Adjust the rotation angle as desired */
  carouselInner.style.transform = `translateZ(-200px) rotateY(${rotateY}deg)`;
}

