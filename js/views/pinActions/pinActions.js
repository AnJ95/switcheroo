window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.pinActions = window.app.views.pinActions || {};

window.app.views.pinActions.PinActions = window.app.mvr.CompositeView.extend({
  template : window.app.templates.pinActions.pinActions,

  requireModel : "pinActions",

  childrenParentSelector : ".flow",

  getChildrenViewClassByModel : function(model) {
    switch(model.pinActionType()) {
      case "toggle":
        return window.app.views.pinActions.PinActionToggle;
        break;
      case "pulse":
        return window.app.views.pinActions.PinActionPulse;
        break;
    }
    return undefined;
  }
});
