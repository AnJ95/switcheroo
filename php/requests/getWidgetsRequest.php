<?php

class GetWidgetsRequest extends Request {

    private $app;

    public function getResult($app, $requestData) {
      $this->app = $app;

      // TODO MODULARIZE ME!
      $channel = $this->getWeatherInformation()->query->results->channel;

      $result = [
        "pi" => [
          "currentTime" => $this->getCurrentTime(),
          "currentDate" => $this->getCurrentDate(),
          "upTime" => $this->getUpTime(),
          "coreTemp" => $this->getCoreTemp()
        ],
        "weather" => [
          "temperature" => $this->f2c($channel->item->condition->temp),
          "condition" => $channel->item->condition->code,
          "humidity" => $channel->atmosphere->humidity,
          "pressure" => $channel->atmosphere->pressure,
          "windSpeed" => $this->mph2kmh($channel->wind->speed),
          "forecast" => [],
        ]
      ];

      for ($i = 0; $i < 4; ++$i) {
        $item = $channel->item->forecast[$i];
        $result["weather"]["forecast"][$i]["temperature"] = $this->f2c($item->low, 0) . "-" . $this->f2c($item->high, 0) . "&#176;C";
        $result["weather"]["forecast"][$i]["condition"] = $item->code;
      }

      return $result;
    }

    private function getCurrentDate() {
      $date = trim(shell_exec('date +"%a %d.%m.%Y"'));

      // error handling
      if ($date == "") {
        $date = "Mon 00.00.0000";
        $this->app->warn("Could not get date via command");
      }

      return $date;
    }

    private function getCurrentTime() {
      $time = trim(shell_exec('date +"%H:%M"'));

      // error handling
      if ($time == "") {
        $time = "00:00";
        $this->app->warn("Could not get time via command");
      }

      return $time;
    }

    private function getUpTime() {
      $upTime = trim(shell_exec("uptime --pretty"));

      // error handling
      if ($upTime == "") {
        $upTime = "up 0 minutes";
        $this->app->warn("Could not get uptime via command");
      }

      return str_replace(
        array("up ", " years", " year", " months", " month", " weeks", " week", " days", " day", " hours", " hour", " minutes", " minute", ","),
        array("", "y", "y", "m", "m", "w", "w", "d", "d", "h", "h", "min", "min", ""),
        $upTime
      );
    }

    private function getCoreTemp() {
      $coreTemp = shell_exec("vcgencmd measure_temp");

      // error handling
      if ($coreTemp == "") {
        $coreTemp = "temp=0'C";
        $this->app->warn("Could not get coreTemp via command");
      }

      $coreTemp = explode("=", $coreTemp);
      $coreTemp = $coreTemp[1];
      $coreTemp = explode("'", $coreTemp);
      return $coreTemp[0];
    }

    private function getWeatherInformation() {
      return json_decode(file_get_contents("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22karlsruhe%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"));
    }

    private function f2c($fahrenheit, $r = 1) {
      return round(($fahrenheit - 32) / 1.8, $r);
    }

    private function mph2kmh($mph, $r = 1) {
      return round(1.6093 * $mph, $r);
    }
}

?>
