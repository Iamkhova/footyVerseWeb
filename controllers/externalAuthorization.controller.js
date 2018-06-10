const requestPromise = require('request-promise');
const dataTemplate = {'data' : '', 'message' : '', 'status' : '', 'function' : '', 'user' : ''};
const fileName = 'externalAuthorization.controller';
const winston=require('winston');

exports.processRequest = function (_method, _userId, _url, _body) {
  const data = dataTemplate;
  const functionName = 'processRequest';

  const options = {
    method: _method,
    uri: _url,
    headers: {
      'Accept': 'application/json',
    },
    body: _body,
    json: true // Automatically parses the JSON string in the response
  };

  return new Promise(function (resolve, reject) {
    requestPromise(options)
      .then(function (theResult) {
        data.message = 'success';
        data.data = theResult;
        data.status = 200;
        data.user = _userId;
        data.function = fileName + '-' + functionName;
        resolve(data);
      })
      .catch(function (err) {
        data.message = err.toString();
        data.status = 500;
        data.user = _userId;
        data.function = fileName + '-' + functionName;
        reject(data);
      });
  })

}
