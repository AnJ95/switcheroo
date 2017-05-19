window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Model = window.app.mvr.Observable.extend({

  /*
  Boolean that signs if the model is yet populated
  */
  isPopulated : false,


  /*
  Generic state that can hold any json data
  */
  json : {},


  /*
  updates internal state and calls notifyObservers()
  */
  update : function (json) {
    this.json = json;
    this.isPopulated = true;
    if (arguments[1] !== undefined && !arguments[1]) {
        this.notifyObservers();
    }
    return this;
  },


  /*
  Starts a request to the server as specified in
    fetchRequestName()
    fetchRequestData()
  and calls update(json) with the result as soon as the server responds.
  */
  fetch : function () {
    var that = this;
    request(
      this.fetchRequestName(),
      this.fetchRequestData(),
      function (json) {
        that.isPopulated = true;
        that.update.call(that, json);
      },
      function () {
        that.error.call(that, "Could not fetch data for model");
      }
    );

    return this;
  },


  /*
  Specifies the name of the request to fetch this models data
  */
  fetchRequestName : function () {
    this.warn("Did not specify fetchRequestName in concrete Model");
    return "";
  },


  /*
  Specifies additional data for the request to fetch this models data
  */
  fetchRequestData : function () {
    this.warn("Did not specify fetchRequestData in concrete Model");
    return [];
  }

});
