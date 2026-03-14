import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../store';
import { selectIsAuthenticated } from '../store/authSlice';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import OfflineBanner from '../components/OfflineBanner';

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <View style={{ flex: 1 }}>
      <OfflineBanner />
      {!isAuthenticated ? <AuthNavigator /> : <BottomTabNavigator />}
    </View>
  );
};

export default RootNavigator;
