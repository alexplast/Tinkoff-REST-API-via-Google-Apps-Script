class TinkoffApp {
  constructor(obj) {
    this.token = obj.token;
    this.mode = obj.mode;
    this.logging = obj.logging;
    this.connect = function api(obj, token, mode, logging) {
      if (obj != null) {
        if (token != null) {
          Utilities.sleep(1500);
          var apiMode = '';
          if (mode == 'sandbox') {
            apiMode = 'sandbox/'
          }
          var get_params = '';
          if (!!obj.parametres) {
            get_params = '?' + http_build_query(obj.parametres);
          }
          const apiUrl = `https://api-invest.tinkoff.ru/openapi/${apiMode}`;
          var fullUrl = `${apiUrl}${obj.path}${get_params}`,
            auth_str = 'Bearer ' + token,
            options = {
              "muteHttpExceptions": true,
              "headers": {
                "Authorization": auth_str,
              },
              "method": obj.method,
              "contentType": "application/json; charset=utf-8",
            };
          if (obj.data) {
            options.payload = JSON.stringify(obj.data);
          }
          var response = UrlFetchApp.fetch(fullUrl, options);
          if (logging == true) {
            Logger.log('Request URL:\n' +
              `${fullUrl}\n\n` +
              'Request DATA:\n' +
              `${JSON.stringify(options)}\n\n` +
              'Response DATA:\n' +
              `${response}`
            );
          }
          return JSON.parse(response);
        } else {
          throw new Error('Invalid token');
        }
      } else {
        throw new Error('Invalid data');
      }
      function http_build_query(formdata, numeric_prefix, arg_separator) { // Generate URL-encoded query string
        var key,
          use_val,
          use_key,
          i = 0,
          tmp_arr = [];
        if (!arg_separator) {
          arg_separator = '&';
        }
        for (key in formdata) {
          use_key = escape(key);
          use_val = escape((formdata[key].toString()));
          use_val = use_val.replace(/%20/g, '+');
          if (numeric_prefix && !isNaN(key)) {
            use_key = numeric_prefix + i;
          }
          tmp_arr[i] = use_key + '=' + use_val;
          i++;
        }
        return tmp_arr.join(arg_separator).replace(/\+/gm, '%2B');
      }
    }
  }
  SandboxRegister() {
    return this.connect({
      data: {
        brokerAccountType: "Tinkoff"
      },
      method: 'POST',
      path: 'sandbox/register'
    }, this.token, this.mode, this.logging);
  }
  SandboxCurrenciesBalance(request, brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      data: request,
      method: 'POST',
      path: 'sandbox/currencies/balance'
    }, this.token, this.mode, this.logging);
  }
  SandboxPositionsBalance(request, brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      data: request,
      method: 'POST',
      path: 'sandbox/positions/balance'
    }, this.token, this.mode, this.logging);
  }
  SandboxRemove(brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      method: 'POST',
      path: 'sandbox/remove'
    }, this.token, this.mode, this.logging);
  }
  SandboxClear(brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      method: 'POST',
      path: 'sandbox/clear'
    }, this.token, this.mode, this.logging);
  }
  Orders(brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      method: 'GET',
      path: 'orders'
    }, this.token, this.mode, this.logging);
  }
  OrdersLimitOrder(request, figi, brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId,
        figi: figi
      },
      data: request,
      method: 'POST',
      path: 'orders/limit-order'
    }, this.token, this.mode, this.logging);
  }
  OrdersMarketOrder(request, figi, brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId,
        figi: figi
      },
      data: request,
      method: 'POST',
      path: 'orders/market-order'
    }, this.token, this.mode, this.logging);
  }
  OrdersCancel(orderId, brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId,
        orderId: orderId
      },
      method: 'POST',
      path: 'orders/cancel'
    }, this.token, this.mode, this.logging);
  }
  Portfolio(brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      method: 'GET',
      path: 'portfolio'
    }, this.token, this.mode, this.logging);
  }
  PortfolioCurrencies(brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId
      },
      method: 'GET',
      path: 'portfolio/currencies'
    }, this.token, this.mode, this.logging);
  }
  MarketSearchByFIGI(figi) {
    return this.connect({
      parametres: {
        figi: figi
      },
      method: 'GET',
      path: 'market/search/by-figi'
    }, this.token, this.mode, this.logging);
  }
  MarketSearchByTicker(ticker) {
    return this.connect({
      parametres: {
        ticker: ticker
      },
      method: 'GET',
      path: 'market/search/by-ticker'
    }, this.token, this.mode, this.logging);
  }
  MarketStocks() {
    return this.connect({
      method: 'GET',
      path: 'market/stocks'
    }, this.token, this.mode, this.logging);
  }
  MarketBonds() {
    return this.connect({
      method: 'GET',
      path: 'market/bonds'
    }, this.token, this.mode, this.logging);
  }
  MarketETFs() {
    return this.connect({
      method: 'GET',
      path: 'market/etfs'
    }, this.token, this.mode, this.logging);
  }
  MarketCurrencies() {
    return this.connect({
      method: 'GET',
      path: 'market/currencies'
    }, this.token, this.mode, this.logging);
  }
  MarketOrderbook(figi, depth) {
    return this.connect({
      parametres: {
        figi: figi,
        depth: depth,
      },
      method: 'GET',
      path: 'market/orderbook'
    }, this.token, this.mode, this.logging);
  }
  MarketCandles(figi, from, to, interval) {
    return this.connect({
      parametres: {
        figi: figi,
        from: from, // 2019-08-19T18:38:33.131642+03:00
        to: to, // 2019-08-19T18:38:33.131642+03:00
        interval: interval, // Available values : 1min, 2min, 3min, 5min, 10min, 15min, 30min, hour, day, week, month
      },
      method: 'GET',
      path: 'market/candles'
    }, this.token, this.mode, this.logging);
  }
  Operations(from, to, figi, brokerAccountId) {
    return this.connect({
      parametres: {
        brokerAccountId: brokerAccountId,
        figi: figi,
        from: from,
        to: to
      },
      method: 'GET',
      path: 'operations'
    }, this.token, this.mode, this.logging);
  }
  UserAccounts() {
    return this.connect({
      method: 'GET',
      path: 'user/accounts'
    }, this.token, this.mode, this.logging);
  }
};











