window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pinActions = window.app.views.pinActions || {};

window.app.views.pinActions.PinActionRGB = window.app.mvr.View.extend({
  template : window.app.templates.pinActions.pinActionRGB,

  renderInitial : function() {
    window.app.mvr.View.renderInitial.call(this);

    var that = this;

    if (window.DeviceOrientationEvent) {
      console.log("Added DeviceOrientationEvent", this.$el);

      this.$el.find(".btn--rgb-static .btn--rgb__indicator").on("mousedown touchstart", function(e) {
        that.motionStates[that.currentMotionStateName].down.call(that, "static");
        e.preventDefault();
      });
      this.$el.find(".btn--rgb-dynamic .btn--rgb__indicator").on("mousedown touchstart", function(e) {
        that.motionStates[that.currentMotionStateName].down.call(that, "dynamic");
        e.preventDefault();
      });
      this.$el.find(".btn--rgb__indicator").on("mouseup touchend", function(e) {
        that.motionStates[that.currentMotionStateName].up.call(that);
        e.preventDefault();
      });
      window.addEventListener("deviceorientation", function motion(event){
        that.motionStates[that.currentMotionStateName].motionEvent.call(that, event);
      }, false);

    } else {
      console.log("DeviceOrientationEvent is not supported");
    }
  },

  renderUpdate : function() {
    function getCurr(colorName) {
      return Math.round(this.model.subPinActions[colorName].pwm() * 255);
    }
    var that = this;

    var col = "rgba("+getCurr.call(this,"red")+","+getCurr.call(this,"green")+","+getCurr.call(this,"blue")+",1)";
    this.$el.find(".btn--rgb-static .btn--rgb__indicator").css("background-color", col);
  },

  currentMotionStateName : "idle",

  motionStates : {
    idle : {
      down : function (nextName) {
        this.currentMotionStateName = nextName;
        // reset every pwm value to 0
        $.each(that.model.subPinActions, function(color, subPinAction) {
           subPinAction.pinModel.pwm(0);
        });
      },
      up : function () {},
      motionEvent : function (e) {}
    },
    static : {
      down : function () {},
      up : function () {
        this.currentMotionStateName = "idle";
      },
      motionEvent : function (e) {

        //console.log(e);
        var vals = {
          red : (e.alpha / 360),
          green : ((e.beta + 180) / 360),
          blue : ((e.gamma + 90) / 180)
        };

        var that = this;

        $.each(this.model.subPinActions, function(pinName, pin) {
          var pinModel = that.model.subPinActions[pinName].pinModel;
          //var oldPwm = pinModel.pwm();

          //var delta = vals[pinName] * e.interval * 0.01;

          pinModel.pwm(vals[pinName]);
        });

        that.model.notifyObservers();
        that.$el.find(".btn--rgb__invisible-trigger").trigger("click");

      }
    }
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
