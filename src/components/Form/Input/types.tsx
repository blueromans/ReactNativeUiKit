import type {
  TextInput as NativeTextInput,
  Animated,
  TextStyle,
  TextInputProps,
  ColorValue,
} from 'react-native';
import type { $Omit } from '../../../types';

export type TextInputLabelProp = string | React.ReactElement;

export type RenderProps = {
  ref: (a?: NativeTextInput | null) => void;
  onChangeText?: (a: string) => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  editable?: boolean;
  selectionColor?: string;
  onFocus?: (args: any) => void;
  onBlur?: (args: any) => void;
  underlineColorAndroid?: string;
  style: any;
  multiline?: boolean;
  numberOfLines?: number;
  value?: string;
  adjustsFontSizeToFit?: boolean;
  testID?: string;
};

type TextInputTypesWithoutMode = $Omit<TextInputProps, 'mode'>;
export type State = {
  labeled: Animated.Value;
  error: Animated.Value;
  focused: boolean;
  placeholder?: string;
  value?: string;
  labelLayout: { measured: boolean; width: number; height: number };
  leftLayout: { height: number | null; width: number | null };
  rightLayout: { height: number | null; width: number | null };
};
export type ChildTextInputProps = {
  parentState: State;
  innerRef: (ref?: NativeTextInput | null) => void;
  onFocus?: (args: any) => void;
  onBlur?: (args: any) => void;
  onChangeText?: (value: string) => void;
} & TextInputTypesWithoutMode;

export type LabelProps = {
  placeholderStyle: any;
  placeholderOpacity: number;
  labelScale: number;
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  font: any;
  topPosition: number;
  paddingOffset?: { paddingLeft: number; paddingRight: number } | null;
  labelTranslationXOffset?: number;
  placeholderColor: string | null;
  backgroundColor?: ColorValue;
  label?: TextInputLabelProp | null;
  hasActiveOutline?: boolean | null;
  activeColor: string;
  errorColor?: string;
  error?: boolean | null;
  maxFontSizeMultiplier?: number | undefined | null;
};

export type InputLabelProps = {
  parentState: State;
  labelProps: LabelProps;
  labelBackground?: any;
  maxFontSizeMultiplier?: number | undefined | null;
};

export type LabelBackgroundProps = {
  labelProps: LabelProps;
  labelStyle: any;
  parentState: State;
  maxFontSizeMultiplier?: number | undefined | null;
};
