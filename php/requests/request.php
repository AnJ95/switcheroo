<?php

include("getPinActionsRequest.php");
include("getPinsRequest.php");
include("getWidgetsRequest.php");
include("sendPinActionRequest.php");

abstract class Request {
    public abstract function getResult($app, $requestData);

    public static function getRequestByName($requestName) {
      switch ($requestName) {
        case "GetPinActions":
        case "GetPins":
        case "GetWidgets":
        case "SendPinAction":
          $className = $requestName . "Request";
          return new $className;
        break;

        default:
          return NULL;
          break;
      }

      return NULL;
    }
}

 ?>
