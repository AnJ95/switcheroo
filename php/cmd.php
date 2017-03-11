<?php
include("auth.php");
include("pin.php");

if (auth() < 1) {
  die ('{"success":false, "error":"No sufficient permissions"}');
}

if (!isset($_POST['cmd']['type'])) {
  die ('{"success":false, "error":"No command supplied"}');
}


if ($_POST['cmd']['type'] == "toggle") {
  pinWrite($_POST['cmd']['pin'], ($_POST['cmd']['value'] == "true" ? 0 : 1));
}

if ($_POST['cmd']['type'] == "pulse") {
  pinWrite($_POST['cmd']['pin'], 0);
  usleep(10000);
  pinWrite($_POST['cmd']['pin'], 1);
  usleep(10000);
  pinWrite($_POST['cmd']['pin'], 0);
}

?>{"success":true}
