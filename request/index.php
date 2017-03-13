<?php

require_once("../php/app.php");
$app = new App();

if ($app->auth() < 1) {
  die ('{"success":false, "error":"No sufficient permissions"}');
}






?>
