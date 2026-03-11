import React from 'react';
import {
  Pressable,
  Text,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import tw from '../../lib/tailwind';

type ButtonVariant = 'primary' | 'outlined' | 'accent';

type Props = PressableProps & {
  label: string;
  variant?: ButtonVariant;
};

const CommonButton: React.FC<Props> = ({
  label,
  style,
  variant = 'primary',
  ...pressableProps
}) => {
  let buttonClasses: string;
  let textClasses: string;
  let shadowStyle: ViewStyle | undefined;

  switch (variant) {
    case 'outlined':
      buttonClasses = 'border border-blue-500 rounded-full py-3 mb-4';
      textClasses = 'text-center text-blue-500 text-base font-dmBold uppercase';
      shadowStyle = {
        shadowColor: tw.color('blue-500'),
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4,
      };
      break;
    case 'accent':
      buttonClasses = 'bg-orange rounded-full py-3 mb-4';
      textClasses = 'text-center text-white text-base font-dmBold uppercase';
      shadowStyle = {
        shadowColor: tw.color('orangeDark'),
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 4,
      };
      break;
    case 'primary':
    default:
      buttonClasses = 'bg-blue-500 rounded-full py-3 mb-4';
      textClasses = 'text-center text-white text-base font-dmBold uppercase';
      shadowStyle = {
        shadowColor: tw.color('blue-500'),
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4,
      };
      break;
  }

  return (
    <Pressable
      {...pressableProps}
      style={[tw`${buttonClasses}`, shadowStyle, style] as any}
    >
      <Text style={tw`${textClasses}`}>{label}</Text>
    </Pressable>
  );
};

export default CommonButton;
