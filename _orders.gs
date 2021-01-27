class Orders { // Операции заявок
  constructor(token) {
    this.token = token;
  }
  list(brokerAccountId) {
    var data = orders(this.token, brokerAccountId);
    function orders(token, brokerAccountId) { // Получение списка активных заявок
      var obj = {
        method: 'GET',
        path: 'orders'
      }
      if (!!brokerAccountId) {
        obj.parametres = {
          brokerAccountId: brokerAccountId
        };
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
  LimitOrder(request, figi, brokerAccountId) {
    var data = ordersLimitOrder(this.token, request, figi, brokerAccountId);
    function ordersLimitOrder(token, request, figi, brokerAccountId) { // Создание лимитной заявки
      if ((request == undefined) || (request == null)) {
        throw new Error('Не указан обязательный параметр "request"');
      }
      if ((figi == undefined) || (figi == null)) {
        throw new Error('Не указан обязательный параметр "figi"');
      }
      var obj = {
        data: request,
        parametres: {
          figi: figi
        },
        method: 'POST',
        path: 'orders/limit-order'
      }
      if (!!brokerAccountId) {
        obj.parametres.brokerAccountId = brokerAccountId;
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
  MarketOrder(request, figi, brokerAccountId) {
    var data = ordersMarketOrder(this.token, request, figi, brokerAccountId);
    function ordersMarketOrder(token, request, figi, brokerAccountId) { // Создание рыночной заявки
      if ((request == undefined) || (request == null)) {
        throw new Error('Не указан обязательный параметр "request"');
      }
      if ((figi == undefined) || (figi == null)) {
        throw new Error('Не указан обязательный параметр "figi"');
      }
      var obj = {
        data: request,
        parametres: {
          figi: figi
        },
        method: 'POST',
        path: 'orders/market-order'
      }
      if (!!brokerAccountId) {
        obj.parametres.brokerAccountId = brokerAccountId;
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
  Cancel(orderId, brokerAccountId) {
    var data = ordersCancel(this.token, orderId, brokerAccountId);
    function ordersCancel(token, orderId, brokerAccountId) { // Отмена заявки
      if ((orderId == undefined) || (orderId == null)) {
        throw new Error('Не указан обязательный параметр "orderId"');
      }
      var obj = {
        parametres: {
          orderId: orderId
        },
        method: 'POST',
        path: 'orders/cancel'
      }
      if (!!brokerAccountId) {
        obj.parametres.brokerAccountId = brokerAccountId;
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
}