<?php

include("../php/pin.php");

class GetPinActionsRequest extends Request {
    public function getResult($app, $requestData) {
      $buttons = $app->config("pinActions");

      // set default values
      foreach($buttons as $i => $button) {
        if ($button->action->type == "toggle") {
          $button->action->default = (pinRead($button->action->pin) ? true : false);
        }
      }

      return $buttons;
    }
}

?>
