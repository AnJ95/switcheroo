window.app = window.app || {};
window.app.model = window.app.model || {};

window.app.model.Model = window.app.mvr.Obervable.extend({
  json : {},
  update : function (json) {
    this.json = json;
    //console.warn("Tried to update a model, but did not specify the concrete update() method. json was: ", json);
  }
});
