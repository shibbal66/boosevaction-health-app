import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../navigation/types';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import useUserProfile from '../hooks/useUserProfile';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'ReminderTime'>;

/** Generate time options for full 24h: 12:00 AM to 11:30 PM in 30-min steps (24h "HH:mm") */
function getReminderTimeOptions(): string[] {
  const options: string[] = [];
  for (let h = 0; h <= 23; h++) {
    options.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 23) options.push(`${String(h).padStart(2, '0')}:30`);
  }
  return options;
}

function formatOption(time24: string): string {
  const [h = '0', m = '0'] = time24.split(':');
  const hour = parseInt(h, 10);
  const minute = parseInt(m, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

/** Normalize API time to "HH:mm" so it matches our option strings (e.g. "0:30" -> "00:30", "00:30:00" -> "00:30") */
function normalizeTimeToHHmm(value: string | null): string | null {
  if (!value || typeof value !== 'string') return null;
  const parts = value.trim().split(':');
  const h = parseInt(parts[0] ?? '0', 10);
  const m = parseInt(parts[1] ?? '0', 10);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const TIME_OPTIONS = getReminderTimeOptions();

export const ReminderTimeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, patchUser } = useUserProfile({ showToasts: true });
  const currentTime = normalizeTimeToHHmm(user?.notificationTime ?? null);
  const [savingTime, setSavingTime] = useState<string | null>(null);

  const handleSelect = useCallback(
    async (time24: string) => {
      setSavingTime(time24);
      try {
        await patchUser({ notificationTime: time24 });
        navigation.goBack();
      } catch {
        // Toast already shown by hook
      } finally {
        setSavingTime(null);
      }
    },
    [patchUser, navigation],
  );

  return (
    <View style={tw`flex-1 bg-navy`}>
      <GridBackground />
      <View style={tw`flex-1 px-6 pt-12`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`flex-row items-center mb-6`}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <MaterialDesignIcons
            name="arrow-left"
            size={30}
            color={tw.color('offWhite')}
          />
        </TouchableOpacity>

        <Text
          style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase mb-1`}
        >
          NOTIFICATIONS
        </Text>
        <Text
          style={tw`text-offWhite text-heading font-playfairDisplayBold mb-2`}
        >
          Reminder time
        </Text>
        <Text style={tw`text-muted text-base font-dmRegular mb-6`}>
          When should we remind you?
        </Text>

        <ScrollView
          style={tw`flex-1`}
          contentContainerStyle={tw`pb-8`}
          showsVerticalScrollIndicator={false}
        >
          {TIME_OPTIONS.map(time24 => {
            const isSelected = currentTime != null && currentTime === time24;
            const isSaving = savingTime === time24;
            return (
              <TouchableOpacity
                key={time24}
                onPress={() => handleSelect(time24)}
                disabled={savingTime !== null}
                style={[
                  tw`flex-row items-center justify-between border-b border-cardBorder py-4 px-4 rounded-xl mb-2`,
                  isSelected && tw`bg-orangeDim border border-orange`,
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    tw`text-base font-dmSemiBold`,
                    isSelected ? tw`text-orange` : tw`text-offWhite`,
                  ]}
                >
                  {formatOption(time24)}
                </Text>
                {isSaving ? (
                  <ActivityIndicator size="small" color={tw.color('orange')} />
                ) : isSelected ? (
                  <MaterialDesignIcons
                    name="check-circle"
                    size={24}
                    color={tw.color('orange')}
                  />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ReminderTimeScreen;
