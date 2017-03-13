<?php

// Load app
require_once("../php/app.php");
$app = new App();

// Check authentification
if ($app->auth() < 1) {
  die ('{"success":false, "error":"No sufficient permissions"}');
}

// Load super Request class and its extensions
include("../php/requests/request.php");

// Get Requests name
if (!isset($_POST['requestName'])) {
  $app->err("Did not specifiy a requestName");
}
$requestName = $_POST['requestName'];

// Get corresponding Request
$requestHandler = Request::getRequestByName($requestName);
if ($requestHandler === NULL) {
  $app->err("Could not find request with name \"" . $requestName . "\"");
}

// Get requestData / default
$requestData = array();
if (isset($_POST['requestData'])) {
  $requestData = $_POST['requestData'];
}

// Call getResult with optional RequestData
$jsonResult = $requestHandler->getResult($app, $requestData);
if ($jsonResult === NULL) {
  $app->err("Could not execute \"" . $requestName . "\"; result was NULL");
}

// Return result
die ('{"success":true, "result":' . json_encode($jsonResult) . '}');

?>
