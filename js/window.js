function openWindow(content) {
  $(".window .window__inner").html(content);
  $(".window").addClass("active");
}

function closeWindow() {
  $(".window").removeClass("active");
}
