// api
import tmdb from '../api/tmdb';

// 전부
const test = document.querySelector('.test');
const test1 = document.querySelector('.test1');
const test1MyList = test1.querySelector('.test1-myList');
const logo = document.querySelector('.logo');

// 찜 목록 이동
const myList = document.querySelector('.myList');
// visualDetails DOMs
const mainVisual = document.querySelector('.main-visual');
const mainItemTitle = document.querySelector('.main-item-title');
const visualWrapper = document.querySelector('.visual-wrapper');
const visualDetails = document.querySelector('.visual-details');
const mainItemBrief = visualDetails.querySelector('.main-item-brief');
const infoMoreBtn = document.querySelector('.infoMore-btn');
// visualDetails DOMs end
// info DOMs
const infoMore = document.querySelector('.infoMore');
const mainNavigation = document.querySelector('.main-navigation');
// overView
const overview = mainNavigation.querySelector('.overview');
const infoTitle = overview.querySelector('.info-title');
const infoMoreBg = overview.querySelector('.infoMore-BG');
const contentInfo = overview.querySelector('.content-info');
const year = contentInfo.querySelector('.yaer');
const maturityRating = contentInfo.querySelector('.maturity-rating');
const synopsis = overview.querySelector('.synopsis');
const cast = overview.querySelector('.cast');
const castListItems = cast.querySelector('.list-items');
const genres = overview.querySelector('.genres');
const genresListItems = genres.querySelector('.list-items');
const addListBtn = overview.querySelector('.addList-btn');
// infoMore-nav-lists-roundInfo
const c = mainNavigation.querySelector('.infoMore-nav-lists-roundInfo');
// infoMore-nav-lists-similarInfo
const infoMoreNavListsSimilarInfo = mainNavigation.querySelector(
  '.infoMore-nav-lists-similarInfo'
);
// infoMore-nav-lists-moreInfo
const infoMoreNavListsMoreInfo = mainNavigation.querySelector(
  '.infoMore-nav-lists-moreInfo'
);
// info DOMs end

// stats
let content;
let contentTitle;
let contentBrief;
let contentImage;
let releaseDate;
let firstAirDate;
let ranNum;
let castView;
// event

// function
async function getMainContent() {
  let moveList = await tmdb().popularMovie();
  let tvList = await tmdb().popularTv();
  let allList = [...moveList, ...tvList];
  ranNum = Math.floor(Math.random() * (39 - 0));
  return allList[ranNum];
}

async function getContentImage() {
  let imageUrl = await tmdb().backdropImage([content]);
  return imageUrl;
}

// main-visual render
async function render() {
  // state set
  content = await getMainContent();
  contentTitle = content.title ? content.title : content.name;

  contentBrief = content.overview;
  let temp = contentBrief.split(' ');
  if (temp.length > 30) {
    temp = contentBrief.split('.');
    contentBrief = temp[0] + '.';
  }

  if (content.adult !== undefined || content.adult !== false)
    document.querySelector('.maturity-rating').style.opacity = 0;

  contentImage = await getContentImage();

  // DOM change
  mainItemTitle.textContent = contentTitle;
  mainItemBrief.textContent = contentBrief;
  visualWrapper.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 70px, rgba(20, 20, 20, 1) 90vh), url(${contentImage[0]})`;
}
// main-visual render end

// info
async function infoOverview() {
  mainVisual.style.display = 'none';
  infoMore.style.display = 'block';
  // year
  releaseDate = content.release_date;
  firstAirDate = content.first_air_date;
  let yearNum = releaseDate ? releaseDate : firstAirDate;
  yearNum = yearNum.split('-')[0];

  // adult
  let adultDate = content.adult ? '청소년 관람 불가' : '';
  let detailView;
  // detail
  if (ranNum < 20) {
    detailView = await tmdb().detailMovie(content.id);
    castView = await tmdb().castMovie(content.id);
    castView = castView.cast.map(({ name }) => name);
  } else {
    detailView = await tmdb().detailTv(content.id);
    castView = await tmdb().castTv(content.id);
    castView = castView.cast.map(({ name }) => name);
  }
  castView = castView.slice(0, 3);

  let genres = await detailView.genres;

  // render
  infoMoreBg.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 70px, rgba(20, 20, 20, 1) 90vh), url(${contentImage[0]})`;
  year.textContent = yearNum + '년';
  infoTitle.textContent = contentTitle;
  maturityRating.textContent = adultDate;
  synopsis.textContent = contentBrief;
  castView.forEach((cast) => {
    let html = `<li>${cast}<li>`;
    castListItems.innerHTML += html;
  });

  genres.forEach((a) => {
    let html = `<li>${a.name}</li>`;
    genresListItems.innerHTML += html;
  });
}

function addList(e) {
  let item = JSON.parse(localStorage.getItem('itemList'));
  let id = content.id;
  let test = true;
  if (item) {
    item.forEach((i) => {
      if (ranNum < 20) {
        if (Object.is(i.moive, content.id)) {
          test = false;
        }
      } else {
        if (Object.is(i.tv, content.id)) {
          test = false;
        }
      }
    });
  }
  if (test) {
    if (ranNum < 20) {
      if (item) {
        item = [...item, { moive: id }];
      } else {
        item = [{ moive: id }];
      }
      localStorage.setItem('itemList', JSON.stringify(item));
    } else {
      if (item) {
        item = [...item, { tv: id }];
      } else {
        item = [{ tv: id }];
      }
      localStorage.setItem('itemList', JSON.stringify(item));
    }
  }

  item = localStorage.getItem('itemList');
  console.log(JSON.parse(item));
}

async function searchList(e) {
  let getItems = await JSON.parse(localStorage.getItem('itemList'));
  let searchList = [];
  // await getItems.forEach(async getItem => {
  //   if('moive' in getItem){
  //     // console.log(getItem.moive);
  //     await tmdb().detailMovie(getItem.moive)
  //   }else{
  //     // console.log(getItem.tv);
  //     await tmdb().detailTv(getItem.tv)
  //   }
  // })

  for (const item of getItems) {
    if ('moive' in item) {
      // console.log(getItem.moive);
      searchList.push(await tmdb().detailMovie(item.moive));
    } else {
      // console.log(getItem.tv);
      searchList.push(await tmdb().detailTv(item.tv));
    }
  }

  test.style.display = 'none';
  test1.style.height = '1000px';

  let myLists = searchList;

  let html = '';
  for (const item of myLists) {
    html += `
    <li class="item">
    <div class="bob-container">
      <img alt="${item.name ? item.name : item.title}"
      src="${await tmdb().backdropImage([item])}">
      <div class="bob-overview-wapper">
        <button type="button" class="play-btn icon-play">                 
          <span class="a11y-hidden">재생</span>
        </button>
        <!-- 콘텐츠 정보 -->
        <h4 class="item-title">${item.name ? item.name : item.title}</h4>
        <ul>
          <li class="maturity-rating">
            ${item.adult ? '청소년 관람 불가' : '모든 연령 관람 가능'}
          </li>
          <li>
          ${item.genres.map(({ name }) => name)}
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
  </li>
    `;
  }

  test1MyList.innerHTML = html;
}
function move() {
  test1MyList.style.transform = `translate3D(${100}px, 0, 0)`;
}
function moveToPrev() {
  console.log('prev');

  move();
}
function moveToNext() {
  console.log('next');
  move();
}

function gHome() {}
const prev = document.querySelector('.carousel-control.prev');
const next = document.querySelector('.carousel-control.next');

async function init() {
  await render();
  infoMoreBtn.addEventListener('click', infoOverview);
  addListBtn.addEventListener('click', addList);
  logo.addEventListener('click', gHome);
  myList.addEventListener('click', searchList);
  prev.addEventListener('click', moveToPrev);
  next.addEventListener('click', moveToNext);
}

init();
