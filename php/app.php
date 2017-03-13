<?php

include("auth.php");

class App
{

    private $config;

    private $authLevel = 0;


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

      // Try login in with cookie data
      $this->tryLogin("");
    }


    public function tryLogin($pwd) {
      $requiredHash = $this->config("webInterface.authHash");
      $hash = sha1($pwd);

      // if login via POST or COOKIE
      if ($hash == $requiredHash || (isset($_COOKIE["login"]) && $_COOKIE["login"] == $requiredHash)) {
        $this->doLogin();
        return true;
      }

      return false;
    }

    private function doLogin() {
      setcookie("login", $this->config("webInterface.authHash"), time() + 3600);
      $this->authLevel = 1;
    }


    public function auth() {
      return $this->authLevel;
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
