import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SettingsScreen,
  EditProfileScreen,
  ReminderTimeScreen,
} from '../screens';
import type { SettingsStackParamList } from './types';
import {
  SCREEN_NAME_SETTINGS_MAIN,
  SCREEN_NAME_EDIT_PROFILE,
  SCREEN_NAME_REMINDER_TIME,
} from '../utils/screenName';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_NAME_SETTINGS_MAIN} component={SettingsScreen} />
      <Stack.Screen
        name={SCREEN_NAME_EDIT_PROFILE}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME_REMINDER_TIME}
        component={ReminderTimeScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
