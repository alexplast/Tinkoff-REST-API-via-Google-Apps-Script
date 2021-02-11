TinkoffApp
========

Обёртка Tinkoff API на Google Apps Script

Обёртку можно использовать как в виде файла добавлемого в исходный код проекта, так и в виде подключаемой библиотеки

## TinkoffApp.gs

### Как использовать файл

1. Добавьте содержимое файла TinkoffApp.gs в свой проект
2. Получите API токен в [кабинете Тинькофф Инвестиции](https://www.tinkoff.ru/invest/)
3. Пользуйтесь
```javascript
function myFunction() {

  // Создаём API
  var tAPI = new TinkoffApp({
    token: '1234567890', // укажите здесь свой токен
    logging: true, // Опционально - показывать в логах запросы и ответы
    mode: 'sandbox' // Опционально - для работы с песочницей
  });
 
  // Используем API
  var my_balance = tAPI.portfolioCurrencies(); // например, получаем валютные активы
}
```

## Библиотека TinkoffApp

### Ключ библиотеки

```
1uEtkgmmDPIQJ607pToZJX-0R2xa3g2hEw2Jx3KZmUni93T7FH2Vf4th1
```

### Версии

[https://script.google.com/macros/library/versions/d/1uEtkgmmDPIQJ607pToZJX-0R2xa3g2hEw2Jx3KZmUni93T7FH2Vf4th1](https://script.google.com/macros/library/versions/d/1uEtkgmmDPIQJ607pToZJX-0R2xa3g2hEw2Jx3KZmUni93T7FH2Vf4th1)

### Как использовать библиотеку

1. Подключите библиотеку `TinkoffApp` к своему проекту - [Инструкция](https://developers.google.com/apps-script/guide_libraries?hl=ru)
2. Получите API токен в [кабинете Тинькофф Инвестиции](https://www.tinkoff.ru/invest/)
3. Пользуйтесь
```javascript
function myFunction() {

  // Создаём API
  var tAPI = TinkoffApp.auth({
    token: '1234567890', // укажите здесь свой токен
    logging: true, // Опционально - показывать в логах запросы и ответы
    mode: 'sandbox' // Опционально - для работы с песочницей
  });
 
  // Используем API
  var my_balance = tAPI.portfolioCurrencies(); // например, получаем валютные активы
}
```

#### Чуть подробнее

Все методы аналогичны указанным в официальной документации - https://tinkoffcreditsystems.github.io/invest-openapi/swagger-ui/

Названия методов сформированы из пути обращения, с капитализацией первого символа идушего за спецсимволами, и удалением спецсимволов:
```
/market/search/by-ticker -> .marketSearchByTicker()
```
И для добавляемого кода и для библиотеки синтаксис методов одинаковый

##### Методы

sandbox
```javascript
- .sandboxRegister() // Регистрация клиента в sandbox
- .sandboxCurrenciesBalance(request, brokerAccountId) // Выставление баланса по валютным позициям
- .sandboxPositionsBalance(request, brokerAccountId) // Выставление баланса по инструментным позициям
- .sandboxRemove(brokerAccountId) // Удаление счета
- .sandboxClear(brokerAccountId) // Удаление всех позиций
```
orders
```javascript
- .orders(brokerAccountId) // Получение списка активных заявок
- .ordersLimitOrder(request, figi, brokerAccountId) // Создание лимитной заявки
- .ordersMarketOrder(request, figi, brokerAccountId) // Создание рыночной заявки
- .ordersCancel(orderId, brokerAccountId) // Отмена заявки
```
portfolio
```javascript
- .portfolio(brokerAccountId) // Получение портфеля клиента
- .portfolioCurrencies(brokerAccountId) // Получение валютных активов клиента
```
market
```javascript
- .marketStocks() // Получение списка акций
- .marketBonds() // Получение списка облигаций
- .marketEtfs() // Получение списка ETF
- .marketCurrencies() // Получение списка валютных пар
- .marketOrderbook(figi, depth) // Получение стакана по FIGI
- .marketCandles(figi, from, to, interval) // Получение исторических свечей по FIGI
- .marketSearchByFigi(figi) // Получение инструмента по FIGI
- .marketSearchByTicker(ticker) // Получение инструмента по тикеру
```
operations
```javascript
- .operations(from, to, figi, brokerAccountId) // Получение списка операций
```
user
```javascript
- .userAccounts() // Получение брокерских счетов клиента
```
