window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pinActions = window.app.views.pinActions || {};

window.app.views.pinActions.PinActionToggle = window.app.mvr.View.extend({
  template : window.app.templates.pinActions.pinActionToggle,

  renderUpdate : function() {
    var that = this;
    that.$el.toggleClass("btn--active", that.model.isOn());

    //console.log(this.clickRequest.requestData.call(this));
  },

  clickRequests : [{
    selector : "",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        wPin : this.model.wPin(),
        value : !this.model.pinModel.isOn()
      }
    },
    modelNameToUpdate : function() {
      return "pins";
    },
  }]

});