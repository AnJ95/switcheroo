<?php
include("piWidget.php");
include("weatherWidget.php");

abstract class Widget {
    public abstract function getWidgetData($app);

    public static function getWidgets() {
      return [
        "pi" => new PiWidget(),
        "weather" => new WeatherWidget(),
      ];
    }
}
?>
