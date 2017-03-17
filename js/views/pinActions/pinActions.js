window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.pinActions = window.app.view.pinActions || {};

window.app.view.pinActions.PinActions = window.app.mvr.CompositeView.extend({
  template : window.app.templates.pinActions.pinActions,

  requireModel : "pinActions",

  childrenParentSelector : ".flow",

  getChildrenViewClassByModel : function(model) {
    switch(model.pinActionType()) {
      case "toggle":
        return window.app.view.pinActions.PinActionToggle;
        break;
      case "pulse":
        return window.app.view.pinActions.PinActionPulse;
        break;
    }
    return undefined;
  }
});
