import search from '../api/tmdb';
async function init() {
  let test = await search().searchAll('asd');
  console.log(test);
}
init();
$contentSearch.onkeypress = async (e) => {
  e.preventDefault();
  if (e.keyCode !== 13 || $contentSearch.value.trim() === '') return;
  const searchResult = await search().searchAll($contentSearch.value);
  console.log(searchResult);
};
