<?php



if (isset($_POST["logout"])) {
    setcookie("login", null, -1);
    setcookie("login", null, -1, "/");
    setcookie("login", null, -1, "/Switcheroo/");
    setcookie("login", null, -1, "/php/");
    setcookie("login", null, -1, "/Switcheroo/php/");
    die ('{"success" : true, "text" : "Logout"}');
}



?>
