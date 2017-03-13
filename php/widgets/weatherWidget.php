<?php
class WeatherWidget extends Widget {
    private $app;

    public function getWidgetData($app) {
      $this->app = $app;

      // Retrieve API weather data and do some error handling
      $apiResult = $this->requestToAPI();
      if ($apiResult == NULL) {
        $app->err("Could not retrieve weather data from API");
      }
      if ($apiResult->query->results == NULL) {
        $app->err("Could not extract weater data from API result");
      }
      $channel = $apiResult->query->results->channel;

      $result = [
        "temperature" => $this->f2c($channel->item->condition->temp),
        "condition" => $channel->item->condition->code,
        "humidity" => $channel->atmosphere->humidity,
        "pressure" => $channel->atmosphere->pressure,
        "windSpeed" => $this->mph2kmh($channel->wind->speed),
        "forecast" => [],
      ];

      for ($i = 0; $i < 4; ++$i) {
        $item = $channel->item->forecast[$i];
        $result["forecast"][$i]["temperature"] = $this->f2c($item->low, 0) . "-" . $this->f2c($item->high, 0) . "&#176;C";
        $result["forecast"][$i]["condition"] = $item->code;
      }

      return $result;
    }

    private function requestToAPI() {
      return json_decode(file_get_contents("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" . str_replace(" ", "%20", $this->app->config("widgets.weather.geoLocation")) . "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"));
    }

    private function f2c($fahrenheit, $r = 1) {
      return round(($fahrenheit - 32) / 1.8, $r);
    }

    private function mph2kmh($mph, $r = 1) {
      return round(1.6093 * $mph, $r);
    }

}
?>
