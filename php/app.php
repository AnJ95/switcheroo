<?php

class App
{

    private $config;


    public static function err($text) {
      die("CRITICAL ERROR: " . $text);
    }


    // Constructor, that loads config file
    function __construct() {
      try {
        $this->config = json_decode(file_get_contents("../safe/config.json"));
      } catch (Exception $e) {
        App::err("Could not load config file: " . $e->getMessage());
      }
    }

    // Get config value by key or concatenation of keys, connected by "."
    // Calls method err() and returns NULL when config value could not be found
    public function config($keyQuery) {
        // split key query
        $keys = explode(".", $keyQuery);

        // recursively iterate over config to get value by key
        $currentConfig = $this->config;

        foreach ($keys as $key) {

          if (isset($currentConfig->$key)) {
            $currentConfig = $currentConfig->$key;
          } else {
            App::err("Could not get config value with keyQuery \"" . $keyQuery . "\" at key \"" . $key . "\"");
            return NULL;
          }
        }

        return $currentConfig;
    }
}

?>
