window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pinActions = window.app.views.pinActions || {};

window.app.views.pinActions.PinActionRGB = window.app.mvr.View.extend({
  template : window.app.templates.pinActions.pinActionRGB,

  renderInitial : function() {
    window.app.mvr.View.renderInitial.call(this);

    var that = this;

    if (window.DeviceOrientationEvent) {

      $.each(["static", "dynamic", "off", "red", "green", "blue"], function (i, name) {
        that.$el.find(".btn--rgb-" + name +" .btn--rgb__indicator").on("mousedown touchstart", function(e) {
          that.motionStates[that.currentMotionStateName].down.call(that, name);
          e.preventDefault();
          e.stopPropagation();
        });
      });


      this.$el.find(".btn--rgb__indicator").on("mouseup touchend", function(e) {
        that.motionStates[that.currentMotionStateName].up.call(that);
        e.preventDefault();
        e.stopPropagation();
      });
      
      window.addEventListener("deviceorientation", function motion(event){
        that.motionStates[that.currentMotionStateName].orientationEvent.call(that, event);
      }, false);

    } else {
      console.log("DeviceOrientationEvent is not supported");
    }
  },

  renderUpdate : function() {
    // console.log("CHANGE");
    // function getCurr(colorName) {
    //   return Math.round(this.model.subPinActions[colorName].pwm() * 255);
    // }
    // var that = this;
    //
    // var col = "rgba("+getCurr.call(this,"red")+","+getCurr.call(this,"green")+","+getCurr.call(this,"blue")+",1)";
    // this.$el.find(".btn--rgb-static .btn--rgb__indicator").css("background-color", col);
    //
    // $("header").css("background-color", col);
  },

  currentMotionStateName : "idle",

  getOrientationData : function(e) {
    return {
      red : (e.alpha / 360),
      green : ((e.beta + 180) / 360),
      blue : ((e.gamma + 90) / 180)
    };
  },

  getRelativeOrientation : function(initial, now) {
    var result = {};
    $.each(["red", "green", "blue"], function (i, col) {
      var dist = 2 * Math.abs(now[col] - initial[col]);
      result[col] = Math.min(dist, 1 - dist);
    });
    return result;
  },

  motionStates : {
    idle : {
      down : function (nextName) {
        this.currentMotionStateName = nextName;
        this.motionStates[this.currentMotionStateName].down.call(this);
      },
      up : function () {},
      orientationEvent : function (e) {}
    },

    static : {
      down : function () {
        // reset every pwm value to 0
        $.each(this.model.subPinActions, function(color, subPinAction) {
           subPinAction.pinModel.pwm(0);
        });

        this.initial = true;
      },
      up : function () {
        this.$el.find(".trigger-done").trigger("click");
        this.currentMotionStateName = "idle";
      },
      orientationEvent : function (e) {
        // get initial orientation once
        if (this.initial) {
          this.initialOrientation = this.getOrientationData(e);
          this.initial = false;
        }

        var now = this.getOrientationData(e);

        var relative = this.getRelativeOrientation(this.initialOrientation, now);

        var that = this;
        $.each(this.model.subPinActions, function(pinName, pin) {
          var pinModel = that.model.subPinActions[pinName].pinModel;
          pinModel.pwm(relative[pinName]);
        });

        that.$el.find(".trigger-change").trigger("click");
      }
    },

    dynamic : {
      down : function (nextName) {},
      up : function () {
        this.$el.find(".trigger-done").trigger("click");
        this.currentMotionStateName = "idle";
      },
      orientationEvent : function (e) {}
    },

    off : {
      down : function (nextName) {
        // reset every pwm value to 0
        $.each(this.model.subPinActions, function(color, subPinAction) {
           subPinAction.pinModel.pwm(0);
        });

        this.$el.find(".trigger-change").trigger("click");
      },
      up : function () {
        this.$el.find(".trigger-done").trigger("click");
        this.currentMotionStateName = "idle";
      },
      orientationEvent : function (e) {}
    },

    red : {
      down : function (nextName) {
        this.initial = true;
      },
      up : function () {
        this.$el.find(".trigger-done").trigger("click");
        this.currentMotionStateName = "idle";
      },
      orientationEvent : function (e) {
        // get initial orientation once
        if (this.initial) {
          this.initialOrientation = this.getOrientationData(e);
          this.initial = false;
        }

        var now = this.getOrientationData(e);
        var relative = this.getRelativeOrientation(this.initialOrientation, now);

        this.model.subPinActions.red.pinModel.pwm(relative.green);

        this.$el.find(".trigger-change-red").trigger("click");
      }
    },

    green : {
      down : function (nextName) {
        this.initial = true;
      },
      up : function () {
        this.$el.find(".trigger-done").trigger("click");
        this.currentMotionStateName = "idle";
      },
      orientationEvent : function (e) {
        // get initial orientation once
        if (this.initial) {
          this.initialOrientation = this.getOrientationData(e);
          this.initial = false;
        }

        var now = this.getOrientationData(e);
        var relative = this.getRelativeOrientation(this.initialOrientation, now);

        this.model.subPinActions.green.pinModel.pwm(relative.green);

        this.$el.find(".trigger-change-green").trigger("click");
      }
    },

    blue : {
      down : function (nextName) {
        this.initial = true;
      },
      up : function () {
        this.$el.find(".trigger-done").trigger("click");
        this.currentMotionStateName = "idle";
      },
      orientationEvent : function (e) {
        // get initial orientation once
        if (this.initial) {
          this.initialOrientation = this.getOrientationData(e);
          this.initial = false;
        }

        var now = this.getOrientationData(e);
        var relative = this.getRelativeOrientation(this.initialOrientation, now);

        this.model.subPinActions.blue.pinModel.pwm(relative.green);

        this.$el.find(".trigger-change-blue").trigger("click");
      }
    }
  },


  clickRequests : [{
    selector : ".trigger-change",
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
    }
  },
  {
    selector : ".trigger-change-red",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        pins : this.model.json.action.pins,
        values : {
          red : this.model.subPinActions.red.pwm()
        }
      };
    },
    modelNameToUpdate : function() {
      return ""; // no update, as we update model client-side TODO
    }
  },
  {
    selector : ".trigger-change-green",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        pins : this.model.json.action.pins,
        values : {
          green : this.model.subPinActions.green.pwm()
        }
      };
    },
    modelNameToUpdate : function() {
      return ""; // no update, as we update model client-side TODO
    }
  },
  {
    selector : ".trigger-change-blue",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        pins : this.model.json.action.pins,
        values : {
          blue : this.model.subPinActions.blue.pwm()
        }
      };
    },
    modelNameToUpdate : function() {
      return ""; // no update, as we update model client-side TODO
    }
  },
  {
    selector : ".trigger-done",
    requestName : function() {
      return "SendPinAction";
    },
    requestData : function() {
      return {
        type : this.model.pinActionType(),
        pins : this.model.json.action.pins,
        done : true
      };
    },
    modelNameToUpdate : function() {
      return ""; // no update, as we update model client-side TODO
    }
  }]

});
