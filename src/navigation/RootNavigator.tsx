import React from 'react';
import { useAppSelector } from '../store';
import { selectIsAuthenticated } from '../store/authSlice';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return <BottomTabNavigator />;
};

export default RootNavigator;
