if (Sites.find().count() === 0) {
  Sites.insert({
    name: 'Site #1',
    nodes: {
      'WeMo Link': { type: 'bridge', ip: '192.168.1.145' },
      office: { type: 'bulb', deviceId: '94103EF6BF421ADA' },
      school: { type: 'bulb', deviceId: '94103EF6BF427B58' } 
    }
  });

  Sites.insert({
    name: 'Site #2',
    nodes: {
      'WeMo Link': { type: 'bridge', ip: '192.168.1.132' },
      den: { type: 'bulb', deviceId: '94103EF6BF421ADA' },
      'living room': { type: 'bulb', deviceId: '94103EF6BF427B58' } 
    }
  });
}

