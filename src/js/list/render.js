// api
import tmdb from '../api/tmdb';

// DOMs
const $tvShowList = document.querySelector('.main-tvShow-list ul');
const $movieList = document.querySelector('.main-movie-list ul');
const $rateTvShowList = document.querySelector('.rate-tvShow-list ul');
const $popularTvShowList = document.querySelector('.popular-tvShow-list ul');
const mainMovie = document.querySelector('.main-movie');
const $rateMovieList = mainMovie.querySelector('.rate-Movie-list > ul');
const $popularMovieList = document.querySelector('.popular-movie-list ul');
// 슬라이드
const $controls = document.querySelector('.controls');

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

// 티비 프로그램 > 순위 티비 프로그램 리스트
async function renderRatedTv() {
  // state
  const tvShowsList = await tmdb().ratedTv();
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const WIDTH = 500;

  let listHtml = '';

  tvShowsList.forEach(tvshow => {
    console.log(tvshow);
    listHtml += `<li class="item">
      <div class="bob-container">
        <img alt="${tvshow.name}"
        src="${IMAGEURL}/w${WIDTH}${tvshow.backdrop_path ? tvshow.backdrop_path : tvshow.poster_path}">
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
        <button type="button" class="detail-btn icon-down-open">
        </button>
      </div>
    </li>`;
  });
  $rateTvShowList.innerHTML = listHtml;

  // stats
  const startNum = 5; // initial slide index (0 ~ 4)
  let curIndex = 5;

  // DOMs
  const $ul = $rateTvShowList.parentNode.querySelector('ul');
  const $nextBtn = $ul.parentNode.parentNode.querySelector('.next-btn');
  const $prevBtn = $ul.parentNode.parentNode.querySelector('.prev-btn');

  const firstChild = $ul.firstElementChild;
  const lastChild = $ul.lastElementChild;
  const clonedFirst = [
    firstChild.cloneNode(true),
    firstChild.nextSibling.cloneNode(true),
    firstChild.nextSibling.nextSibling.cloneNode(true),
    firstChild.nextSibling.nextSibling.nextSibling.cloneNode(true),
    firstChild.nextSibling.nextSibling.nextSibling.nextSibling.cloneNode(true),
  ];
  // let clonedFirst = firstChild.cloneNode(true);

  const clonedLast = [
    lastChild.cloneNode(true),
    lastChild.previousSibling.cloneNode(true),
    lastChild.previousSibling.previousSibling.cloneNode(true),
    lastChild.previousSibling.previousSibling.previousSibling.cloneNode(true),
    lastChild.previousSibling.previousSibling.previousSibling.previousSibling.cloneNode(
      true
    ),
  ];
  console.log(clonedLast);

  // let clonedLast = lastChild.cloneNode(true);

  $ul.style.transform = 'translate3d(-' + slideWidth * (startNum + 5) + 'px, 0px, 0px)';

  $ul.style.width = slideWidth * slideLen + 'px';

  // addClone node
  clonedFirst.forEach(a => {
    a.classList.add('item');
    $ul.appendChild(a);
  });
  clonedLast.forEach(b => {
    b.classList.add('item');
    $ul.insertBefore(b, $ul.firstElementChild);
  });

  // $ul.appendChild(clonedFirst);
  // $ul.insertBefore(clonedLast, $ul.firstElementChild);

  const $item = $ul.querySelectorAll('.item');
  let curSlide = [
    $item[curIndex],
    $item[curIndex + 1],
    $item[curIndex + 2],
    $item[curIndex + 3],
    $item[curIndex + 4],
  ];
  console.log($item.length, '1');
  $ul.style.width = slideWidth * slideLen + 'px';
  // curSlide.classList.add('slide_active');
  curSlide.forEach(a => {
    a.classList.add('slide_active');
  });
  const slideLen = $item.length;
  const slideWidth = 280;
  const slideSpeed = 300;
  $nextBtn.addEventListener('click', () => {
    if (curIndex <= slideLen - 5) {
      console.log(curIndex);
      $ul.style.transition = slideSpeed + 'ms';
      $ul.style.transform = 'translate3d(-' + slideWidth * (curIndex + 1) + 'px, 0px, 0px)';
    }
    if (curIndex >= slideLen - 9) {
      console.log(curIndex);
      setTimeout(function () {
        $ul.style.transition = '0ms';
        $ul.style.transform = 'translate3d(-' + slideWidth + 'px, 0px, 0px)';
      }, slideSpeed);
      curIndex = 0;
    }

    // curSlide.classList.remove('slide_active');
    curSlide.forEach(a => {
      a.classList.remove('slide_active');
    });
    const temp = curIndex;
    curSlide = [
      $item[temp + 1],
      $item[temp + 2],
      $item[temp + 3],
      $item[temp + 4],
      $item[temp + 5],
    ];
    curIndex += 5;
    curSlide.forEach(a => {
      a.classList.add('slide_active');
    });
  });

  $prevBtn.addEventListener('click', () => {
    if (curIndex >= 0) {
      $ul.style.transition = slideSpeed + 'ms';
      $ul.style.transform = 'translate3d(-' + slideWidth * curIndex + 'px, 0px, 0px)';
    }
    if (curIndex === 0) {
      setTimeout(function () {
        $ul.style.transition = '0ms';
        $ul.style.transform = 'translate3d(-' + slideWidth * curIndex + 'px, 0px, 0px)';
      }, slideSpeed);
      curIndex = slideLen;
    }

    curSlide.forEach(a => {
      a.classList.remove('slide_active');
    });
    curSlide = [
      $item[curIndex],
      $item[curIndex - 1],
      $item[curIndex - 2],
      $item[curIndex - 3],
      $item[curIndex - 4],
    ];
    curSlide.forEach(a => {
      a.classList.add('slide_active');
    });
  });
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
                      src="${IMAGEURL}/w${WIDTH}${tvshow.backdrop_path ? tvshow.backdrop_path : tvshow.poster_path}">
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
                      <button type="button" class="detail-btn icon-down-open">
                      </button>
                    </div>
                  </li>`;
    }
  });
  $popularTvShowList.innerHTML = listHtml;

  // stats
  const startNum = 5; // initial slide index (0 ~ 4)
  let curIndex = 5;

  // DOMs

  const $ul = $popularTvShowList.parentNode.querySelector('ul');
  const $nextBtn = $ul.parentNode.parentNode.querySelector('.next-btn');
  const $prevBtn = $ul.parentNode.parentNode.querySelector('.prev-btn');

  const firstChild = $ul.firstElementChild;
  const lastChild = $ul.lastElementChild;
  const clonedFirst = [
    firstChild.cloneNode(true),
    firstChild.nextSibling.cloneNode(true),
    firstChild.nextSibling.nextSibling.cloneNode(true),
    firstChild.nextSibling.nextSibling.nextSibling.cloneNode(true),
    firstChild.nextSibling.nextSibling.nextSibling.nextSibling.cloneNode(true),
  ];
  // let clonedFirst = firstChild.cloneNode(true);

  const clonedLast = [
    lastChild.cloneNode(true),
    lastChild.previousSibling.cloneNode(true),
    lastChild.previousSibling.previousSibling.cloneNode(true),
    lastChild.previousSibling.previousSibling.previousSibling.cloneNode(true),
    lastChild.previousSibling.previousSibling.previousSibling.previousSibling.cloneNode(
      true
    ),
  ];
  console.log(clonedLast);

  // let clonedLast = lastChild.cloneNode(true);

  $ul.style.transform = 'translate3d(-' + slideWidth * (startNum + 5) + 'px, 0px, 0px)';

  $ul.style.width = slideWidth * slideLen + 'px';

  // addClone node
  clonedFirst.forEach(a => {
    a.classList.add('item');
    $ul.appendChild(a);
  });
  clonedLast.forEach(b => {
    b.classList.add('item');
    $ul.insertBefore(b, $ul.firstElementChild);
  });

  // $ul.appendChild(clonedFirst);
  // $ul.insertBefore(clonedLast, $ul.firstElementChild);

  const $item = $ul.querySelectorAll('.item');
  let curSlide = [
    $item[curIndex],
    $item[curIndex + 1],
    $item[curIndex + 2],
    $item[curIndex + 3],
    $item[curIndex + 4],
  ];
  console.log($item.length, '1');
  $ul.style.width = slideWidth * slideLen + 'px';
  // curSlide.classList.add('slide_active');
  curSlide.forEach(a => {
    a.classList.add('slide_active');
  });
  const slideLen = $item.length;
  const slideWidth = 280;
  const slideSpeed = 300;
  $nextBtn.addEventListener('click', () => {
    if (curIndex <= slideLen - 5) {
      console.log(curIndex);
      $ul.style.transition = slideSpeed + 'ms';
      $ul.style.transform = 'translate3d(-' + slideWidth * (curIndex + 1) + 'px, 0px, 0px)';
    }
    if (curIndex >= slideLen - 10) {
      console.log(curIndex);
      setTimeout(function () {
        $ul.style.transition = '0ms';
        $ul.style.transform = 'translate3d(-' + slideWidth + 'px, 0px, 0px)';
      }, slideSpeed);
      curIndex = 0;
    }

    // curSlide.classList.remove('slide_active');
    curSlide.forEach(a => {
      a.classList.remove('slide_active');
    });
    const temp = curIndex;
    curSlide = [
      $item[temp + 1],
      $item[temp + 2],
      $item[temp + 3],
      $item[temp + 4],
      $item[temp + 5],
    ];
    curIndex += 5;
    curSlide.forEach(a => {
      a.classList.add('slide_active');
    });
  });

  $prevBtn.addEventListener('click', () => {
    if (curIndex >= 5) {
      $ul.style.transition = slideSpeed + 'ms';
      $ul.style.transform = 'translate3d(-' + slideWidth * curIndex + 'px, 0px, 0px)';
    }
    if (curIndex === 10) {
      setTimeout(function () {
        $ul.style.transition = '0ms';
        $ul.style.transform = 'translate3d(-' + slideWidth * curIndex + 'px, 0px, 0px)';
      }, slideSpeed);
      curIndex = slideLen - 10;
    }

    curSlide.forEach(a => {
      a.classList.remove('slide_active');
    });
    console.log(curIndex);

    curSlide = [
      $item[curIndex],
      $item[curIndex - 1],
      $item[curIndex - 2],
      $item[curIndex - 3],
      $item[curIndex - 4],
    ];
    curSlide.forEach(a => {
      a.classList.add('slide_active');
    });
  });
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
                      src="${IMAGEURL}/w${WIDTH}${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}">
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
                      <button type="button" class="detail-btn icon-down-open">
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
                      src="${IMAGEURL}/w${WIDTH}${movie.backdrop_path ? movie.backdrop_path : movie.poster_path}">
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
                      <button type="button" class="detail-btn icon-down-open">
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
