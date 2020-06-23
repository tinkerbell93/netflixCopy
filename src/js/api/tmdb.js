export default function tmdbApi() {
  const LANGUAGE = '&language=ko-kr';
  // const LANGUAGE = '';
  const BASEURL = 'https://api.themoviedb.org/3';
  const IMAGEURL = 'https://image.tmdb.org/t/p';
  const APIKEY = 'api_key=250ed9163433644ad57f1350029b12e8';
  const REGION = '&region=kr';
  const WIDTH = 1280;

  const MOVIE = 'movie';
  const TV = 'tv';
  const POPULAR = 'popular';
  const RATED = 'top_rated';
  // 인기 티비
  async function popularTv(num = 1) {
    let fullUrl = `${BASEURL}/${TV}/${POPULAR}?${APIKEY}${LANGUAGE}&page=${num}`;
    let tvLists = {};
    let getList = await fetch(fullUrl);
    tvLists = await getList.json().then((list) => list.results);
    return tvLists;
  }
  // 인기 영화
  async function popularMovie(num = 1) {
    let fullUrl = `${BASEURL}/${MOVIE}/${POPULAR}?${APIKEY}${LANGUAGE}&page=${num}${REGION}`;
    let tvLists = {};
    let getList = await fetch(fullUrl);
    tvLists = await getList.json().then((list) => list.results);
    return tvLists;
  }
  // 탑 티비
  async function ratedTv(num = 1) {
    let fullUrl = `${BASEURL}/${TV}/${RATED}?${APIKEY}${LANGUAGE}&page=${num}`;
    let tvLists = {};
    let getList = await fetch(fullUrl);
    tvLists = await getList.json().then((list) => list.results);
    return tvLists;
  }
  // 탑 영화
  async function ratedMovie(num = 1) {
    let fullUrl = `${BASEURL}/${MOVIE}/${RATED}?${APIKEY}${LANGUAGE}&page=${num}${REGION}`;
    let tvLists = {};
    let getList = await fetch(fullUrl);
    tvLists = await getList.json().then((list) => list.results);
    return tvLists;
  }
  // 백그라운드 이미지
  async function backdropImage(lists = []) {
    lists = lists.map((test) => test.backdrop_path);
    let imageList = lists.map((list) => `${IMAGEURL}/w${WIDTH}${list}`);
    return imageList;
  }
  // 포스터 이미지
  async function posterImage(lists = []) {
    lists = lists.map((test) => test.poster_path);
    let imageList = lists.map((list) => `${IMAGEURL}/w${WIDTH}${list}`);
    return imageList;
  }
  // 스틸컷 이미지
  async function stillImage(lists = []) {
    lists = lists.map((test) => test.still_path);
    let imageList = lists.map((list) => `${IMAGEURL}/w${WIDTH}${list}`);
    return imageList;
  }

  // 검색
  async function searchAll(query = '') {
    let fullUrl = `${BASEURL}/search/multi?${APIKEY}${LANGUAGE}&query=${query}&page=1&include_adult=false${REGION}`;
    return fullUrl;
  }
  // 티비 에피소드
  async function getTvEpisodes(tvObj = {}) {
    let fullUrl = `${BASEURL}/${TV}/${tvObj.id}/season/1?${APIKEY}${LANGUAGE}`;
    let epLists = {};
    let getEpList = await fetch(fullUrl);
    epLists = await getEpList.json().then((list) => list.episodes);
    return epLists;
  }

  // 비슷한 목록
  async function getSmilarList(kind, id) {
    let fullUrl = `${BASEURL}/${kind}/${id}/similar?${APIKEY}${LANGUAGE}&page=1`;
    let smilarLists = {};
    let getList = await fetch(fullUrl);
    smilarLists = await getList.json().then((list) => list.results);
    return smilarLists;
  }

  return {
    popularTv,
    popularMovie,
    ratedTv,
    ratedMovie,
    backdropImage,
    posterImage,
    searchAll,
    getTvEpisodes,
    stillImage,
    getSmilarList,
  };
}

// async function init () {
//   let test = tmdbApi()
//   // getList
//   console.log(await test.popularTv(2))
//   console.log(await test.popularMovie(2))
//   console.log(await test.ratedTv(2))
//   console.log(await test.ratedMovie(2))
//   let getMove = await test.popularMovie(2)
//   // getImage
//   let getImage = await test.popularTv(2)
//   console.log(await test.backdropImage(getImage))
//   console.log(await test.posterImage(getImage))

//   // search
//   console.log(await test.searchAll('무한도전'))

//   //티비 에피소드 or 스틸 컷
//   console.log(await test.getTvEpisodes(getImage[0]))
//   let epImg = await test.getTvEpisodes(getImage[0])
//   console.log(await test.stillImage(epImg))

//   // 비슷한 목록
//   console.log(await test.getSmilarList('movie', getMove[0].id))
// }

// init()
