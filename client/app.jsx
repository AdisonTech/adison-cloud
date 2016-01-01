injectTapEventPlugin();

ThemeManager = MUI.Styles.ThemeManager;
LightRawTheme = MUI.Styles.LightRawTheme;   

AppBar = MUI.AppBar;
DatePicker = MUI.DatePicker;
TextField = MUI.TextField;
List = MUI.List;
ListItem = MUI.ListItem;
FontIcon = MUI.FontIcon;
IconButton = MUI.IconButton;
Colors = MUI.Styles.Colors;
Dialog = MUI.Dialog;
Slider = MUI.Slider;
Toggle = MUI.Toggle;
SvgIcon = MUI.SvgIcon;
FlatButton = MUI.FlatButton;

MainLayout = React.createClass({
  render() {
    return (
      <div>
        {this.props.content}
      </div>
    )
  }
});

