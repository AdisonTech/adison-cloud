# Adison Cloud

## What is it?

Adison cloud is a Meteor web application that provides a user interface to an IOT system.

![Screenshot](https://raw.githubusercontent.com/AdisonTech/adison-cloud/master/doc/screenshot.png "Screenshot")

## Why

This project aims to provide a modern automation system that uses the latest technologies (Meteor/nodejs) and is easy to customize and extend for custom applications.  This should be a good starting point for developers/makers who want a  more flexible home automation system than the current line of commercial offererings.  It is also designed to work well in industrial automation settings where you might need to monitor and control a number of systems remotely.  

## Installation

* [install](https://www.meteor.com/install) Meteor
* git clone https://github.com/AdisonTech/adison-cloud.git or [download](https://github.com/AdisonTech/adison-cloud/archive/master.zip) zip archive.
* cd adison-cloud
* meteor (runs app in development mode on your computer)
* open http://localhost:3000
* install and configure the [Adison Gateway](https://github.com/AdisonTech/adison-gateway) to talk to your cloud instance

You can also easily deploy to the meteor cloud by typing "meteor deploy myapp.meteor.com".  The meteor cloud is generally only used for testing/verification.  If you deploy to meteor.com, make sure you update the gateway config.js to point to the cloud instance vs localhost.

There is plenty of documentation available for deploying to other cloud technolgies such as Amazon AWS and is beyond the scope of this document.

## Architecture

There are 3 main components:

1. Cloud - Meteor application that provides UI to system, and handles notifications (email/text)
2. Nodes - sensors and actuators (temp sensor, light bulbs, switches, etc)
2. Gateway - communicates between cloud and nodes and runs local algorithms/rules

![Architecture](https://raw.githubusercontent.com/AdisonTech/adison-cloud/master/doc/architecture.png "Adison Architecture")

The Cloud and Gateway communicate using Meteor DDP.  This is already built into meteor, and gives us an efficient real-time communication to a gateway behind a firewall using standard HTTP(s) ports.  

Nodes can also communicate directly to the Cloud using HTTP.

## Principles

* leverage latest mainstream, well-understood technologies (Meteor, React, nodejs, material-ui, JS promises, etc).
* keep it simple to set up (minimize number of separate components and services required to make the system work).  For this reason we don't have a separate MQTT server, etc.
* not targetted at the mainstream home automation market (there are already plenty of solutions there), but rather developers/makers who want an open, more flexible system.
* assume users can write code if needed (don't try to create a GUI to configure every possible permutation -- focus on solid base technologies that users can extend as needed).

## Status

We are just getting started.  Currently, Wemo Link (light bulbs) and Wemo Insight nodes are supported.  See [Issues](https://github.com/AdisonTech/adison-cloud/issues) for status on features in progress.

Tested on Linux and Windows 7 with NodeJS 4.1 and Meteor 1.2.

## API

The Cloud API is exposed via DDP and HTTP, so you can use either.  Typically, a Linux based gateway might communicate via DDP, and simpler endpoints (ESP8266) might communicate using HTTP.

* **updateNode(siteName, nodeData)**: allows a node to send new data to the cloud.  Also used to register a new node.  Needs to send an JSON array of parameters.
    * __siteName__: string - short name for the site
    * __nodeData__: object 
        * __deviceId__: string - globally unique identifier for the node (MAC address, etc).
        * __friendlyName__: string - used to easily identify the device (Office Light, Living Rm Env Sensor, etc)
        * __inputs__: object - current inputs read by device.  All outputs are reflected to inputs so we can verify when they actually change.   Example, *{temp:34, gpio5:1, binaryState:0, brightness: 0.84}*
        * __outputs__: object - commanded states for any outputs.  Note, this does not necessarily reflect the actual state, but what we are commanding it to be.  Example, *{binaryState:1, brightness: 0.85, gpio5: 0}*


## License 

MIT.  See the file named LICENSE.



