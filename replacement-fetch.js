var useAlternate = false;
let fetchCalls = 0;
module.exports = {
    getFetchCalls: () => fetchCalls,
    fetch: function(url) {
        fetchCalls++;
        let regexResult = /.*beginIndex=([0-9]*)/.exec(url);
        let result = {
            status: 200
        };

        if (~url.indexOf('matchlists')) {
            let beginIndex = regexResult[1] || 0;
            let requireString = `./demoData/demoAccount${beginIndex}`

            if (beginIndex == 200 || beginIndex == 600) {
                useAlternate = !useAlternate;
                if (useAlternate) {
                    result.status = 429;
                    result.headers = {
                        get: () => {
                            return (Math.random() * 1).toFixed(0);
                        }
                    };
                }
                requireString += `.${useAlternate ? 0 : 1}`;
            }
            const curUseAlternate = useAlternate;
            result.json = () => {
                return Promise.resolve(require(requireString));
            };
            return Promise.resolve(result)
        } else if (~url.indexOf('matches')) {
            if (Math.random() < .1) {
                result.status = 429;
                result.headers = {
                    get: () => {
                        return (Math.random() * 1).toFixed(0);
                    }
                }
            } else {
                result.json = () => {
                    return Promise.resolve({ gameDuration: 60, timestamp: Date.now() });
                };
            }
            return Promise.resolve(result)
        }
        return Promise.reject('invalid url');
    }
};