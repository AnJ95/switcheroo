
// Start login sequence after loading the whole page
// The login sequence will call initAfterLogin()
$(document).ready(function() {
  window.app.socket = io.connect();
  initLogin();
});

// Actual app init
function initAfterLogin () {

  // Instantiate ModelManager
  window.app.ModelManager = window.app.ModelManager || window.app.mvr.ModelManager.new();

  // Instantiate Wrapper
  window.wrapper = window.app.views.Wrapper
    .new($(".wrapper"))
    .renderInitial()

  //loadInfo();
  //initButtons();
  //initHeader();
  //window.setInterval(loadInfo, 3000);
}
