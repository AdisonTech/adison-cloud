Meteor.startup(function() {
	// read environment variables from Meteor.settings
	if(Meteor.settings && Meteor.settings.env && _.isObject(Meteor.settings.env)) {
		for(var variableName in Meteor.settings.env) {
			process.env[variableName] = Meteor.settings.env[variableName];
		}
	}

	
Sensors.mqttConnect('mqtt://test.mosquitto.org', ['revspace/sensors/#']);
});

Meteor.methods({
	"sendMail": function(options) {
		this.unblock();

		Email.send(options);
	}
});