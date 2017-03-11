<?php

function pinWrite($pin, $write) {
  shell_exec("gpio write " . $pin . " " . $write);
}

?>
