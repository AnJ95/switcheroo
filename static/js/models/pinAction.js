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

  pinId : function() {
    return this.json.action.pin;
  },

  isOn : function () {
    return (this.pinModel !== undefined && this.pinModel.isPopulated) ? this.pinModel.isOn() : false;
  },
  pwm : function () {
    return (this.pinModel !== undefined && this.pinModel.isPopulated) ? this.pinModel.pwm() : 0;
  },

  childModelInitialized : false,

  // This pinAction will save several pinActions in this list in some cases
  subPinActions : {},

  update : function (json) {
    window.app.mvr.Model.update.call(this, json);

    var that = this;
    if (this.json.action.pins !== undefined) {
      $.each(this.json.action.pins, function (pinName, pinId) {
        that.subPinActions[pinName] = window.app.models.PinAction.new();
        that.subPinActions[pinName].update({
            "name" : pinName,
            "action" : {
              "type" : "rgbled",
              "pin" : pinId
            }
          });
      });

      return this;
    }

    if (!this.childModelInitialized) {
      this.childModelInitialized = true;

      var pins = window.app.mvr.ModelManager.require("pins");

      function attachChildModel () {
        that.pinModel = pins.getPinById(that.pinId());
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
