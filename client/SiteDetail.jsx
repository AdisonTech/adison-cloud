
Outlet = React.createClass({
  handleOnOff() {
    var cmdBinaryState = this.props.node.binaryState == '0' ? '1' : '0';
    this.props.cmdBinaryState(this.props.node.deviceId, cmdBinaryState);
  },
  render() {
    var node = this.props.node;
    var plugColor = node.binaryState !== '0' ? Colors.yellow500 : null;
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
    var cmdBinaryState = this.props.node.binaryState == '1' ? '0' : '1';
    this.props.cmdBinaryState(this.props.node.deviceId, cmdBinaryState);
  },
  cmdBrightness(e, value) {
    this.props.cmdBrightness(this.props.node.deviceId, Math.round(value*100)/100);
  },
  handleSettings() {
    this.refs.bulbSettings.show();
  },
  render() {
    var node = this.props.node;
    var bulbColor = node.binaryState === '1' ? Colors.yellow500 : null;
    var brightness = +node.brightness;
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
            onChange={this.cmdBrightness} 
            defaultValue={+node.brightness}
          /> 
        </Dialog>
      </div>
    )
  }
});

Node = React.createClass({
  cmdBrightness(id, b) {
    this.props.cmdBrightness(id, b);
  },
  cmdBinaryState(id, b) {
    this.props.cmdBinaryState(id, b);
  },
  render() {
    var node = this.props.node;
    
    if (node.type == 'bulb') {
      return <Bulb node={node}
              cmdBrightness={this.cmdBrightness}
              cmdBinaryState={this.cmdBinaryState} />;
    } else if (node.type == 'outlet') {
      return <Outlet node={node}
             cmdBinaryState={this.cmdBinaryState} />;
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

  cmdBrightness(id, b) {
    this.props.cmdBrightness(id, b);
  },

  cmdBinaryState(id, b) {
    this.props.cmdBinaryState(id, b);
  },

  render() {
    var that = this;
    var name = this.props.site.name;
    var nodes = this.props.site.nodes.map(function(n) {
      return <Node key={n.friendlyName} 
              node={n} cmdBrightness={that.cmdBrightness}
              cmdBinaryState={that.cmdBinaryState} />
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
      site: Sites.findOne({_id:this.props.siteId})
    }
  },
  cmdBrightness(id, b) {
    var sel = {name: this.data.site.name, 'nodes.deviceId': id};
    var mod = {$set: {'nodes.$.cmdBrightness':b}, $inc: {cmdSeq:1}};
    Meteor.call('updateSiteRaw', sel, mod);
  },

  cmdBinaryState(id, b) {
    var sel = {name: this.data.site.name, 'nodes.deviceId': id};
    var mod = {$set: {'nodes.$.cmdBinaryState':b}, $inc: {cmdSeq:1}};
    Meteor.call('updateSiteRaw', sel, mod);
  },
  render() {
    return this.data.site ? <SiteDetail cmdBrightness={this.cmdBrightness} 
      cmdBinaryState={this.cmdBinaryState} site={this.data.site} /> :
      <div>Loading ...</div>;
  }
});



