window.app = window.app || {};
window.app.models = window.app.models || {};

window.app.models.PinAction = window.app.mvr.Model.extend({

  pinModel : undefined,

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
  },

  wPin : function() {
    return this.json.action.pin;
  },

  isOn : function () {
    return (this.pinModel != undefined && this.pinModel.isPopulated) ? this.pinModel.isOn() : false;
  },

  childModelInitialized : false,

  update : function (json) {
    window.app.mvr.Model.update.call(this, json);

    if (!this.childModelInitialized) {
      this.childModelInitialized = true;

      var pins = window.app.mvr.ModelManager.require("pins");
      var that = this;

      function attachChildModel () {
        that.pinModel = pins.getPinByWPin(that.wPin());
        //console.log("ATTACH");
        that.pinModel.attachObserver({
          // This happens whenever there are changes to this pin in the future
          notify : function() {
            that.notifyObservers();
          }
        })
      }

      if (pins.isPopulated) {
        attachChildModel();
        this.notifyObservers();
      } else {
        pins.attachObserver({
          notify : function() {
            attachChildModel.call(that)
          }
        });
      }
    }

    return this;
  }

});