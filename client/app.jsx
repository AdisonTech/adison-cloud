ThemeManager = new mui.Styles.ThemeManager();
//injectTapEventPlugin();

AppBar = mui.AppBar;
DatePicker = mui.DatePicker;
TextField = mui.TextField;
List = mui.List;
ListItem = mui.ListItem;
FontIcon = mui.FontIcon;
IconButton = mui.IconButton;
Colors = mui.Styles.Colors;
Dialog = mui.Dialog;
Slider = mui.Slider;
Toggle = mui.Toggle;

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



