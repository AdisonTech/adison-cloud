
SiteDisplay = React.createClass({
  handleTap() {
    console.log('tap ...');
    FlowRouter.go('/site/' + this.props.site._id);
  },
  render() {
    return (
      <ListItem primaryText={this.props.site.name} onTouchTap={this.handleTap}/>
    )
  }
});

// FIXME: for some reason, we can't get the
// getChildContext to work in the MainLayout
// so for now, we'll just repeat it in all the
// screens
SitesDisplay = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },

  getChildContext() {
      return {
          muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
      };
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      sites: Sites.find({}).fetch()
    }
  },

  render() {
    var s = this.data.sites.map(function(site) {
      return <SiteDisplay key={site._id} site={site} />;
    });

    return (
      <div>
        <AppBar title="Sites"/>
        <List>{s}</List>
      </div>
    )
  }
});

