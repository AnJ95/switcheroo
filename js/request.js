

function request(requestName, requestData, successHandler, errorHandler, generalHandler) {
  successHandler = successHandler || function() {};
  errorHandler = errorHandler || function() {};
  generalHandler = generalHandler || function() {};

  $.ajax({
    url: "request/",
    method: "post",
    data: {
      "requestName" : requestName,
      "requestData" : requestData
    },
    success: function (data) {
      generalHandler();
      if (data.success) {
        successHandler(data.result);
      } else {
        errorHandler();
        console.log("Request \"" + requestName + "\" returned with an error: " + data.error);
      }
    },
    error: function () {
      generalHandler();
      errorHandler();
      console.log("Could not perform request \"" + requestName + "\"");
    },
    dataType: "json"
  });
}
