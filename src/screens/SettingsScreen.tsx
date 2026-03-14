import React, { useCallback, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import CommonButton from '../components/CommonButton';
import useUserProfile from '../hooks/useUserProfile';
import useVoyage from '../hooks/useVoyage';
import { useAppDispatch } from '../store';
import { logout } from '../store/authSlice';
import { clearAuthState } from '../services/authStorage';
import { formatDisplayDate, formatTimeForDisplay } from '../utils/helpers';
import type { SettingsStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'SettingsMain'>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const { user, patchUser, updating } = useUserProfile({ showToasts: true });
  const { voyage, getVoyage } = useVoyage({ showToasts: false });

  useEffect(() => {
    getVoyage();
  }, [getVoyage]);

  const voyageStartText = voyage?.startDate
    ? `Voyage started ${formatDisplayDate(new Date(voyage.startDate))}.`
    : '';

  const handleToggleReminder = useCallback(
    async (value: boolean) => {
      try {
        await patchUser({
          notificationEnabled: value,
          ...(value && !user?.notificationTime
            ? { notificationTime: '20:00' }
            : {}),
        });
      } catch {
        // Toast already shown by hook
      }
    },
    [patchUser, user?.notificationTime],
  );

  const handleLogout = async () => {
    dispatch(logout());
    await clearAuthState();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-navy`} edges={['top']}>
      <GridBackground />
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`px-6 pb-8`}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={tw`text-offWhite text-heading font-playfairDisplayBold text-center mt-1`}
        >
          Settings
        </Text>
        {/* Profile card */}
        <View
          style={tw`rounded-2xl border border-cardBorder bg-orangeDim overflow-hidden my-6`}
        >
          <View style={tw`flex-row items-center p-4`}>
            <View
              style={tw`w-14 h-14 rounded-2xl bg-navyLight items-center justify-center mr-4`}
            >
              <MaterialDesignIcons
                name="anchor"
                size={28}
                color={tw.color('offWhite')}
              />
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`text-offWhite text-lg font-dmSemiBold`}
                numberOfLines={1}
              >
                {user?.name ?? 'Captain'}
              </Text>
              {voyageStartText ? (
                <Text
                  style={tw`text-muted text-sm font-dmRegular mt-0.5`}
                  numberOfLines={1}
                >
                  {voyageStartText}
                </Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={tw`border-t border-cardBorder py-3 px-4`}
            activeOpacity={0.8}
          >
            <Text style={tw`text-orange text-sm font-dmSemiBold text-center`}>
              Edit profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* NOTIFICATIONS */}
        <Text
          style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase mb-3`}
        >
          NOTIFICATIONS
        </Text>
        <View
          style={tw`rounded-2xl border border-cardBorder bg-orangeDim overflow-hidden mb-8`}
        >
          {/* Evening Reminder row with toggle */}
          <View
            style={tw`flex-row items-center px-4 py-4 border-b border-cardBorder`}
          >
            <View
              style={tw`w-12 h-12 rounded-2xl bg-navyLight items-center justify-center mr-3`}
            >
              <MaterialDesignIcons
                name="bell"
                size={24}
                color={tw.color('orange')}
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-offWhite text-base font-dmSemiBold`}>
                Evening Reminder
              </Text>
              <Text style={tw`text-muted text-xs font-dmRegular mt-0.5`}>
                Daily push notification.
              </Text>
            </View>
            <Switch
              value={user?.notificationEnabled ?? false}
              onValueChange={handleToggleReminder}
              disabled={updating}
              trackColor={{
                false: tw.color('navyDark'),
                true: tw.color('orange'),
              }}
              thumbColor={tw.color('offWhite')}
            />
          </View>

          {/* Reminder Time row - tap to open picker */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ReminderTime')}
            style={tw`flex-row items-center px-4 py-4`}
            activeOpacity={0.8}
          >
            <View
              style={tw`w-12 h-12 rounded-2xl bg-navyLight items-center justify-center mr-3`}
            >
              <MaterialDesignIcons
                name="clock-outline"
                size={24}
                color={tw.color('offWhite')}
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-offWhite text-base font-dmSemiBold`}>
                Reminder Time
              </Text>
              <Text style={tw`text-muted text-xs font-dmRegular mt-0.5`}>
                When should we remind you?
              </Text>
            </View>
            <Text style={tw`text-darkGreen text-sm font-dmSemiBold`}>
              {user?.notificationTime
                ? formatTimeForDisplay(user.notificationTime)
                : 'Not set'}
            </Text>
            <MaterialDesignIcons
              name="chevron-right"
              size={24}
              color={tw.color('muted')}
              style={tw`ml-1`}
            />
          </TouchableOpacity>
        </View>

        <View style={tw`mt-auto`}>
          <CommonButton label="Log Out" color="orange" onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
