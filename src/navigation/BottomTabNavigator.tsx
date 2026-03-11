import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-design-icons';
import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import type { RootTabParamList } from './types';
import tw from '../../lib/tailwind';

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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Log" component={LogScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

