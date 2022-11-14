import { LayoutProvider } from 'recyclerlistview';
import { SnackBarWrapper } from '../components/SnackBar';

const DURATION_SHORT = 4000;

export const showToast = (
  content: React.ReactNode,
  position: 'bottom' | 'top' = 'bottom',
  duration: number = DURATION_SHORT
) => {
  SnackBarWrapper.show(content, position, duration);
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
