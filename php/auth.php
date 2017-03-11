<?php

$AUTH_LEVEL = 0;

function auth() {
  global $AUTH_LEVEL;

  return $AUTH_LEVEL;
}

function correctHash ($hash) {
  if ($hash == sha1("down a down a right down right down")) {
    return true;
  }
  return false;
}

if (isset($_POST["logout"])) {
    setcookie("login", null, -1);
    setcookie("login", null, -1, "/");
    setcookie("login", null, -1, "/Switcheroo/");
    setcookie("login", null, -1, "/php/");
    setcookie("login", null, -1, "/Switcheroo/php/");
    die ('{"success" : true, "text" : "Logout"}');
}

// if using login
if (isset($_POST["pwd"])) {
  if (correctHash(sha1($_POST["pwd"]))) {
    setcookie("login", sha1($_POST["pwd"]), time() + 3600);
    die ('{"success" : true, "text" : "POST-Authentication"}');
  }

  if (isset($_COOKIE["login"]) && correctHash($_COOKIE["login"])) {
    //setcookie("login", $_COOKIE["login"], time() + 3600, "/");
    die ('{"success" : true, "text" : "COOKIE-Authentication"}');
  } else {
    die ('{"success" : false, "error" : "Wrong password"}');
  }
}

// otherwise
if (isset($_COOKIE["login"])) {
  if (correctHash($_COOKIE["login"])) {
    $AUTH_LEVEL = 1;
  }
}


?>
