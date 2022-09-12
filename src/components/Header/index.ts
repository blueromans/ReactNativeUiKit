import HeaderComponent from './Header';
import HeaderContent from './HeaderContent';
import HeaderAction from './HeaderAction';
import HeaderBackAction from './HeaderBackAction';
import HeaderWrapper from './HeaderWrapper';

const Header = Object.assign(
  HeaderComponent,
  {
    Content: HeaderContent,
    Action: HeaderAction,
    BackAction: HeaderBackAction,
    Wrapper: HeaderWrapper,
  }
);

export default Header;
