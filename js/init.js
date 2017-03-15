
// Start login sequence after loading the whole page
// The login sequence will call initAfterLogin()
$(document).ready(function() {
  initLogin();
});

// Actual app init
function initAfterLogin () {

  window.app.view.Wrapper
    .new($(".wrapper"))
    .renderInitial();


  loadInfo();
  initButtons();
  initHeader();
  window.setInterval(loadInfo, 3000);
}
