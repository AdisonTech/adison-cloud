EspSettings = React.createClass({
  getInitialState() {
    return this.props.node.config || {};
  },
  handleCancel() {
    this.props.cancel();
  },
  handleSave() {
    this.props.save(this.state);
  },
  reportingRate(e) {
    var rate = e.target.value;
    console.log('reportingRate', rate);
    this.setState({reportingRate:rate});
  },
  render() {
    const actions = [
      <FlatButton
        key="1"
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleCancel}
      />,
      <FlatButton
        key="2"
        label="Save"
        secondary={true}
        onTouchTap={this.handleSave}
      />
    ];
    
    return (
      <Dialog
        title="ESP8266 Settings"
        actions={actions}
        open={this.props.open}
      >
        <TextField
          hintText="time in seconds"
          floatingLabelText="Reporting Rate (s)"
          onChange={this.reportingRate}
        />
      </Dialog>
    )
  }
});

Esp = React.createClass({
  handleConfigCancel() {
    this.setState({configOpen:false});
  },
  handleConfigSave(config) {
    this.props.updateConfig(this.props.node.deviceId, config);
    this.setState({configOpen:false});
  },
  getInitialState() {
    return {configOpen:false}
  },
  toggleSettings() {
    this.setState({configOpen:!this.state.configOpen});
  },
  render() {
    var node = this.props.node;
    var name = node.friendlyName ? node.friendlyName : node.deviceId;
    var inputs = Object.keys(node.inputs).map(key => {
      var t = key + ': ' + node.inputs[key];
      return <ListItem key={key} primaryText={t} />
    });

    return (
      <div>
        <ListItem 
          key={node.deviceId} 
          leftIcon = <SvgIcon> <path d="icons/expressif.svg"></path></SvgIcon> 
          primaryText={name} 
          initiallyOpen={true}
          nestedItems={inputs}
          onTouchTap={this.toggleSettings}
        />
        <EspSettings
          open={this.state.configOpen}
          node={this.props.node}
          save={this.handleConfigSave}
          cancel={this.handleConfigCancel}
        />
      </div>
    )
  }
});

Outlet = React.createClass({
  handleOnOff() {
    var setBinaryState = this.props.node.inputs.binaryState == '0' ? '1' : '0';
    this.props.setBinaryState(this.props.node.deviceId, setBinaryState);
  },
  render() {
    var node = this.props.node;
    var name = node.friendlyName ? node.friendlyName : node.deviceId;
    var plugColor = node.inputs.binaryState !== '0' ? Colors.yellow500 : null;
    return (
      <ListItem
        key = {node.deviceId}
        leftIcon = <FontIcon className="fa fa-plug" color={plugColor}/>
        primaryText = {name}
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
    var name = node.friendlyName ? node.friendlyName : node.deviceId;
    var bulbColor = node.inputs.binaryState === '1' ? Colors.yellow500 : null;
    var brightness = +node.inputs.brightness;
    var brightnessPercent = Math.round(brightness * 100);
    var description = name + ' ' + brightnessPercent + '%';
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
  render() {
    var node = this.props.node;
    var name = node.friendlyName ? node.friendlyName : node.deviceId;
    
    if (node.type == 'bulb') {
      return <Bulb node={node}
              setBrightness={this.props.setBrightness}
              setBinaryState={this.props.setBinaryState} />;
    } else if (node.type == 'outlet') {
      return <Outlet node={node}
             setBinaryState={this.setBinaryState} />;
    } else if (node.type == 'esp8266') {
      return <Esp node={node} updateConfig={this.props.updateConfig} />;        
    } else {
      return <ListItem key={node.deviceId} primaryText={name} />;
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

  render() {
    var name = this.props.site.name;
    var nodes = this.props.nodes.map(n => {
      return <Node key={n.deviceId} 
              node={n} setBrightness={this.props.setBrightness}
              setBinaryState={this.props.setBinaryState} 
              updateConfig={this.props.updateConfig} />
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
  setBrightness(deviceId, b) {
    Meteor.call('setNodeOutput', deviceId, 'brightness', b);
  },
  setBinaryState(deviceId, b) {
    Meteor.call('setNodeOutput', deviceId, 'binaryState', b);
  },
  updateConfig(deviceId, config) {
    Meteor.call('updateNodeConfig', deviceId, config);
  },
  render() {
    return this.data.site ? 
      <SiteDetail setBrightness={this.setBrightness} 
        setBinaryState={this.setBinaryState} site={this.data.site} 
        nodes={this.data.nodes} updateConfig={this.updateConfig} /> :
      <div>Loading ...</div>;
  }
});


