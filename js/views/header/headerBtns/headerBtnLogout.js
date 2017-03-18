window.app = window.app || {};
window.app.views = window.app.views || {};
window.app.views.header = window.app.views.header || {};
window.app.views.header.headerBtns = window.app.views.header.headerBtns || {};

window.app.views.header.headerBtns.HeaderBtnLogout = window.app.views.header.headerBtns.HeaderBtn.extend({
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
      document.location.reload();
    }
  }]
});
