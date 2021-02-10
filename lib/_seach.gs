class Search { // Поиск
  constructor(token) {
    this.token = token;
  }
  ByFIGI(figi) {
    var data = marketSearchByFIGI(this.token, figi);
    function marketSearchByFIGI(token, figi) { // Получение инструмента по FIGI
      if ((figi == undefined) || (figi == null)) {
        throw new Error('Не указан обязательный параметр "figi"');
      }
      var obj = {
        parametres: {
          figi: figi
        },
        method: 'GET',
        path: 'market/search/by-figi'
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
  ByTicker(ticker) {
    var data = marketSearchByTicker(this.token, ticker);
    function marketSearchByTicker(token, ticker) { // Получение инструмента по тикеру
      if ((ticker == undefined) || (ticker == null)) {
        throw new Error('Не указан обязательный параметр "ticker"');
      }
      var obj = {
        parametres: {
          ticker: ticker
        },
        method: 'GET',
        path: 'market/search/by-ticker'
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
}