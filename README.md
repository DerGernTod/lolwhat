# riotapi

> Riot API Testing

## TODO

* implement caching mechanism: check elastic, then riot api, 'validUntil' per request
* collect summoner info
* provide summoner view
  * show champs overall played
  * provide filter by map/gamemode/ranked
  * show win percentage
  * show enemy statistics (win/lose against enemy champs)
  * show winrate by match length
* provide match view
  * show farm/xp over time

## Build Setup

Download elasticsearch and provide the path to the .sh or .bat file in config/lolwhat.config.json.

``` bash
# install dependencies
npm install

# serve with elastic and hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


