window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

/*
Flyweight getter for Models/Collections.
Models can be got using require(name), where name is the name of the corresponing models.
Ensures that there is a single instance of the model (=flyweight functionality).
On top of that, if the required model is not yet given/loaded then it will be instantiated and
populated (calling fetch()).
*/
window.app.mvr.ModelManager = window.app.mvr.Extendable.extend({

  /*
  List of all managed models
  */
  models : {},

  /*
  Flyweight getter for Models/Collections, given an extrinsic name.
  In case the model is new, fetch() is called to populate it with data.
  */
  require : function(name) {
    if (this.nameModelStore[name] == undefined) {
      this.error("ModelManager: Tried requireing unknown model with name " + name);
    }
    if (this.models[name] == undefined) {
      this.models[name] = this.nameModelStore[name]()
        .new()
        .fetch();
    }
    return this.models[name];
  },

  /*
  ModelName to ModelClass store
  */
  nameModelStore : {
    "widgets" : function(){return window.app.collections.Widgets;},
    "pinActions" : function(){return window.app.collections.PinActions;},
  }

});
