
// api
import tmdb from '../api/tmdb';

// visualDetails DOMs
const mainItemTitle = document.querySelector('.main-item-title');
const visualWrapper = document.querySelector('.visual-wrapper');
const visualDetails = document.querySelector('.visual-details');
const mainItemBrief = visualDetails.querySelector('.main-item-brief');
const maturityRating = visualDetails.querySelector('.maturity-rating');
const linkWrapper = visualDetails.querySelector('.link-wrapper');

// stats
let content;
let contentTitle;
let contentBrief;
let contentImage;
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
  visualWrapper.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 70px, rgba(20, 20, 20, 1) 90vh),
  url(${contentImage[0]})`;
}

function init() {
  render();
}

init();
