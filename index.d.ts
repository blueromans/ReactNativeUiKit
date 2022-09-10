import { Theme } from './src/types';

declare global {
  namespace ReactNativeUiKit {
    interface AppTheme extends Theme {}
  }
}
