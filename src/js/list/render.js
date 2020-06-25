// api
import tmdb from '../api/tmdb';

// DOMs
const $rateTvShowList = document.querySelector('.rate-tvShow-list ul');
const $popularTvShowList = document.querySelector('.popular-tvShow-list ul');
const mainMovie = document.querySelector('.main-movie');
const $rateMovieList = mainMovie.querySelector('.rate-Movie-list > ul');
const $popularMovieList = document.querySelector('.popular-movie-list ul');
// 슬라이드
const $controls = document.querySelector('.controls');
const $prevBtn = document.querySelector('.prev-btn');
const $nextBtn = document.querySelector('.next-btn');

// stats
let slideWrapper;
let slideContainer;
let slideList;
let slideLen;

// 장르 리스트
const genresList = [
  {
    id: 28,
    name: '액션',
  },
  {
    id: 12,
    name: '모험',
  },
  {
    id: 16,
    name: '애니메이션',
  },
  {
    id: 35,
    name: '코미디',
  },
  {
    id: 80,
    name: '범죄',
  },
  {
    id: 99,
    name: '다큐멘터리',
  },
  {
    id: 18,
    name: '드라마',
  },
  {
    id: 10751,
    name: '가족',
  },
  {
    id: 14,
    name: '판타지',
  },
  {
    id: 36,
    name: '역사',
  },
  {
    id: 27,
    name: '공포',
  },
  {
    id: 10402,
    name: '음악',
  },
  {
    id: 9648,
    name: '미스터리',
  },
  {
    id: 10749,
    name: '로맨스',
  },
  {
    id: 878,
    name: 'SF',
  },
  {
    id: 10770,
    name: 'TV 영화',
  },
  {
    id: 53,
    name: '스릴러',
  },
  {
    id: 10752,
    name: '전쟁',
  },
  {
    id: 37,
    name: '서부',
  },
  {
    id: 10759,
    name: '액션어드벤쳐',
  },
  {
    id: 10762,
    name: '어린이',
  },
  {
    id: 10763,
    name: '뉴스',
  },
  {
    id: 10764,
    name: '리얼리티',
  },
  {
    id: 10765,
    name: '판타지',
  },
  {
    id: 10766,
    name: '흥미진진',
  },
  {
    id: 10767,
    name: '토크',
  },
  {
    id: 10768,
    name: '전쟁',
  },
];

// Functions
// 장르 출력
function getGenre(movie) {
  const genreIds = movie.genre_ids;

  function matchGenre(id) {
    let genreName = '';
    genresList.forEach(genre => {
      genre.id === id ? (genreName = genre.name) : '';
    });
    return genreName;
  }

  let nameArr = [];
  genreIds.forEach(id => {
    nameArr = [...nameArr, matchGenre(id)];
  });

  return nameArr;
}

// 슬라이드
function slide(listContent) {
  // console.log('div', listContent);
  slideWrapper = listContent;
  slideContainer = slideWrapper.querySelector('ul'); // slideList
  slideList = slideWrapper.querySelectorAll('li.item'); // slideContents
  slideLen = slideList.length;

  // const listwidth = 280;
  const slideWidth = 280;
  const slideSpeed = 300;
  const startNum = 0;

  slideContainer.style.width = `${slideWidth * (slideLen + 2)}px`;

  // Copy first, last slide
  const firstChild = slideContainer.firstElementChild;
  const lastChild = slideContainer.lastElementChild;
  const cloneFirst = firstChild.cloneNode(true);
  const cloneLast = lastChild.cloneNode(true);

  // Add copied Slides
  slideContainer.appendChild(cloneFirst);
  slideContainer.insertBefore(cloneLast, slideContainer.firstElementChild);

  slideContainer.style.left = `-${slideWidth * (startNum + 1)}px`;

  let curIndex = startNum;
  let curSlide = slideList[curIndex];
  curSlide.classList.add('slide-active');

  $nextBtn.addEventListener('click', () => {
    if (curIndex < slideLen - 1) {
      slideContainer.style.transition = `${slideSpeed}ms`;
      slideContainer.style.left = `-${slideWidth * (curIndex + 2) * 5}px`;
    } else if (curIndex === slideLen - 1) {
      setTimeout(() => {
        slideContainer.style.left = '0px';
        slideContainer.style.left = `-${slideWidth}px`;
      }, slideSpeed);
      curIndex = -1;
    }
    curSlide.classList.remove('slide-active');
    curSlide = slideList[++curIndex];
    curSlide.classList.add('slide-active');
  });
}

// 티비 프로그램 > 순위 티비 프로그램 리스트
async function renderRatedTv() {
  // state
  const tvShowsList = await tmdb().ratedTv();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

  let listHtml = '';

  tvShowsList.forEach(tvshow => {
    if (tvshow.backdrop_path) {
      listHtml += `<li class="item">
      <div class="bob-container">
        <img alt="${tvshow.name}"
        src="${IMAGEURL}/w${WIDTH}${tvshow.backdrop_path}">
        <div class="bob-overview-wapper">
          <button type="button" class="play-btn icon-play">                 
            <span class="a11y-hidden">재생</span>
          </button>
          <!-- 콘텐츠 정보 -->
          <h4 class="item-title">${tvshow.name}</h4>
          <ul>
            <li class="maturity-rating">
              ${tvshow.adult ? '청소년 관람 불가' : ''}
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
    }
  });
  $rateTvShowList.innerHTML = listHtml;

  // $controls.onclick = ({ target }) => {
  //   slideWrapper = target.parentNode.parentNode;
  //   slide(slideWrapper, target);
  // };
  slideWrapper = $rateTvShowList.parentNode;
  slide(slideWrapper);
  // return slideList;
}

// 티비 프로그램 > 인기 티비 프로그램 리스트
async function renderpopularTv() {
  // state
  const tvShowList = await tmdb().popularTv();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

  let listHtml = '';

  tvShowList.forEach(tvshow => {
    if (tvshow.backdrop_path) {
      listHtml += `<li class="item">
                  <div class="bob-container">
                    <img alt="${tvshow.name}"
                    src="${IMAGEURL}/w${WIDTH}${tvshow.backdrop_path}">
                    <div class="bob-overview-wapper">
                      <button type="button" class="play-btn icon-play">                 
                        <span class="a11y-hidden">재생</span>
                      </button>
                      <!-- 콘텐츠 정보 -->
                      <h4 class="item-title">${tvshow.name}</h4>
                      <ul>
                        <li class="maturity-rating">
                          ${tvshow.adult ? '청소년 관람 불가' : ''}
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
    }
  });
  $popularTvShowList.innerHTML = listHtml;
}

// 영화 > 순위 영화 리스트
async function renderRateMovie() {
  // state
  const moviesList = await tmdb().ratedMovie();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

  let listHtml = '';

  moviesList.forEach(movie => {
    if (movie.backdrop_path) {
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
                          ${movie.adult ? '청소년 관람 불가' : ''}
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
    }
  });

  $rateMovieList.innerHTML = listHtml;
}

// 영화 > 인기 영화 리스트
async function renderpopularMovie() {
  // state
  const moviesList = await tmdb().popularMovie();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 300;

  let listHtml = '';

  moviesList.forEach(movie => {
    if (movie.backdrop_path) {
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
                          ${movie.adult ? '청소년 관람 불가' : ''}
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
    }
  });

  $popularMovieList.innerHTML = listHtml;
}

async function render() {
  renderRatedTv();
  renderpopularTv();
  renderRateMovie();
  renderpopularMovie();
}

async function init() {
  await render();
}

init();
