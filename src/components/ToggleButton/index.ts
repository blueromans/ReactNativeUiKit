import ToggleButtonComponent from './ToggleButton';
import ToggleButtonGroup from './ToggleButtonGroup';
import ToggleButtonRow from './ToggleButtonRow';

const ToggleButton = Object.assign(ToggleButtonComponent, {
  Group: ToggleButtonGroup,
  Row: ToggleButtonRow,
});

export default ToggleButton;
