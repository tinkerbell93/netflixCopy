// api
import tmdb from '../api/tmdb';

// visualDetails DOMs
const mainItemTitle = document.querySelector('.main-item-title');
const visualWrapper = document.querySelector('.visual-wrapper');
const visualDetails = document.querySelector('.visual-details');
const mainItemBrief = visualDetails.querySelector('.main-item-brief');
const infoMoreBtn = document.querySelector('.infoMore-btn');
// visualDetails DOMs end
// info DOMs
const mainNavigation = document.querySelector('.main-navigation')
// overView
const overview = mainNavigation.querySelector('.overview')
const infoTitle = overview.querySelector('.info-title')
const infoMoreBg = overview.querySelector('.infoMore-BG')
const contentInfo = overview.querySelector('.content-info')
const year = contentInfo.querySelector('.yaer')
const maturityRating = contentInfo.querySelector('.maturity-rating')
const synopsis = overview.querySelector('.synopsis')
// infoMore-nav-lists-roundInfo
const c = mainNavigation.querySelector('.infoMore-nav-lists-roundInfo')
// infoMore-nav-lists-similarInfo
const infoMoreNavListsSimilarInfo = mainNavigation.querySelector('.infoMore-nav-lists-similarInfo')
// infoMore-nav-lists-moreInfo
const infoMoreNavListsMoreInfo = mainNavigation.querySelector('.infoMore-nav-lists-moreInfo')
// info DOMs end

// stats
let content;
let contentTitle;
let contentBrief;
let contentImage;
let releaseDate;
let firstAirDate;
// event

// function
async function getMainContent() {
  let moveList = await tmdb().popularMovie();
  let tvList = await tmdb().popularTv();
  let allList = [...moveList, ...tvList];
  let ranNum = Math.floor(Math.random() * (39 - 0));
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
function infoOverview(){
  // year
  releaseDate = content.release_date;
  firstAirDate = content.first_air_date
  let yearNum = releaseDate ? releaseDate : firstAirDate;
  yearNum = yearNum.split('-')[0]

  // adult 
  let adultDate = content.adult ? "청소년 관람 불과" : ''
  
  
  // render
  infoTitle.textContent = contentTitle
  infoMoreBg.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 70px, rgba(20, 20, 20, 1) 90vh), url(${contentImage[0]})`;
  year.textContent = yearNum
  maturityRating.textContent = adultDate
  synopsis.textContent = contentBrief
}

async function init() {
  await render();
  infoMoreBtn.addEventListener('click', infoOverview)
  console.log(content);
  
}

init();
