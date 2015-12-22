if (Sites.find().count() === 0) {
  var site1Id = Sites.insert({
    name: 'Site #1',
  });

  Nodes.insert({siteId: site1Id, friendlyName: 'WeMo Link', type: 'bridge', ip: '192.168.1.145'});
  Nodes.insert({siteId: site1Id, friendlyName: 'office', type: 'bulb', deviceId: '94103EF6BF421ADA' });
  Nodes.insert({siteId: site1Id, friendlyName: 'school', type: 'bulb', deviceId: '94103EF6BF427B58' });

  var site2Id = Sites.insert({
    name: 'Site #2',
  });

  Nodes.insert({siteId: site2Id, friendlyName: 'WeMo Link', type: 'bridge', ip: '192.168.1.145'});
  Nodes.insert({siteId: site2Id, friendlyName: 'office', type: 'bulb', deviceId: '94103EF6BF421ADA' });
  Nodes.insert({siteId: site2Id, friendlyName: 'school', type: 'bulb', deviceId: '94103EF6BF427B58' });
}


