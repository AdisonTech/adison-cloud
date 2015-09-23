# Adison Cloud

## What is it?

Adison cloud is a Meteor web application that provides a user interface to an IOT system.

![Screenshot](https://raw.githubusercontent.com/AdisonTech/adison-cloud/master/doc/screenshot.png "Screenshot")

## Why

This project aims to provide a modern automation system that uses the latest technologies (Meteor/nodejs) and is easy to customize and extend for custom applications.  This should be a good starting point for developers/makers who want a  more flexible home automation system than the current line of commercial offererings.  It is also designed to work well in industrial automation settings where you might need to monitor and control a number of systems remotely.  

## Installation

* [install](https://www.meteor.com/install) Meteor
* git clone https://github.com/AdisonTech/adison-cloud.git
* cd adison-cloud
* meteor
* install and configure the [Adison Gateway](https://github.com/AdisonTech/adison-gateway) to talk to your cloud instance

## Architecture

There are 3 main components:

1. Cloud - Meteor application that provides UI to system, and handles notifications (email/text)
2. Nodes - sensors and actuators (temp sensor, light bulbs, switches, etc)
2. Gateway - communicates between cloud and nodes and runs local algorithms/rules

![Architecture](https://raw.githubusercontent.com/AdisonTech/adison-cloud/master/doc/architecture.png "Adison Architecture")

The Cloud and Gateway communicate using Meteor DDP.  This is already built into meteor, and allows us efficient real-time communication to a gateway behind a firewall using standard HTTP ports.  

## Principles

* leverage latest mainstream, well-understood technologies (Meteor, React, nodejs, material-ui, JS promises, etc).
* keep it simple to set up (minimize number of separate components services required to make the system work).  For this reason we don't have a separate MQTT server, etc.
* not targetted at the mainstream home automation market (there are already plenty of solutions there), but rather developers/makers who want an open, more flexible system.
* assume users can write code if needed (don't try to create a GUI to configure every possible permutation -- focus on solid base technologies that users can extend as needed).

## Status

We are just getting started.  Currently, Wemo Link (light bulbs) and Wemo Insight nodes are supported.  See [Issues](https://github.com/AdisonTech/adison-cloud/issues) for status on features in progress.

## License 

MIT.  See the file named LICENSE.



