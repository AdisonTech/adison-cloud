if (Sites.find().count() === 0) {
  Sites.insert({
    name: 'Site #1',
    nodes: [
      {friendlyName: 'WeMo Link', type: 'bridge', ip: '192.168.1.145' },
      {friendlyName: 'office', type: 'bulb', deviceId: '94103EF6BF421ADA' },
      {friendlyName: 'school', type: 'bulb', deviceId: '94103EF6BF427B58' } 
    ]
  });

  Sites.insert({
    name: 'Site #2',
    nodes: [
      {friendlyName: 'WeMo Link', type: 'bridge', ip: '192.168.1.145' },
      {friendlyName: 'den', type: 'bulb', deviceId: '94103EF6BF421ADA' },
      {friendlyName: 'living room', type: 'bulb', deviceId: '94103EF6BF427B58' } 
    ]
  });
}


