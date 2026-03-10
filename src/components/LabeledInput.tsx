import React from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';
import tw from '../../lib/tailwind';

type Props = TextInputProps & {
  label: string;
  containerClassName?: string;
  errorMessage?: string | null;
};

const LabeledInput: React.FC<Props> = ({
  label,
  containerClassName,
  style,
  errorMessage,
  ...textInputProps
}) => {
  return (
    <View style={tw`${containerClassName ?? ''} mb-4`}>
      <Text style={tw`mb-2 text-base`}>{label}</Text>
      <TextInput
        {...textInputProps}
        style={[
          tw`border rounded-lg px-3 py-2`,
          errorMessage ? tw`border-red-500` : tw`border-gray-300`,
          style,
        ]}
      />
      {errorMessage ? (
        <Text style={tw`mt-1 text-xs text-red-500`}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default LabeledInput;

