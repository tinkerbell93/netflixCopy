import none from '../api/tmdb';

async function init() {
  let test = await none().searchAll('무한도전');
  console.log(test);
}
init();


const $navigationList = document.querySelector('.navigation-list');
const $navigationListItem = document.querySelector('navigation-list > li');
const $searchFormContainer = document.querySelector('.search-form-container');
const $iconSearch = document.querySelector('.icon-search');
const $searchForm = document.querySelector('.search-form');
const $searchBox = document.querySelector('.search-box');
const $contentSearch = document.getElementById('content-search');

// 네비게이션 클릭 시 네비 폰트 굵어지는 이벤트
$navigationList.onclick = ({ target }) => {
  if (!target.matches('.navigation-list a')) return;
  target.style.fontWeight = 'bold';
};

// 돋보기 버튼 클릭 시 input 박스 애니메이션 효과
$iconSearch.onclick = () => {
  $searchForm.classList.add('active');
  $iconSearch.classList.add('active');
  $contentSearch.classList.add('active');
};

// 포커스가 빠지면
$iconSearch.onblur = () => {

};

// $searchFormContainer.querySelectorAll('.active');
// $contentSearch.focus();
// $contentSearch.select();
