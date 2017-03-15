<?php
class PiWidget extends Widget {
    private $app;

    public function getWidgetData($app) {
      $this->app = $app;

      return [
        "type" => "pi",
        "currentTime" => $this->getCurrentTime(),
        "currentDate" => $this->getCurrentDate(),
        "upTime" => $this->getUpTime(),
        "coreTemp" => $this->getCoreTemp()
      ];
    }

    private function getCurrentDate() {
      $date = trim(shell_exec('date +"%a %d.%m.%y"'));

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

}
?>
