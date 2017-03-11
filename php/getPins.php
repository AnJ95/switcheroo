<?php

include("auth.php");

if (auth() < 1) {
  die ('{"success":false, "error":"No sufficient permissions"}');
}

$result = shell_exec("gpio readall");
$result = "+-----+-----+---------+------+---+---Pi 3---+---+------+---------+-----+-----+\n| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |\n+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+\n|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |\n|   2 |   8 |   SDA.1 |   IN | 1 |  3 || 4  |   |      | 5v      |     |     |\n|   3 |   9 |   SCL.1 |   IN | 1 |  5 || 6  |   |      | 0v      |     |     |\n|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |\n|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |\n|  17 |   0 | GPIO. 0 |  OUT | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |\n|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |\n|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |\n|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |\n|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |\n|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 0 | IN   | GPIO. 6 | 6   | 25  |\n|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |\n|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |\n|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |\n|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |\n|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |\n|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |\n|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |\n|  26 |  25 | GPIO.25 |   IN | 0 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |\n|     |     |      0v |      |   | 39 || 40 | 0 | OUT  | GPIO.29 | 29  | 21  |\n+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+\n| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |\n+-----+-----+---------+------+---+---Pi 3---+---+------+---------+-----+-----+\n";


$d = array(array(), array());

$lines = explode("\n", $result);
for ($i = 3; $i <= 22; $i++) {
  $line = $lines[$i];

  $l = array();
  $l["id"] = trim(substr($line, 9, 2));
  $l["name"] = trim(substr($line, 14, 7));
  $l["dir"] = trim(substr($line, 25, 3));
  $l["val"] = trim(substr($line, 31, 1));
  $d[0][] = $l;

  $l = array();
  $l["id"] = trim(substr($line, 67, 2));
  $l["name"] = trim(substr($line, 57, 7));
  $l["dir"] = trim(substr($line, 50, 3));
  $l["val"] = trim(substr($line, 46, 1));
  $d[1][] = $l;

}


die ('{"success":true, "text":' . json_encode($d) . '}');


?>
