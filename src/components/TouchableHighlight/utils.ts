import color from 'color';

export const getTouchableRippleColors = ({
  underlayColor,
}: {
  underlayColor?: string;
}) => {
  return {
    calculatedUnderlayColor: color(underlayColor).fade(0.5).rgb().string(),
  };
};
