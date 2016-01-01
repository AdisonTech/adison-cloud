

Meteor.methods({
  updateNode: function(siteName, node) {
    console.log('updateNode method:', siteName, node);
    var site = Sites.findOne({name:siteName});
    if (!site) {
      console.log('creating a new site');
      siteId = Sites.insert({name:siteName});
    }  else {
      siteId = site._id;
    }

    node.siteId = siteId;

    var node_ = Nodes.findOne({siteId:siteId, deviceId:node.deviceId});

    if (node_) {
      var node__ = deepmerge(node_, node);
      Nodes.update({_id:node_._id}, node__);
    } else {
      Nodes.insert(node);
    }
  },
  updateNodeConfig: function(deviceId, config) {
    var node = Nodes.findOne({deviceId:deviceId});

    if (!node) {
      console.log("updateNodeConfig failed, can't find node");
      return;
    }

    var node_ = deepmerge(node, {config:config});
    Nodes.update({deviceId:deviceId}, node_);
  },
  setNodeOutput: function(deviceId, param, value) {
    console.log('setNodeOutput:', deviceId, param, value);
    var set = {}
    set["outputs." + param] = value;
    Nodes.update({deviceId:deviceId}, {$set:set});
  }
});


