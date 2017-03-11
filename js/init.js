
// Start login sequence after loading the whole page
// The login sequence will call initAfterLogin()
$(document).ready(function() {
  initLogin();
});

// Actual app init
function initAfterLogin () {
  loadInfo();
  initButtons();
  initHeader();
  //window.setInterval(loadInfo, 3000);
}
