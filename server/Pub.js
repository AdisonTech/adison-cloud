Meteor.publish('site', function(name) {
  console.log('meteor publish site');
  return Sites.find({name:name});
});

Meteor.publish('allsites', function() {
  console.log('meteor publish sites');
  return Sites.find();
});

