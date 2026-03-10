import React from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
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

  switch (variant) {
    case 'outlined':
      buttonClasses = 'border border-blue-500 rounded-full py-3 mb-4';
      textClasses = 'text-center text-blue-500 text-base font-sfProRounded';
      break;
    case 'accent':
      buttonClasses = 'bg-accent rounded-full py-3 mb-4';
      textClasses = 'text-center text-white text-base font-sfProRounded';
      break;
    case 'primary':
    default:
      buttonClasses = 'bg-blue-500 rounded-full py-3 mb-4';
      textClasses = 'text-center text-white text-base font-sfProRounded';
      break;
  }

  return (
    <Pressable
      {...pressableProps}
      style={[tw`${buttonClasses}`, style] as any}
    >
      <Text style={tw`${textClasses}`}>{label}</Text>
    </Pressable>
  );
};

export default CommonButton;

