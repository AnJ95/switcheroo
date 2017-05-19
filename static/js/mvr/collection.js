window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.Collection = window.app.mvr.Model.extend({

  /*
  Holds an assoc list of child Models.
  This is an additional storage to the json object saved in
  Model->json.
  */
  models : {},


  /*
  Updates internal structure from a given json.
  This is done by creating/updating child models.
  The child models are created using getModelClassByKey(modelName)
  and the top-level-keys of the json object as modelNames
  */
  update : function (json) {
    var that = this;
    $.each(json, function (modelName, modelJson) {
      if (that.models[modelName] === undefined) {
        that.models[modelName] = that.getModelClassByKey(modelName)
          .new()
          .update(modelJson, false);
      } else {
        that.models[modelName].update(modelJson, false);
      }
    });

    this.json = json;
    this.isPopulated = true;
    this.notifyObservers();

    // Do standard Model-update
    // window.app.mvr.Model.update.call(this, json);

    return this;
  },


  /*
  Calls each child models notifiyObservers additionally to the
  standard behavior.
  */
  notifyObservers : function () {
    // Do standard Model-notifyObservers
    window.app.mvr.Model.notifyObservers.call(this);

    // call each models notifyObservers
    $.each(this.models, function (modelName, model) {
      model.notifyObservers();
    });

    return this;
  },


  /*
  Getter for the internal models by name
  */
  getModel : function(modelName) {
    return this.models[modelName];
  },


  /*
  Decides which model to instantiate for each top-level-key
  in the updating json object.
  */
  getModelClassByKey : function(name) {
    return window.app.mvr.Model;
  }
});
