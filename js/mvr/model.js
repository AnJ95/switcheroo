window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Model = window.app.mvr.Observable.extend({
  json : {},
  update : function (json) {
    this.json = json;
    this.notifyObservers();
  },

  fetch : function () {
    var that = this;
    request(
      this.fetchRequestName(),
      this.fetchRequestData(),
      function () {
        that.update.call(that);
      },
      function () {
        that.error.call(that, "Could not fetch data for model");
      }
    );
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
