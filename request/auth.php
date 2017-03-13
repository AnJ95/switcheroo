<?php

require_once("../php/app.php");
$app = new App();


// if using login
if (isset($_POST["pwd"])) {
  if ($app->tryLogin($_POST["pwd"])) {
    die ('{"success" : true, "text" : "login successful"}');
  } else {
    die ('{"success" : false, "text" : "wrong credentials"}');
  }
}


?>
