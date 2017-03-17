window.app = window.app || {};
window.app.view = window.app.view || {};
window.app.view.header = window.app.view.header || {};
window.app.view.header.headerBtns = window.app.view.header.headerBtns || {};

window.app.view.header.headerBtns.HeaderBtnLogout = window.app.view.header.headerBtns.HeaderBtn.extend({
  model : {
    name : "logout",
    icon : "img/icon/logout.png"
  },

  clickRequests : [{
    selector : "",
    requestName : function() {
      return "Logout";
    },
    requestData : function() {
      return {};
    },
    modelNameToUpdate : function() {
      return "";
    },
    handler : function() {
      $(".login-section").removeClass("active");
    }
  }]
});
