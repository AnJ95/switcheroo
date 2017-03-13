# Switcheroo

![Switcheroo](https://github.com/AnJ95/switcheroo/blob/master/img/favicon.png)

## Introduction
A web interface, aiming to make a Raspberry Pi the center of your own SmartHome, controlled from your mobile phone.

## Technologies
Functional Core is a [apache php server](https://httpd.apache.org/) and [wiringPi](http://wiringpi.com/) for pin access.

The interface is a plain HTML/CSS/JavaScript web app using only [jQuery](https://jquery.com/).


## Setup
* Install [Apache and PHP](https://www.raspberrypi.org/documentation/remote-access/web-server/apache.md)
* Install [WiringPi](http://wiringpi.com/download-and-install/)
* Clone this repository to */var/www/Switcheroo* or similar
* Modifiy php/config.json
* In your local network, go to the website *[Your PI's IP]*/Switcheroo
* Enter the password *down, a, down, a, right, down, right, down* to get access


## User warning
This interface is **NOT SAFE**. It involves direct shell access via php (shell and php are words that should never occur in the same sentence). Since this project is fun-only I am probably never going to make it fully safe.

Here are some things you can do to improve the security never the less:
* Use SHTTP
* Don't put your webserver online, only use the local network
* Update your PHP and check your PHP settings!
