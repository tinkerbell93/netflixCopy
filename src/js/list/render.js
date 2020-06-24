// api
import tmdb from '../api/tmdb';

// DOMs
const $tvShowList = document.querySelector('.main-tvShow-list ul');
const $movieList = document.querySelector('.main-movie-list ul');
const $rateTvShowList = document.querySelector('.rate-tvShow-list ul');
const $popularTvShowList = document.querySelector('.popular-tvShow-list ul');
const $rateMovieList = document.querySelector('.rate-movie-list ul');
const $popularMovieList = document.querySelector('.popular-movie-list ul');

// Genre List
const genresList = [
  {
    id: 28,
    name: '액션'
  },
  {
    id: 12,
    name: '모험'
  },
  {
    id: 16,
    name: '애니메이션'
  },
  {
    id: 35,
    name: '코미디'
  },
  {
    id: 80,
    name: '범죄'
  },
  {
    id: 99,
    name: '다큐멘터리'
  },
  {
    id: 18,
    name: '드라마'
  },
  {
    id: 10751,
    name: '가족'
  },
  {
    id: 14,
    name: '판타지'
  },
  {
    id: 36,
    name: '역사'
  },
  {
    id: 27,
    name: '공포'
  },
  {
    id: 10402,
    name: '음악'
  },
  {
    id: 9648,
    name: '미스터리'
  },
  {
    id: 10749,
    name: '로맨스'
  },
  {
    id: 878,
    name: 'SF'
  },
  {
    id: 10770,
    name: 'TV 영화'
  },
  {
    id: 53,
    name: '스릴러'
  },
  {
    id: 10752,
    name: '전쟁'
  },
  {
    id: 37,
    name: '서부'
  },
  {
    id: 10759,
    name: '액션어드벤쳐'
  },
  {
    id: 10762,
    name: '어린이'
  },
  {
    id: 10763,
    name: '뉴스'
  },
  {
    id: 10764,
    name: '리얼리티'
  },
  {
    id: 10765,
    name: '판타지'
  },
  {
    id: 10766,
    name: '드라마'
  },
  {
    id: 10767,
    name: '토크'
  },
  {
    id: 10768,
    name: '전쟁'
  }
];

// Functions
function getGenre(movie) {
  const genreIds = movie.genre_ids;

  function matchGenre(id) {
    let genreName = '';
    genresList.forEach(genre => {
      genre.id === id ? genreName = genre.name : '';
    });
    return genreName;
  }

  let nameArr = [];
  genreIds.forEach(id => {
    nameArr = [...nameArr, matchGenre(id)];
  });

  return nameArr;
}

// Main TV Shows List
async function renderMainTv() {
  // state
  const numRandom = Math.floor(Math.random() * 10) + 1;
  const tvShowsList = await tmdb().ratedTv(numRandom);
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

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

// Main Movies List
async function renderMainMovie() {
  // state
  const numRandom = Math.floor(Math.random() * 10) + 1;
  const moviesList = await tmdb().ratedMovie(numRandom);
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

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
  $movieList.innerHTML = listHtml;
}

// TV shows > 순위 TV shows List
async function renderRatedTv() {
  // state
  const tvShowsList = await tmdb().ratedTv();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

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
  $rateTvShowList.innerHTML = listHtml;
}

// TV shows > 인기 TV shows List
async function renderpopularTv() {
  // state
  const tvShowList = await tmdb().popularTv();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

  let listHtml = '';

  tvShowList.forEach(tvshow => {
    listHtml += `<li class="item">
                  <div class="bob-container">
                    <img alt="${tvshow.title}"
                    src="${IMAGEURL}/w${WIDTH}${tvshow.backdrop_path}">
                    <div class="bob-overview-wapper">
                      <button type="button" class="play-btn icon-play">                 
                        <span class="a11y-hidden">재생</span>
                      </button>
                      <!-- 콘텐츠 정보 -->
                      <h4 class="item-title">${tvshow.title}</h4>
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
  $popularTvShowList.innerHTML = listHtml;
}

// Moives > 순위 Movies List
async function renderRateMovie() {
  // state
  const moviesList = await tmdb().ratedMovie();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

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
  $rateMovieList.innerHTML = listHtml;
}

// Moives > 순위 Movies List
async function renderpopularMovie() {
  // state
  const moviesList = await tmdb().popularMovie();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

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
  $popularMovieList.innerHTML = listHtml;
}

async function render() {
  // state set
  renderMainTv();
  renderMainMovie();
  renderRatedTv();
  renderpopularTv();
  renderRateMovie();
  renderpopularMovie();
}

function init() {
  render();
}

init();
