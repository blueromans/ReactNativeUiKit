import { LayoutProvider } from 'recyclerlistview';
import { SnackBarWrapper } from '../components/SnackBar';

const DURATION_SHORT = 4000;

export const showToast = (
  title: string,
  subTitle: string = '',
  image: string = '',
  theme: string = 'danger',
  duration: number = DURATION_SHORT,
  action = {
    label: 'Undo',
    onPress: () => {},
  },
  onDismiss = () => null
) => {
  SnackBarWrapper.show(
    title,
    subTitle,
    image,
    theme,
    duration,
    action,
    onDismiss
  );
};

export const layoutMaker = (width: number, height: number) =>
  new LayoutProvider(
    (_i: any) => {
      return 'VSEL';
    },
    (_type: any, dim: any) => {
      dim.width = width;
      dim.height = height;
    }
  );
