import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';

export const HistoryScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <Text style={tw`text-2xl font-dmRegular text-blue-500`}>History</Text>
    </View>
  );
};

export default HistoryScreen;
