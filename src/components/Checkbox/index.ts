import CheckboxComponent from './Checkbox';
import CheckboxItem from './CheckboxItem';
import CheckboxAndroid from './CheckboxAndroid';
import CheckboxIOS from './CheckboxIOS';

const Checkbox = Object.assign(CheckboxComponent, {
  Item: CheckboxItem,
  Android: CheckboxAndroid,
  IOS: CheckboxIOS,
});

export default Checkbox;
