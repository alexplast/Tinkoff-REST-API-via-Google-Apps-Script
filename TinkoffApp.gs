class TinkoffApp {
  constructor(obj) {
    this.token = obj.token;
    this.mode = obj.mode;
    this.logging = obj.logging;
    this.accountId = obj.accountId;
    this.connect = function api(obj) {
      if (obj != null) {
        if (this.token != null) {
          var apiMode = "";
          if (this.mode == "sandbox" && obj.sandbox) {
            obj.path = obj.path.replace(
              /.+\/([A-Z][a-z]+)(.+)/,
              "SandboxService/$1Sandbox$2"
            );
          }
          const apiUrl = `https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.`;
          if (obj.data.accountId == 1) {
            obj.data.accountId = this.accountId;
          }
          var fullUrl = `${apiUrl}${obj.path}`,
            options = {
              muteHttpExceptions: true,
              headers: {
                Authorization: "Bearer " + this.token,
              },
              method: "POST",
              contentType: "application/json",
              payload: JSON.stringify(obj.data),
            };
          var response = UrlFetchApp.fetch(fullUrl, options);
          if (this.logging == true) {
            Logger.log(
              "Request URL:\n" +
                `${fullUrl}\n\n` +
                "Request DATA:\n" +
                `${JSON.stringify(options, null, 4)}\n\n` +
                "Response DATA:\n" +
                `${response}\n` +
                "Response headers:\n" +
                `${JSON.stringify(response.getAllHeaders(), null, 4)}`
            );
          }
          return JSON.parse(response);
        } else {
          throw new Error("Invalid token");
        }
      } else {
        throw new Error("Invalid data");
      }
    };
  }
  InstrumentsBondBy(idType, classCode, id) {
    return this.connect({
      data: {
        idType: idType,
        classCode: classCode,
        id: id,
      },
      path: "InstrumentsService/BondBy",
    });
  }
  InstrumentsBonds(instrumentStatus) {
    return this.connect({
      data: {
        instrumentStatus: instrumentStatus,
      },
      path: "InstrumentsService/Bonds",
    });
  }
  InstrumentsCurrencies(instrumentStatus) {
    return this.connect({
      data: {
        instrumentStatus: instrumentStatus,
      },
      path: "InstrumentsService/Currencies",
    });
  }
  InstrumentsCurrencyBy(idType, classCode, id) {
    return this.connect({
      data: {
        idType: idType,
        classCode: classCode,
        id: id,
      },
      path: "InstrumentsService/CurrencyBy",
    });
  }
  InstrumentsEtfBy(idType, classCode, id) {
    return this.connect({
      data: {
        idType: idType,
        classCode: classCode,
        id: id,
      },
      path: "InstrumentsService/EtfBy",
    });
  }
  InstrumentsEtfs() {
    return this.connect({
      data: {
        instrumentStatus: instrumentStatus,
      },
      path: "InstrumentsService/Etfs",
    });
  }
  InstrumentsFutureBy(idType, classCode, id) {
    return this.connect({
      data: {
        idType: idType,
        classCode: classCode,
        id: id,
      },
      path: "InstrumentsService/FutureBy",
    });
  }
  InstrumentsFutures(instrumentStatus) {
    return this.connect({
      data: {
        instrumentStatus: instrumentStatus,
      },
      path: "InstrumentsService/Futures",
    });
  }
  InstrumentsGetAccruedInterests(figi, from, to) {
    return this.connect({
      data: {
        figi: figi,
        from: from,
        to: to,
      },
      path: "InstrumentsService/GetAccruedInterests",
    });
  }
  InstrumentsGetDividends(figi, from, to) {
    return this.connect({
      data: {
        figi: figi,
        from: from,
        to: to,
      },
      path: "InstrumentsService/GetDividends",
    });
  }
  InstrumentsGetFuturesMargin(figi) {
    return this.connect({
      data: {
        figi: figi,
      },
      path: "InstrumentsService/GetFuturesMargin",
    });
  }
  InstrumentsGetInstrumentBy(idType, classCode, id) {
    return this.connect({
      data: {
        idType: idType,
        classCode: classCode,
        id: id,
      },
      path: "InstrumentsService/GetInstrumentBy",
    });
  }
  InstrumentsShareBy(idType, classCode, id) {
    return this.connect({
      data: {
        idType: idType,
        classCode: classCode,
        id: id,
      },
      path: "InstrumentsService/ShareBy",
    });
  }
  InstrumentsShares(instrumentStatus) {
    return this.connect({
      data: {
        instrumentStatus: instrumentStatus,
      },
      path: "InstrumentsService/Shares",
    });
  }
  InstrumentsTradingSchedules(exchange, from, to) {
    return this.connect({
      data: {
        exchange: exchange,
        from: from,
        to: to,
      },
      path: "InstrumentsService/TradingSchedules",
    });
  }

  MarketDataGetCandles(figi, from, to, interval) {
    return this.connect({
      data: {
        figi,
        from,
        to,
        interval,
      },
      path: "MarketDataService/GetCandles",
    });
  }
  MarketDataGetLastPrices(figi) {
    return this.connect({
      data: {
        figi: [figi],
      },
      path: "MarketDataService/GetLastPrices",
    });
  }
  MarketDataGetOrderBook(figi, depth) {
    return this.connect({
      data: {
        figi,
        depth,
      },
      path: "MarketDataService/GetOrderBook",
    });
  }
  MarketDataGetTradingStatus(figi) {
    return this.connect({
      data: {
        figi,
      },
      path: "MarketDataService/GetTradingStatus",
    });
  }

  OperationsGetOperations(accountId = 1, from, to, state, figi) {
    return this.connect({
      data: {
        accountId,
        from,
        to,
        state,
        figi,
      },
      path: "OperationsService/GetOperations",
      sandbox: true,
    });
  }
  OperationsGetPortfolio(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "OperationsService/GetPortfolio",
      sandbox: true,
    });
  }
  OperationsGetPositions(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "OperationsService/GetPositions",
      sandbox: true,
    });
  }
  OperationsGetWithdrawLimits(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "OperationsService/GetWithdrawLimits",
    });
  }

  OrdersCancelOrder(accountId = 1, orderId) {
    return this.connect({
      data: {
        accountId,
        orderId,
      },
      path: "OrdersService/CancelOrder",
      sandbox: true,
    });
  }
  OrdersGetOrderState(accountId = 1, orderId) {
    return this.connect({
      data: {
        accountId,
        orderId,
      },
      path: "OrdersService/GetOrderState",
      sandbox: true,
    });
  }
  OrdersGetOrders(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "OrdersService/GetOrders",
      sandbox: true,
    });
  }
  OrdersPostOrder(
    figi,
    quantity,
    price_units,
    direction,
    accountId = 1,
    orderType,
    orderId
  ) {
    return this.connect({
      data: {
        figi,
        quantity,
        price: {
          nano: 6,
          units: price_units,
        },
        direction,
        accountId,
        orderType,
        orderId,
      },
      path: "OrdersService/PostOrder",
      sandbox: true,
    });
  }

  SandboxCloseSandboxAccount(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "SandboxService/CloseSandboxAccount",
    });
  }

  SandboxOpenSandboxAccount() {
    return this.connect({
      data: {},
      path: "SandboxService/OpenSandboxAccount",
    });
  }

  SandboxSandboxPayIn(accountId = 1, currency, units) {
    return this.connect({
      data: {
        accountId,
        amount: {
          nano: 5,
          currency,
          units,
        },
      },
      path: "SandboxService/SandboxPayIn",
    });
  }

  StopOrdersCancelStopOrder(accountId = 1, stopOrderId) {
    return this.connect({
      data: {
        accountId,
        stopOrderId,
      },
      path: "StopOrdersService/CancelStopOrder",
    });
  }
  StopOrdersGetStopOrders(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "StopOrdersService/GetStopOrders",
    });
  }
  StopOrdersPostStopOrder(
    figi,
    quantity,
    price_units,
    stopPrice_units,
    direction,
    accountId = 1,
    expirationType,
    stopOrderType,
    expireDate
  ) {
    return this.connect({
      data: {
        figi,
        quantity,
        price: {
          nano: 6,
          units: price_units,
        },
        stopPrice: {
          nano: 6,
          units: stopPrice_units,
        },
        direction,
        accountId,
        expirationType,
        stopOrderType,
        expireDate,
      },
      path: "StopOrdersService/PostStopOrder",
    });
  }

  UsersGetAccounts() {
    return this.connect({
      data: {},
      path: "UsersService/GetAccounts",

      sandbox: true,
    });
  }
  UsersGetInfo() {
    return this.connect({
      data: {},
      path: "UsersService/GetInfo",
    });
  }
  UsersGetMarginAttributes(accountId = 1) {
    return this.connect({
      data: {
        accountId,
      },
      path: "UsersService/GetMarginAttributes",
    });
  }
  UsersGetUserTariff() {
    return this.connect({
      data: {},
      path: "UsersService/GetUserTariff",
    });
  }
}
