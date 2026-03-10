import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';

export const SettingsScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={tw`text-2xl font-sfProRounded text-blue-500`}>Settings</Text>
    </View>
  );
};

export default SettingsScreen;

