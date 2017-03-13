<?php

class LogoutRequest extends Request {
    public function getResult($app, $requestData) {
      setcookie("login", null, -1);
      setcookie("login", null, -1, "/");
      setcookie("login", null, -1, "/Switcheroo/");
      setcookie("login", null, -1, "/php/");
      setcookie("login", null, -1, "/Switcheroo/php/");

      return [];
    }
}

?>
