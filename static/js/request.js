

function request(requestName, requestData, successHandler, errorHandler, generalHandler) {
  successHandler = successHandler || function() {};
  errorHandler = errorHandler || function() {};
  generalHandler = generalHandler || function() {};

  console.log("Starting request \"" + requestName + "\"", requestData);
  // attach handler if there is none already
  if (window.app.socket._callbacks[requestName] == undefined) {
    window.app.socket.on(requestName, function (data) {
      console.log("Request \"" + requestName + "\" returned with data: ", data);
      generalHandler();
      if (data.success) {
        successHandler(data.result);
      } else {
        errorHandler();
        console.log("Request \"" + requestName + "\" returned with an error: " + data.error);
      }
    });
  }

  window.app.socket.emit(requestName, requestData);
}
