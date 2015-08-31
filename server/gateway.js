

Meteor.methods({
  updateNodes: function(siteName, nodes) {
    console.log('updateNodes method:', siteName, nodes);
    var site = Sites.findOne({name:siteName});
    console.log('findOne returned', site);
    if (!site) {
      console.log('creating a new site');
      Sites.insert({name:siteName, nodes:nodes});
    } else {
      console.log('updating existing site');
      var site_ = deepmerge(site, {nodes:nodes});
      Sites.update({name:siteName}, site_);
    }
  }
});

Meteor.methods({
  updateSiteRaw: function(sel, mod) {
    console.log('updateSiteRaw method:', sel, mod);
    Sites.update(sel, mod);
  }
});

