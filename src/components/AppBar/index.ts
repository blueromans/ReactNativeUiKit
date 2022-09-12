import AppBarComponent from './AppBar';
import AppBarContent from './AppBarContent';
import AppBarAction from './AppBarAction';
import AppBarBackAction from './AppBarBackAction';
import AppBarHeader from './AppBarHeader';

const AppBar = Object.assign(
  AppBarComponent,
  {
    Content: AppBarContent,
    Action: AppBarAction,
    BackAction: AppBarBackAction,
    Header: AppBarHeader,
  }
);

export default AppBar;
