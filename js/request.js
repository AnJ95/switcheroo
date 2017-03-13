

function request(requestName, requestData, successHandler) {
  $.ajax({
    url: "request/",
    method: "post",
    data: {
      "requestName" : requestName,
      "requestData" : requestData
    },
    success: function (data) {
      if (data.success) {
        successHandler();
      } else {
        console.log("Could not perform request \"" . requestName . "\". Error: " + data.error);
      }
    },
    error: function () {
      console.log("Could not perform request \"" . requestName . "\" due to network error");
    },
    dataType: "json"
  });
}
