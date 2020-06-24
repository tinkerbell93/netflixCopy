// api
import tmdb from '../api/tmdb';

// DOMs
const $tvShowList = document.querySelector('.main-tvShow-list ul');
const $moviesList = document.querySelector('.main-movies-list ul');

// function
// async function getGenresList() {
//   const genresList = await tmdb().getGenres();
//   console.log(genresList);
// }

const genresList = [
  {
    id: 28,
    name: 'Action'
  },
  {
    id: 12,
    name: 'Adventure'
  },
  {
    id: 16,
    name: 'Animation'
  },
  {
    id: 35,
    name: 'Comedy'
  },
  {
    id: 80,
    name: 'Crime'
  },
  {
    id: 99,
    name: 'Documentary'
  },
  {
    id: 18,
    name: 'Drama'
  },
  {
    id: 10751,
    name: 'Family'
  },
  {
    id: 14,
    name: 'Fantasy'
  },
  {
    id: 36,
    name: 'History'
  },
  {
    id: 27,
    name: 'Horror'
  },
  {
    id: 10402,
    name: 'Music'
  },
  {
    id: 9648,
    name: 'Mystery'
  },
  {
    id: 10749,
    name: 'Romance'
  },
  {
    id: 878,
    name: 'Science Fiction'
  },
  {
    id: 10770,
    name: 'TV Movie'
  },
  {
    id: 53,
    name: 'Thriller'
  },
  {
    id: 10752,
    name: 'War'
  },
  {
    id: 37,
    name: 'Western'
  }
];

function getGenre(movie) {
  const genreIds = movie.genre_ids;

  function matchGenre(id) {
    let genreName = '';
    genresList.forEach(genre => {
      genre.id === id ? genreName = genre.name : 'false';
    });
    return genreName;
  }

  let nameArr = [];
  genreIds.forEach(id => {
    nameArr = [...nameArr, matchGenre(id)];
  });

  console.log(nameArr);

  return nameArr;
}

async function renderRatedTv() {
  // state
  const numRandom = Math.floor(Math.random() * 10) + 1;
  const tvShowsList = await tmdb().ratedTv(numRandom);
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;
  console.log(tvShowsList);

  let listHtml = '';

  tvShowsList.forEach(tvshow => {
    listHtml += `<li class="item">
                  <div class="bob-container">
                    <img alt="${tvshow.title}"
                    src="${IMAGEURL}/w${WIDTH}${tvshow.backdrop_path}">
                    <div class="bob-overview-wapper">
                      <button type="button" class="play-btn icon-play">                 
                        <span class="a11y-hidden">재생</span>
                      </button>

                      <!-- 콘텐츠 정보 -->
                      <h4 class="item-title">${tvshow.name}</h4>
                      <ul>
                        <li class="maturity-rating">
                          ${tvshow.adult ? '청소년 관람 불가' : '모든 연령 관람 가능'}
                        </li>
                        <li>
                        ${getGenre(tvshow)}
                        </li>
                      </ul>
                    </div>
                    <div class="bob-actions-wrapper">
                      <div class="thumbs-wrapper">
                        <button type="button" class="like-btn icon-thumbs-up">                  
                          <span class="a11y-hidden">좋아요</span>
                        </button>
                        <button type="button" class="dislike-btn icon-thumbs-down">                   
                          <span class="a11y-hidden">싫어요</span>
                        </button>
                        <button type="button" class="myList-btn icon-plus">                   
                          <span class="a11y-hidden">내가 찜한 콘텐츠</span>
                        </button>
                      </div>
                    </div>
                    
                    <!-- 클릭 시 상세정보 뜸 -->
                    <button type="button" class="detail-btn">
                      <span class="a11y-hidden">상세 정보</span>
                    </button>
                  </div>
                </li>`;
  });
  $tvShowList.innerHTML = listHtml;
}

async function renderRateMovie() {
  // state
  const numRandom = Math.floor(Math.random() * 10) + 1;
  const moviesList = await tmdb().ratedMovie(numRandom);
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;
  console.log(moviesList);

  let listHtml = '';

  moviesList.forEach(movie => {
    listHtml += `<li class="item">
                  <div class="bob-container">
                    <img alt="${movie.title}"
                    src="${IMAGEURL}/w${WIDTH}${movie.backdrop_path}">
                    <div class="bob-overview-wapper">
                      <button type="button" class="play-btn icon-play">                 
                        <span class="a11y-hidden">재생</span>
                      </button>

                      <!-- 콘텐츠 정보 -->
                      <h4 class="item-title">${movie.title}</h4>
                      <ul>
                        <li class="maturity-rating">
                          ${movie.adult ? '청소년 관람 불가' : '모든 연령 관람 가능'}
                        </li>
                        <li>
                          ${getGenre(movie)}
                        </li>
                      </ul>
                    </div>
                    <div class="bob-actions-wrapper">
                      <div class="thumbs-wrapper">
                        <button type="button" class="like-btn icon-thumbs-up">                  
                          <span class="a11y-hidden">좋아요</span>
                        </button>
                        <button type="button" class="dislike-btn icon-thumbs-down">                   
                          <span class="a11y-hidden">싫어요</span>
                        </button>
                        <button type="button" class="myList-btn icon-plus">                   
                          <span class="a11y-hidden">내가 찜한 콘텐츠</span>
                        </button>
                      </div>
                    </div>
                    
                    <!-- 클릭 시 상세정보 뜸 -->
                    <button type="button" class="detail-btn">
                      <span class="a11y-hidden">상세 정보</span>
                    </button>
                  </div>
                </li>`;
  });
  $moviesList.innerHTML = listHtml;
}

async function renderpopularMovie() {
  // state
  const numRandom = Math.floor(Math.random() * 10) + 1;
  const moviesList = await tmdb().popularMovie(numRandom);
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;
  console.log(moviesList);

  let listHtml = '';

  moviesList.forEach(movie => {
    listHtml += `<li class="item">
                  <div class="bob-container">
                    <img alt="${movie.title}"
                    src="${IMAGEURL}/w${WIDTH}${movie.backdrop_path}">
                    <div class="bob-overview-wapper">
                      <button type="button" class="play-btn icon-play">                 
                        <span class="a11y-hidden">재생</span>
                      </button>

                      <!-- 콘텐츠 정보 -->
                      <h4 class="item-title">${movie.title}</h4>
                      <ul>
                        <li class="maturity-rating">
                          ${movie.adult ? '청소년 관람 불가' : '모든 연령 관람 가능'}
                        </li>
                        <li>
                          ${getGenre(movie)}
                        </li>
                      </ul>
                    </div>
                    <div class="bob-actions-wrapper">
                      <div class="thumbs-wrapper">
                        <button type="button" class="like-btn icon-thumbs-up">                  
                          <span class="a11y-hidden">좋아요</span>
                        </button>
                        <button type="button" class="dislike-btn icon-thumbs-down">                   
                          <span class="a11y-hidden">싫어요</span>
                        </button>
                        <button type="button" class="myList-btn icon-plus">                   
                          <span class="a11y-hidden">내가 찜한 콘텐츠</span>
                        </button>
                      </div>
                    </div>
                    
                    <!-- 클릭 시 상세정보 뜸 -->
                    <button type="button" class="detail-btn">
                      <span class="a11y-hidden">상세 정보</span>
                    </button>
                  </div>
                </li>`;
  });
  $moviesList.innerHTML = listHtml;
}

async function render() {
  // state set
  renderRatedTv();
  renderRateMovie();
  renderpopularMovie();
}

function init() {
  render();
}

init();
