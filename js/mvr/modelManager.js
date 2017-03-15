window.app = window.app || {};
window.app.mvr = window.app.mvr || {};

window.app.mvr.ModelManager = window.app.mvr.Extendable.extend({

  models : {},

  require : function(name) {

    if (this.models[name] == undefined) {
      this.models[name] = this.getModelByName(name)
        .new()
        .fetch();
    }
    return this.models[name];
  },

  getModelByName : function(name) {
    switch (name) {
      case "widgets":
        return window.app.collections.Widgets;
        break;
      default:
        this.error("ModelManager: Could not get Model/Collection with name " + name);
    }
  }

});
