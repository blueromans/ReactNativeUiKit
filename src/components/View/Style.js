import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  full: { width: '100%' },
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
  bottom: { justifyContent: 'flex-end' },
  center: { alignItems: 'center' },
  end: { alignItems: 'flex-end' },
  start: { alignItems: 'flex-start' },
  middle: { justifyContent: 'center' },
  top: { justifyContent: 'flex-start' },
  between: { justifyContent: 'space-between' },
  around: { justifyContent: 'space-around' },
});
