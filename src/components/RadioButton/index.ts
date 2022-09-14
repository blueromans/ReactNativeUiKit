import RadioButtonComponent from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';
import RadioButtonAndroid from './RadioButtonAndroid';
import RadioButtonIOS from './RadioButtonIOS';
import RadioButtonItem from './RadioButtonItem';

const RadioButton = Object.assign(RadioButtonComponent, {
  Group: RadioButtonGroup,
  Android: RadioButtonAndroid,
  IOS: RadioButtonIOS,
  Item: RadioButtonItem,
});

export default RadioButton;
