function tinkoffApi_(obj, token) {
  if (!!obj) {
    if (!!token) {
      Utilities.sleep(1500);
      var apiMode = '';
      if (options_.mode == 'sandbox') {
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
      if (!!options_.logging) {
        if (options_.logging == true) {
          Logger.log('Request URL:\n' +
            `${fullUrl}\n\n` +
            'Request DATA:\n' +
            `${JSON.stringify(options)}\n\n` +
            'Response DATA:\n' +
            `${response}`
          );
        }
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