window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.model = window.app.model || {};

window.app.view.ExampleView = window.app.mvr.View.extend({
  template : function (model) {
    return "This is the templates content.";
  }
});
window.app.model.ExampleModel = window.app.mvr.Model.extend({
  template : function (model) {
    return "This is the templates content.";
  }
});

$(document).ready(function() {
  var exampleView = window.app.view.ExampleView
    .new($(".playground"))
    .renderInitial();

  var exampleModel = window.app.model.ExampleModel
    .new();

  //exampleView.renderInitial({});
});
