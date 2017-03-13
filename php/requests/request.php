<?php

include("pinAction.php");

abstract class Request {
    public abstract function getResult($app, $requestData);

    public static function getRequestByName($requestName) {
      return new pinAction();
    }
}

 ?>
