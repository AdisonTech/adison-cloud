
Node = React.createClass({
  render() {
    return (
      <ListItem primaryText={this.props.node.friendlyName} />
   )
  }
});

SiteDetail = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },

  getChildContext() {
      return {
          muiTheme: ThemeManager.getCurrentTheme()
      };
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      site: Sites.findOne({_id:this.props.siteId})
    }
  },

  render() {
    console.log(this.data.site);
    var nodes = this.data.site.nodes.map(function(n) {
      return <Node key={n.friendlyName} node={n} />
    });
    return (
      <div>
        <AppBar title={this.data.site.name}/>
        <List>{nodes}</List>
      </div>
    )
  }
});
