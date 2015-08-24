
var ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();

var { DatePicker, TextField } = mui;

var Site = React.createClass({
  render() {
    <div>This is a site</div>
  }
});

var Sites = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      sites: Sites.find({}).fetch()
    }
  },

  render() {
    return this.data.sites.map((site) => {
      return <Site key={site._id} site={site} />;
    });
  }
});

var App = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    render() {
        return (
            <div>
                <h1>Sites</h1>
                <Sites/>
            </div>
        );
    }
});

Meteor.startup(function () {
  injectTapEventPlugin();
  React.render(<App />, document.getElementById("container"));
});


