
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
    var that = this;
    var name = this.data.site ? this.data.site.name : 'loading ...';
    var nodes = this.data.site ? this.data.site.nodes.map(function(n) {
      return <Node key={n.friendlyName} 
              node={n} cmdBrightness={that.cmdBrightness}
              cmdBinaryState={that.cmdBinaryState} />
    }) : null;
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
