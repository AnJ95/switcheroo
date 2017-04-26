window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pinActions = window.app.views.pinActions || {};

window.app.views.pinActions.PinActionPulse = window.app.mvr.View.extend({
  template : window.app.templates.pinActions.pinActionPulse,

  renderUpdate : function() {
    // var that = this;
    // that.$el.toggleClass("btn--active", that.model.isOn());
  },

  clickRequests : [{
    selector : "",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        pin : this.model.pinId()
      }
    },
    modelNameToUpdate : function() {
      return "pins";
    },
  }]

});
