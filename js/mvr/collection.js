window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Collection = window.app.mvr.Model.extend({

  models : {},

  update : function (json) {
    // Do standard Model-update
    window.app.mvr.Model.update.call(this, json);

    // iterate over all jsonElements to call corresponding models update /
    var that = this;
    $.each(json, function (modelName, modelJson) {
      if (that.models[modelName] == undefined) {
        that.models[modelName] = that.getModelClassByKey()
          .new()
          .update(modelJson);
      } else {
        that.models[modelName].update(modelJson);
      }
    });

    return this;
  },

  notifiyObservers : function () {
    // Do standard Model-notifyObservers
    window.app.mvr.Model.update.call(this);

    // call each models notifiyObservers
    $.each(this.models, function (modelName, model) {
      model.notifiyObservers();
    });

    return this;
  },


  getModelClassByKey : function(name) {
    return window.app.mvr.Model;
  }


});
