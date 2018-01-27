const fetch = require('node-fetch');
//const fetchObj = require('./replacement-fetch');
//const fetch = fetchObj.fetch;
const baseUrl = 'https://euw1.api.riotgames.com/lol/match/v3'
const accountUrl = baseUrl + '/matchlists/by-account/';
const matchUrl = baseUrl + '/matches/';
// dergerntod = 243801
// evakeefar = 213076956
var accountId = 213076956;
const apiKey = 'RGAPI-b8f8874d-43b6-49aa-b1a7-e5a793378a08';

var myAccountUrl = `${accountUrl}${accountId}?api_key=${apiKey}`;

var currentApiLimitTime = 0;
var curMax = 0;
var numMatchesCounted = 0;
var prevNumMatchesCounted = -1;
let numBlockedCalls = 0;
let result = {
  durations: [],
  earliestGame: Number.MAX_VALUE
}
let interval = setInterval(() => {
  if (numMatchesCounted != prevNumMatchesCounted) {
    console.log((100 * numMatchesCounted / curMax).toFixed(2) + '%');
    prevNumMatchesCounted = numMatchesCounted;
  }
}, 1000);
let errorUrls = {};

function timeout(time) {
  if (time <= 0) {
    return Promise.resolve();
  }
  return new Promise(resolve => {
    setTimeout(resolve, Number(time));
  });
}

function waitUntilApiLimitReset(res) {
  return new Promise(resolve => {
    if (Date.now() > currentApiLimitTime) {
      resolve(res);
    } else {
      let time = currentApiLimitTime - Date.now();
      timeout(time)
        .then(() => waitUntilApiLimitReset(res))
        .then((res) => resolve(res))
    }
  });
}

function handleFailedRequest(response, url) {
  if (Date.now() < currentApiLimitTime) {
    console.log("Fetch executed although limit is active!");
  }
  if (response.status && response.status != 200) {
    numBlockedCalls++;
    return Promise.reject({
      status: response.status,
      waitTime: response.headers.get('retry-after'),
      url
    });
  }
  return response.json();
}

function getPlaytimeInHoursPromise(beginIndex, resultObj) {
  const url = `${myAccountUrl}&beginIndex=${beginIndex}`;
  return waitUntilApiLimitReset()
    .then(() => fetch(url))
    .then(response => handleFailedRequest(response, url))
    .then(json => {
      let totalGames = json.totalGames;
      curMax = totalGames;
      console.log('got result for index list from id ' + beginIndex + '. max: ' + curMax);
      if (!json.matches) {
        return Promise.reject("result.matches was undefined! object was " +
          JSON.stringify(json));
      }
      let gameUrls = json.matches.map(match => `${matchUrl}${match.gameId}?api_key=${apiKey}`);

      function fetchMatch(curUrl, resultObj) {
        return waitUntilApiLimitReset()
          .then(() => fetch(curUrl))
          .then(response => handleFailedRequest(response, curUrl))
          .then(match => {
            numMatchesCounted++;
            let duration = match.gameDuration || 0;
            resultObj.durations.push(duration);
            resultObj.earliestGame = Math.min(resultObj.earliestGame, match.gameCreation);
            return resultObj;
          })
          .catch(e => {
            if (e.status == 429) {
              currentApiLimitTime = Date.now() + e.waitTime * 1000;
              return waitUntilApiLimitReset().then(() => fetchMatch(curUrl, resultObj));
            } else if (errorUrls[curUrl] > 3) {
              return Promise.reject(e);
            }
            errorUrls[curUrl] = (errorUrls[curUrl] || 0) + 1;
            return timeout(1000).then(() => fetchMatch(curUrl, resultObj));
          })
      }
      let curPromise = fetchMatch(gameUrls[0], resultObj);
      for (let i = 1; i < gameUrls.length; i++) {
        curPromise = curPromise.then(res => fetchMatch(gameUrls[i], res));
      }

      if (beginIndex + 100 < totalGames) {
        return curPromise.then(res => getPlaytimeInHoursPromise(beginIndex + 100, res));
      }
      return curPromise;
    }).catch(e => {
      if (e.status == 429) {
        currentApiLimitTime = Date.now() + e.waitTime * 1000;
        return waitUntilApiLimitReset().then(() => getPlaytimeInHoursPromise(beginIndex, resultObj));
      }
      return Promise.reject(e);
    })
}

getPlaytimeInHoursPromise(0, result)
  .then(resultObj => {
    console.log('playtime in hours: ' +
      resultObj.durations.reduce((sum = 0, cur) => cur + sum) / 3600);
    clearInterval(interval);
    console.log('earliest game: ' + new Date(resultObj.earliestGame).toGMTString());
    // console.log('fetch calls: ' + fetchObj.getFetchCalls());
    console.log('blocked calls: ' + numBlockedCalls);
  })
  .catch(e => console.error('error during api execution', e));