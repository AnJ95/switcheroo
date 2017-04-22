<?php
include("requests/getPinsRequest.php");

class SendPinActionRequest extends Request {
    public function getResult($app, $requestData) {
      if (!isset($requestData['type'])) {
        $app->err("Could not perform SendPinActionRequest because action type was not specified");
      }

      $pin = intval($requestData['wPin']);

      switch ($requestData['type']) {
        case "toggle":
          pinWrite($pin, ($requestData['value'] == "true" ? 1 : 0));
          break;
        case "pulse":
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
