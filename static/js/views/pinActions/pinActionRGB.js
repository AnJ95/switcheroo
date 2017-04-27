window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pinActions = window.app.views.pinActions || {};

window.app.views.pinActions.PinActionRGB = window.app.mvr.View.extend({
  template : window.app.templates.pinActions.pinActionRGB,

  renderInitial : function() {
    window.app.mvr.View.renderInitial.call(this);

    var that = this;
    $.each(this.model.subPinActions, function(pinName, pin) {

      var $third = that.$el.find(".btn--rgb-" + pinName);
      var $handle = $third.find(".btn--rgb__handle");

      $handle.draggable({
        addClasses: false,
        containment : $third,
        axis: "y",
        drag: function(e, ui) {
          var offset = $(this).offset();
          var max = parseInt($third.innerHeight()) - $handle.outerHeight();
          var curr = $(this).position().top - $(this).parent().position().top;
          var pwm = (1 - curr/max);

          // change Model TODO let server send that
          that.model.subPinActions[pinName].pinModel.pwm(pwm);

          // console.log(that.model.subPinActions.red.pinModel.pwm(), that.model.subPinActions.green.pinModel.pwm(), that.model.subPinActions.blue.pinModel.pwm());

          that.$el.find(".btn--rgb__invisible-trigger").trigger("click");
        }
      });
    });
  },

  renderUpdate : function() {
    var that = this;

    $.each(this.model.subPinActions, function(pinName, subPin) {
      var $third = that.$el.find(".btn--rgb-" + pinName);
      var $handle = $third.find(".btn--rgb__handle");

      var col;
      switch (pinName) {
        case "red":
          col = "rgba(255, 0, 0, " + subPin.pwm() + ")";
          break;
        case "green":
          col = "rgba(0, 255, 0, " + subPin.pwm() + ")";
          break;
        case "blue":
          col = "rgba(0, 0, 255, " + subPin.pwm() + ")";
          break;
      }

      $third.css("background-color", col);
      $handle.css("top", (($third.innerHeight() - $handle.outerHeight())  * (1 - subPin.pwm())) + "px");
    });
  },

  clickRequests : [{
    selector : ".btn--rgb__invisible-trigger",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        pins : this.model.json.action.pins,
        values : {
          red : this.model.subPinActions.red.pwm(),
          green : this.model.subPinActions.green.pwm(),
          blue : this.model.subPinActions.blue.pwm()
        }
      };
    },
    modelNameToUpdate : function() {
      return ""; // no update, as we update model client-side TODO
    },
  }]

});
