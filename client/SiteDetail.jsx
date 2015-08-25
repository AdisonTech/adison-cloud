
Bulb = React.createClass({
  getInitialState() {
    return {on: false};
  },
  handleOnOff() {
    this.setState({on: !this.state.on});
  },
  handleBrightness() {
  },
  render() {
    var node = this.props.node;
    var bulbIcon = this.state.on ? '/icons/light-bulb-on.png' : '/icons/light-bulb.png';
    return (
      <ListItem
        leftIcon = <img src={bulbIcon}/>
        primaryText = {node.friendlyName}
        rightIcon = <img src='/icons/brightness.png'/>
        onTouchTap = {this.handleOnOff}
      /> 
    )
  }
});

Node = React.createClass({
  render() {
    var node = this.props.node;

    if (node.type == 'bulb') {
      return <Bulb node={node} />;
    } else {
      return <ListItem primaryText={node.friendlyName} />;
    }
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

  handleLeftButton() {
    FlowRouter.go('/');
  },

  render() {
    console.log(this.data.site);
    var nodes = this.data.site.nodes.map(function(n) {
      return <Node key={n.friendlyName} node={n} />
    });
    return (
      <div>
        <AppBar title={this.data.site.name} onLeftIconButtonTouchTap={this.handleLeftButton}/>
        <List>{nodes}</List>
      </div>
    )
  }
});
