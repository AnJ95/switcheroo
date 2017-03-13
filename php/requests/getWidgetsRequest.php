<?php

include("../php/widgets/widget.php");

class GetWidgetsRequest extends Request {

    private $app;

    public function getResult($app, $requestData) {

      $result = [];

      foreach (Widget::getWidgets() as $widgetName => $widget) {
          $result[$widgetName] = $widget->getWidgetData($app);
      }

      return $result;
    }



}

?>
