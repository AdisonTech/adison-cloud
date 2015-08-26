
Bulb = React.createClass({
  getInitialState() {
    return {on: false, brightness: 50};
  },
  handleOnOff() {
    this.setState({on: !this.state.on});
  },
  handleSettings() {
    this.refs.bulbSettings.show();
  },
  handleBrightness(e, value) {
    var b = Math.round(value*100);
    this.setState({brightness: b});
  },
  render() {
    var node = this.props.node;
    var bulbColor = this.state.on ? Colors.yellow500 : null;
    return (
      <div>
        <ListItem
          leftIcon = <FontIcon className="fa fa-lightbulb-o" color={bulbColor}/>
          primaryText = {node.friendlyName}
          rightIconButton = <IconButton onTouchTap={this.handleSettings} iconClassName="fa fa-cog" />
          onTouchTap = {this.handleOnOff}
        /> 
        <Dialog
          ref="bulbSettings"
          actions={[{text: 'OK'}]}
          onChange={this.handleBrightness}
          onDragStart={this.handleBrightness}
          title="Bulb Settings">
          Brightness: {this.state.brightness}%
          <Slider name="brightness" 
            onChange={this.handleBrightness} 
            defaultValue={this.state.brightness/100} 
          /> 
        </Dialog>
      </div>
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
        <AppBar title={this.data.site.name} 
          onLeftIconButtonTouchTap={this.handleLeftButton}
        />
        <List>{nodes}</List>
      </div>
    )
  }
});
