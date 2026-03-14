import React from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';
import tw from '../../lib/tailwind';

type Props = TextInputProps & {
  label: string;
  containerClassName?: string;
  errorMessage?: string | null;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const LabeledInput: React.FC<Props> = ({
  label,
  containerClassName,
  style,
  errorMessage,
  leftIcon,
  rightIcon,
  ...textInputProps
}) => {
  return (
    <View
      style={tw`${containerClassName ?? ''} ${errorMessage ? 'mb-2' : 'mb-4'}`}
    >
      <Text style={tw`mb-2 text-sm text-muted font-dmSemiBold uppercase`}>
        {label}
      </Text>
      <View
        style={[
          tw`flex-row items-center rounded-lg bg-teal/10 border`,
          errorMessage ? tw`border-red` : tw`border-cardBorder`,
        ]}
      >
        {leftIcon ? <View style={tw`pl-3 pr-2`}>{leftIcon}</View> : null}
        <TextInput
          {...textInputProps}
          style={[tw`flex-1 px-3 py-4 text-offWhite`, style]}
          placeholderTextColor={tw.color('muted')}
        />
        {rightIcon ? <View style={tw`pr-3 pl-2`}>{rightIcon}</View> : null}
      </View>
      {errorMessage ? (
        <Text style={tw`mt-1 text-xs text-red`}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LabeledInput;
