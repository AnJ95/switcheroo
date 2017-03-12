<?php

include("app.php");
include("auth.php");

if (auth() < 1) {
  die ('{"success":false, "error":"No sufficient permissions"}');
}

?>
[
{
  "name" : "toggleLed",
  "niceName" : "LED",
  "color" : "#e58c32",
  "icon" : "img/icon/toggleLed.png",
  "action" :
  {
  "type" : "toggle",
  "pin" : "29",
  "default" : <?php echo ((trim(shell_exec("gpio read 29")) == "1") ? "true" : "false");?>
  }
},
{
  "name" : "toggleLed",
  "niceName" : "LED",
  "color" : "#e58c32",
  "icon" : "img/icon/toggleLed.png",
  "action" :
  {
  "type" : "toggle",
  "pin" : "29",
  "default" : <?php echo ((trim(shell_exec("gpio read 29")) == "1") ? "true" : "false");?>
  }
},
{
  "name" : "toggleLed",
  "niceName" : "LED",
  "color" : "#e58c32",
  "icon" : "img/icon/toggleLed.png",
  "action" :
  {
  "type" : "toggle",
  "pin" : "29",
  "default" : <?php echo ((trim(shell_exec("gpio read 29")) == "1") ? "true" : "false");?>
  }
},
{
  "name" : "toggleLed",
  "niceName" : "LED",
  "color" : "#e58c32",
  "icon" : "img/icon/toggleLed.png",
  "action" :
  {
  "type" : "toggle",
  "pin" : "29",
  "default" : <?php echo ((trim(shell_exec("gpio read 29")) == "1") ? "true" : "false");?>
  }
}
]
