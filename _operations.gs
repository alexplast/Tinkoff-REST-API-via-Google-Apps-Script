class Operations { // Получении информации по операциям
  constructor(token) {
    this.token = token;
  }
  List(from, to, figi, brokerAccountId) {
    var data = operations(this.token, from, to, figi, brokerAccountId);
    function operations(token, from, to, figi, brokerAccountId) { // Получение списка операций
      if ((from == undefined) || (from == null)) {
        throw new Error('Не указан обязательный параметр "from"');
      }
      if ((to == undefined) || (to == null)) {
        throw new Error('Не указан обязательный параметр "to"');
      }
      var obj = {
        parametres: {
          from: from,
          to: to
        },
        method: 'GET',
        path: 'operations'
      }
      if ((!!figi) && (figi != null)) {
        obj.parametres.figi = figi;
      }
      if (!!brokerAccountId) {
        obj.parametres.brokerAccountId = brokerAccountId;
      }
      return tinkoffApi_(obj, token);
    }
    return data;
  }
}