Meteor.publish('site', function(name) {
  console.log('meteor publish site');
  return Sites.find({name:name});
});

Meteor.publish('nodesForSite', function(siteName) {
  console.log('meteor publish nodesForSite', siteName);
  var site = Sites.find({name:siteName});
  if (site) {
    return Nodes.find({siteid:site._id});
  } else {
    return null;
  }
});

Meteor.publish('allnodes', function() {
  return Nodes.find();
});

Meteor.publish('allsites', function() {
  console.log('meteor publish sites');
  return Sites.find();
});

