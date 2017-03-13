<?php

function pinWrite($pin, $write) {
  // TODO CHECK INPUT!
  shell_exec("gpio write " . $pin . " " . $write);
}

function pinRead($pin) {
  // TODO CHECK INPUT!
  return trim(shell_exec("gpio read " . $pin)) == "1";
}

?>
