window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.model = window.app.model || {};

window.app.view.ExampleView = window.app.mvr.View.extend({
  template : function (model) {
    return "<div class='changeMe'>This is the templates content.</div>";
  },
  renderUpdate : function () {
    this.$el.find(".changeMe").html(this.model.toString());
  }
});
window.app.model.ExampleModel = window.app.mvr.Model.extend({
  fetchRequestName : function() {return "GetWidgets";},
  fetchRequestData : function() {return [];}
});

$(document).ready(function() {
  /*
  var exampleView = window.app.view.ExampleView
    .new($(".playground"))
    .renderInitial();

  var exampleModel = window.app.model.ExampleModel
    .new()
    .attachObserver(exampleView)
    .fetch();

  $("body").html(html);

  //exampleView.renderInitial({});
  */
});
