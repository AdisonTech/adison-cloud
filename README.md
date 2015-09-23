# Adison Cloud

## What is it?

Adison cloud is a Meteor web application that provides a user interface to an IOT system.

![Screenshot](https://raw.githubusercontent.com/AdisonTech/adison-cloud/master/doc/screenshot.png "Screenshot")


## Why?

This project aims to provide a modern automation system that uses the latest technologies (Meteor/nodejs) and is easy to customize and extend for custom applications.  This should be a good starting point for developers/makers who want a  more flexible home automation system than the current line of commercial offererings.  It is also designed to work well in industrial automation settings where you might need to monitor and control a number of systems remotely.  

## Architecture

There are 3 main components:

1. Cloud - Meteor application that provides UI to system, and handles notifications (email/text)
2. Nodes - sensors and actuators (temp sensor, light bulbs, switches, etc)
2. Gateway - communicates between cloud and nodes and runs local algorithms/rules

![Architecture](https://raw.githubusercontent.com/AdisonTech/adison-cloud/master/doc/architecture.png "Adison Architecture")

## Status

We are just getting started.  Currently, we support Wemo Link (light bulbs) and Wemo Insight nodes.  See [Issues](https://github.com/AdisonTech/adison-cloud/issues) for status on features in progress.



