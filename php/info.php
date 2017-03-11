<?php
error_reporting(E_ERROR);

include("auth.php");

function f2c($fahrenheit, $r = 1) {
  return round(($fahrenheit - 32) / 1.8, $r);
}

if (auth() < 1) {
  die ('{"success":false, "error":"No sufficient permissions"}');
}

$infoCurrentTime = trim(shell_exec('date +"%d.%m.%y %T"'));


$infoUpTime = trim(shell_exec("uptime --pretty"));
//$infoUpTime = "up 1 day, 29 minutes";

$infoUpTime = str_replace("up ", "", $infoUpTime);
$infoUpTime = str_replace(" years", "y", $infoUpTime);
$infoUpTime = str_replace(" year", "y", $infoUpTime);
$infoUpTime = str_replace(" weeks", "w", $infoUpTime);
$infoUpTime = str_replace(" week", "w", $infoUpTime);
$infoUpTime = str_replace(" days", "d", $infoUpTime);
$infoUpTime = str_replace(" day", "d", $infoUpTime);
$infoUpTime = str_replace(" hours", "h", $infoUpTime);
$infoUpTime = str_replace(" hour", "h", $infoUpTime);
$infoUpTime = str_replace(" minutes", "min", $infoUpTime);
$infoUpTime = str_replace(" minute", "min", $infoUpTime);
$infoUpTime = str_replace(",", "", $infoUpTime);

$result = shell_exec("vcgencmd measure_temp");
$result = explode("=", $result);
$result = $result[1];
$result = explode("'", $result);
$infoTemp = $result[0];

$jsonResult = json_decode(file_get_contents("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22karlsruhe%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"));


$info = array();

$info["success"] = true;

$info["info"] = array();

// Information about PI in general
$info["info"]["pi"] = array();
$info["info"]["pi"]["currentTime"] = $infoCurrentTime;
$info["info"]["pi"]["upTime"] = $infoUpTime;
$info["info"]["pi"]["coreTemp"] = $infoTemp;

//$info["info"]["pi"]["upTime"] = "2d 10h 37min";
//$info["info"]["pi"]["coreTemp"] = (45 + rand(0, 45)) . "";
$info["info"]["pi"]["currentTime"] = "16:39";
$info["info"]["pi"]["currentDate"] = "Do 2.3.2017";

// Information about weather

$info["info"]["weather"] = array();
$channel = $jsonResult->query->results->channel;
$info["info"]["weather"]["temperature"] = round(($channel->item->condition->temp - 32) / 1.8, 1) . "&#176;C";
$info["info"]["weather"]["condition"] = $channel->item->condition->code;
$info["info"]["weather"]["humidity"] = $channel->atmosphere->humidity . "%";
$info["info"]["weather"]["pressure"] = $channel->atmosphere->pressure . "mBar";
$info["info"]["weather"]["windSpeed"] = round(1.6093 * $channel->wind->speed, 1) . "kmh";

for ($i = 0; $i < 4; ++$i) {
  $item = $channel->item->forecast[$i];
  $info["info"]["weather"]["forecast"][$i]["temperature"] = f2c($item->low, 0) . "-" . f2c($item->high, 0) . "&#176;C";
  $info["info"]["weather"]["forecast"][$i]["condition"] = $item->code;
}

die (json_encode($info));



?>
