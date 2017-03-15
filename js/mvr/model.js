window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Model = window.app.mvr.Observable.extend({
  json : {},
  update : function (json) {
    this.json = json;
    this.notifyObservers();

    return this;
  },

  fetch : function () {
    var that = this;
    request(
      this.fetchRequestName(),
      this.fetchRequestData(),
      function (json) {
        that.update.call(that, json);
      },
      function () {
        that.error.call(that, "Could not fetch data for model");
      }
    );

    return this;
  },
  fetchRequestName : function () {
    this.warn("Did not specify fetchRequestName in concrete Model");
    return "";
  },
  fetchRequestData : function () {
    this.warn("Did not specify fetchRequestData in concrete Model");
    return [];
  }

});
