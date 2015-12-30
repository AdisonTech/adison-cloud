
JsonRoutes.add("get", "/api/node/:site/:deviceId", function (req, res, next) {
  var siteName = req.params.site;
  var deviceId = req.params.deviceId;

  var site = Sites.findOne({name:siteName});

  if (!site) {
    JsonRoutes.sendResult(res, 404, 'site not found');
    return;
  }

  var node = Nodes.findOne({deviceId:deviceId, siteId:site._id});

  if (!node) {
    JsonRoutes.sendResult(res, 404, 'node not found');
  } else {
    JsonRoutes.sendResult(res, 200, node);
  }
});

JsonRoutes.add("post", "/api/node/:site/:deviceId", function (req, res, next) {
  var siteName = req.params.site;
  var deviceId = req.params.deviceId;

  var node = req.body;
  node.deviceId = deviceId;

  Meteor.call('updateNode', siteName, node); 

  JsonRoutes.sendResult(res, 200, 'OK');

});


