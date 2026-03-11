import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';

export const HomeScreen: React.FC = () => {
  return (
    <View style={tw`flex-1 bg-navy`}>
      <GridBackground />
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-2xl font-dmRegular text-blue-500`}>Home</Text>
      </View>
    </View>
  );
};

export default HomeScreen;