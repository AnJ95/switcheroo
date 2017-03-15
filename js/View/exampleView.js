window.app = window.app || {};
window.app.view = window.app.view || {};

window.app.view.ExampleView = window.app.view.View.extend({
  template : function (model) {
    return "This is the templates content.";
  }
});



$(document).ready(function() {
  var exampleView = window.app.view.ExampleView
    .new($(".playground"))
    .renderInitial({});

  //exampleView.renderInitial({});
});
