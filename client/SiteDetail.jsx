
Outlet = React.createClass({
  handleOnOff() {
    var setBinaryState = this.props.node.inputs.binaryState == '0' ? '1' : '0';
    this.props.setBinaryState(this.props.node.deviceId, setBinaryState);
  },
  render() {
    var node = this.props.node;
    var plugColor = node.inputs.binaryState !== '0' ? Colors.yellow500 : null;
    return (
      <ListItem
        key = {node.deviceId}
        leftIcon = <FontIcon className="fa fa-plug" color={plugColor}/>
        primaryText = {node.friendlyName}
        onTouchTap = {this.handleOnOff}
      /> 
    )  

  }
});

Bulb = React.createClass({
  getInitialState() {
    return {};
  },
  handleOnOff() {
    var setBinaryState = this.props.node.inputs.binaryState == '1' ? '0' : '1';
    this.props.setBinaryState(this.props.node.deviceId, setBinaryState);
  },
  setBrightness(e, value) {
    this.props.setBrightness(this.props.node.deviceId, Math.round(value*100)/100);
  },
  handleSettings() {
    this.refs.bulbSettings.show();
  },
  render() {
    var node = this.props.node;
    var bulbColor = node.inputs.binaryState === '1' ? Colors.yellow500 : null;
    var brightness = +node.inputs.brightness;
    var brightnessPercent = Math.round(brightness * 100);
    var description = node.friendlyName + ' ' + brightnessPercent + '%';
    return (
      <div>
        <ListItem
          key = {node.deviceId}
          leftIcon = <FontIcon className="fa fa-lightbulb-o" color={bulbColor}/>
          primaryText = {description}
          rightIconButton = <IconButton onTouchTap={this.handleSettings} iconClassName="fa fa-cog" />
          onTouchTap = {this.handleOnOff}
        /> 
        <Dialog
          ref="bulbSettings"
          actions={[{text: 'OK'}]}
          title="Bulb Settings">
          Brightness: {brightnessPercent}%
          <Slider name="brightness" 
            onChange={this.setBrightness} 
            defaultValue={+node.brightness}
          /> 
        </Dialog>
      </div>
    )
  }
});

Node = React.createClass({
  setBrightness(id, b) {
    this.props.setBrightness(id, b);
  },
  setBinaryState(id, b) {
    this.props.setBinaryState(id, b);
  },
  render() {
    var node = this.props.node;
    
    if (node.type == 'bulb') {
      return <Bulb node={node}
              setBrightness={this.setBrightness}
              setBinaryState={this.setBinaryState} />;
    } else if (node.type == 'outlet') {
      return <Outlet node={node}
             setBinaryState={this.setBinaryState} />;
    } else {
      return <ListItem key={node.deviceId} primaryText={node.friendlyName} />;
    }
  }
});

SiteDetail = React.createClass({
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },

  getChildContext() {
      return {
          muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
      };
  },

  handleLeftButton() {
    FlowRouter.go('/');
  },

  setBrightness(id, b) {
    this.props.setBrightness(id, b);
  },

  setBinaryState(id, b) {
    this.props.setBinaryState(id, b);
  },

  render() {
    var that = this;
    var name = this.props.site.name;
    var nodes = this.props.nodes.map(function(n) {
      console.log('node', n);
      return <Node key={n.friendlyName} 
              node={n} setBrightness={that.setBrightness}
              setBinaryState={that.setBinaryState} />
    });

    return (
      <div>
        <AppBar title={name} 
          onLeftIconButtonTouchTap={this.handleLeftButton}
        />
        <List>{nodes}</List>
      </div>
    )
  }
});

SiteDetailContainer = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      site: Sites.findOne({_id:this.props.siteId}),
      nodes: Nodes.find({siteId: this.props.siteId}).fetch(),
    }
  },
  setBrightness(id, b) {
    Meteor.call('setNodeOutput', id, 'brightness', b);
  },

  setBinaryState(id, b) {
    Meteor.call('setNodeOutput', id, 'binaryState', b);
  },
  render() {
    console.log('data', this.data);
    return this.data.site ? <SiteDetail setBrightness={this.setBrightness} 
      setBinaryState={this.setBinaryState} site={this.data.site} nodes={this.data.nodes} /> :
      <div>Loading ...</div>;
  }
});


