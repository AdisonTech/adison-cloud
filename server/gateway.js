

Meteor.methods({
  updateNode: function(siteName, node) {
    console.log('updateNode method:', siteName, node);
    var site = Sites.findOne({name:siteName});
    console.log('findOne returned', site);
    if (!site) {
      console.log('creating a new site');
      site = Sites.insert({name:siteName});
    } 

    node.siteId = site._id;

    var node_ = Nodes.findOne({siteId:site._id, deviceId:node.deviceId});

    if (node_) {
      var node__ = deepmerge(node_, node);
      Nodes.update({_id:node_._id}, node__);
    } else {
      Nodes.insert(node);
    }
  }
});

Meteor.methods({
  setNodeOutput: function(deviceId, param, value) {
    console.log('setNodeOutput:', deviceId, param, value);
    var set = {}
    set["outputs." + param] = value;
    Nodes.update({deviceId:deviceId}, {$set:set});
  }
});


