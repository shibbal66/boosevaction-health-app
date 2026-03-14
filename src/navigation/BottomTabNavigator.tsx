import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import {
  HomeScreen,
  LogScreen,
  HistoryScreen,
} from '../screens';
import SettingsStack from './SettingsStack';
import type { RootTabParamList } from './types';
import tw from '../../lib/tailwind';
import {
  SCREEN_NAME_HOME,
  SCREEN_NAME_LOG,
  SCREEN_NAME_HISTORY,
  SCREEN_NAME_SETTINGS,
} from '../utils/screenName';

const Tab = createBottomTabNavigator<RootTabParamList>();
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: tw.color('orange'),
        tabBarInactiveTintColor: tw.color('muted'),
        tabBarStyle: {
          backgroundColor: tw.color('navyDark'),
          borderTopColor: 'transparent',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: MaterialIconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Log':
              iconName = 'anchor';
              break;
            case 'History':
              iconName = 'history';
              break;
            case 'Settings':
              iconName = 'adjust';
              break;
            default:
              iconName = 'circle';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={SCREEN_NAME_HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_NAME_LOG} component={LogScreen} />
      <Tab.Screen name={SCREEN_NAME_HISTORY} component={HistoryScreen} />
      <Tab.Screen name={SCREEN_NAME_SETTINGS} component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
