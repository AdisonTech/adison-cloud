ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();

AppBar = mui.AppBar;
DatePicker = mui.DatePicker;
TextField = mui.TextField;
List = mui.List;
ListItem = mui.ListItem;

MainLayout = React.createClass({
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    )
  }
});

Meteor.startup(function () {
  injectTapEventPlugin();
});



