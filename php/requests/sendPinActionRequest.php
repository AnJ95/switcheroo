<?php
include("requests/getPinsRequest.php");

class SendPinActionRequest extends Request {
    public function getResult($app, $requestData) {
      if (!isset($requestData['type'])) {
        $app->err("Could not perform SendPinActionRequest because action type was not specified");
      }



      switch ($requestData['type']) {
        case "toggle":
          $pin = intval($requestData['wPin']);
          pinWrite($pin, ($requestData['value'] == "true" ? 1 : 0));
          break;
        case "rgbled":
          var_dump($requestData['values']);
          pinPWM(intval($requestData['pins']['red']), floatval($requestData['values']['red']));
          pinPWM(intval($requestData['pins']['green']), floatval($requestData['values']['red']));
          pinPWM(intval($requestData['pins']['blue']), floatval($requestData['values']['blue']));
          break;
        case "pulse":
          $pin = intval($requestData['wPin']);
          pinWrite($pin, 0);
          usleep(100000);
          pinWrite($pin, 1);
          usleep(100000);
          pinWrite($pin, 0);
          break;
        default:
          $app->err("Could not perform SendPinActionRequest because action type \"" . $requestData['type'] . "\" is unknown");
          return NULL;
          break;
      }

      $getPinsRequest = new GetPinsRequest();
      return $getPinsRequest->getResult($app, []);
    }
}

?>
