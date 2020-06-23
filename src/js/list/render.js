// api
import tmdb from '../api/tmdb';

// DOMs
const $moviesList = document.querySelector('.main-movies-list ul');

// function
async function getRateMovies() {
  const moviesList = await tmdb().ratedMovie();
  // const allList = [...moveList];
  // const ranNum = Math.floor(Math.random() * (39 - 0));
  return moviesList;
}

async function renderMoviesList() {
  // state
  const moviesList = await tmdb().ratedMovie();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;
  console.log(moviesList);

  let listHtml = '';

  moviesList.forEach(movie => {
    listHtml += `<li class="item">
    <div class="bob-container">
      <img alt="콘텐츠 제목" src="${IMAGEURL}/w${WIDTH}${movie.backdrop_path}">
      <div class="bob-overview-wapper">
        <button type="button" class="play-btn">
          <svg viewBox="0 0 24 24">
            <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
          </svg>
          <span class="a11y-hidden">Play</span>
        </button>
        <!-- 콘텐츠 정보 -->
        <h4 class="item-title">${movie.title}</h4>
        <ul>
          <li class="maturity-rating">
            15+
          </li>
          <li class="duration">
            1 Season
          </li>
          <li>
            Emotional Romantic Dramedy
          </li>
        </ul>
      </div>
      <div class="bob-actions-wrapper">
        <div class="thumbs-wrapper">
          <button type="button" class="like-btn">
            <svg viewBox="0 0 24 24">
              <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
            </svg>
            <span class="a11y-hidden">Like</span>
          </button>
          <button type="button" class="dislike-btn">
            <svg viewBox="0 0 24 24">
              <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
            </svg>
            <span class="a11y-hidden">dislike</span>
          </button>
          <button type="button" class="myList-btn">
            <svg viewBox="0 0 24 24">
              <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
            </svg>
            <span class="a11y-hidden">My List</span>
          </button>
        </div>
      </div>
      <!-- 클릭 시 상세정보 뜸 -->
      <button type="button" class="detail-btn">
        <span class="a11y-hidden">List details</span>
      </button>
    </div>
  </li>`;
  });
  $moviesList.innerHTML = listHtml;
}

async function render() {
  // state set
  renderMoviesList();
}

function init() {
  render();
}

init();
