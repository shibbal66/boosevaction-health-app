import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';
import CommonButton from '../components/CommonButton';
import { useAppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { clearAuthState } from '../services/authStorage';

export const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    await clearAuthState();
  };

  return (
    <View style={tw`flex-1 bg-navyDark px-6 pt-12`}>
      <Text
        style={tw`text-heading font-playfairDisplayBlack text-offWhite mb-6`}
      >
        Settings
      </Text>

      <View style={tw`mt-auto mb-8`}>
        <CommonButton
          label="Log Out"
          variant="outlined"
          color="orange"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
