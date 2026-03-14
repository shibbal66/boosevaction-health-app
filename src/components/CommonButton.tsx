import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
  TouchableOpacity,
} from 'react-native';
import tw from '../../lib/tailwind';

type ButtonVariant = 'outlined' | 'filled';

type Props = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  color?: string;
  loading?: boolean;
  onPress: () => void;
};

const CommonButton: React.FC<Props> = ({
  label,
  style,
  variant = 'filled',
  color = 'orange',
  loading = false,
  disabled,
  onPress,
}) => {
  const isDisabled = loading || disabled;

  let buttonClasses: string;
  let textClasses: string;
  let shadowStyle: ViewStyle | undefined;

  switch (variant) {
    case 'outlined':
      buttonClasses = `border border-${color} rounded-full py-3 mb-4`;
      textClasses = `text-center text-${color} text-base font-dmBold uppercase`;
      shadowStyle = isDisabled
        ? undefined
        : {
            shadowColor: tw.color(color),
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 4,
          };
      break;
    case 'filled':
    default:
      buttonClasses = `bg-${color} rounded-full py-3 mb-4`;
      textClasses = 'text-center text-white text-base font-dmBold uppercase';
      shadowStyle = isDisabled
        ? undefined
        : {
            shadowColor: tw.color(color),
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 4,
          };
      break;
  }

  const disabledStyle: ViewStyle = isDisabled
    ? { opacity: 0.5, elevation: 0 }
    : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        [
          tw`${buttonClasses}`,
          shadowStyle,
          disabledStyle,
          { pointerEvents: isDisabled ? 'none' : 'auto' },
          style,
        ] as any
      }
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'filled' ? '#FFFFFF' : tw.color(color)}
        />
      ) : (
        <Text style={tw`${textClasses}`}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;
