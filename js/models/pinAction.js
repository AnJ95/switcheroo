window.app = window.app || {};
window.app.models = window.app.models || {};

window.app.models.PinAction = window.app.mvr.Model.extend({

  pinActionType : function() {
    return this.json.action.type;
  },

  color : function() {
    return "rgb(" + this.json.color[0] + "," + this.json.color[1] + "," + this.json.color[2] + ")";
  },
  darkColor : function() {
    return "rgb(" + Math.round(this.json.color[0]*0.8) + "," + Math.round(this.json.color[1]*0.8) + "," + Math.round(this.json.color[2]*0.8) + ")"
  },
  icon : function() {
    return this.json.icon
  }

});
