class Search { // Поиск
    constructor(token) {
        this.token = token;
    }
    ByFIGI(figi) {
        var cache = CacheService.getScriptCache(),
            cache_data = JSON.parse(cache.get(figi));
        if (cache_data == null) {
            var data = marketSearchByFIGI(this.token, figi);
            function marketSearchByFIGI(token, figi) { // Получение инструмента по FIGI
                var obj = {
                    parametres: {
                        figi: figi
                    },
                    method: 'GET',
                    path: 'market/search/by-figi'
                }
                return tinkoffApi_(obj, token);
            }
            cache.put(figi, data);
            return data;
        } else {
            return cache_data;
        }
    }
    ByTicker(ticker) {
        var cache = CacheService.getScriptCache(),
            cache_data = JSON.parse(cache.get(ticker));
        if (cache_data == null) {
            var data = marketSearchByTicker(this.token, ticker);
            function marketSearchByTicker(token, ticker) { // Получение инструмента по тикеру
                var obj = {
                    parametres: {
                        ticker: ticker
                    },
                    method: 'GET',
                    path: 'market/search/by-ticker'
                }
                return tinkoffApi_(obj, token);
            }
            cache.put(ticker, data);
            return data;
        } else {
            return cache_data;
        }
    }
}
