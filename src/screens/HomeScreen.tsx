import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import CommonButton from '../components/CommonButton';
import SpinningShipWheel from '../components/SpinningShipWheel';
import useVoyage from '../hooks/useVoyage';
import { formatDisplayDate } from '../utils/helpers';

export const HomeScreen: React.FC = () => {
  const { voyage, analytics, getVoyageAll } = useVoyage({ showToasts: false });
  const [loading, setLoading] = useState(false);

  const today = voyage?.days?.[0];

  const formattedDate = useMemo(() => formatDisplayDate(new Date()), []);

  const loadVoyage = useCallback(async () => {
    try {
      setLoading(true);
      await getVoyageAll();
    } finally {
      setLoading(false);
    }
  }, [getVoyageAll]);

  useEffect(() => {
    loadVoyage();
  }, [loadVoyage]);

  const handleLogHabitsPress = useCallback(() => {
    // TODO: Navigate to habits logging screen when available
  }, []);

  return (
    <View style={tw`flex-1 bg-navy`}>
      <GridBackground />
      <SpinningShipWheel />
      <View style={tw`flex-1 px-4 py-15`}>
        <View style={tw`flex-row items-center `}>
          <MaterialDesignIcons
            name="anchor"
            size={24}
            color={tw.color('offWhite')}
          />
          <Text
            style={tw`text-offWhite text-lg font-crimsonProRegular uppercase ml-2 tracking-widest`}
          >
            The Captain's Log
          </Text>
        </View>
        <Text
          style={tw`text-offWhite text-base font-crimsonProRegular tracking-widest`}
        >
          {formattedDate}
        </Text>
        <View
          style={tw`border border-cardBorder bg-orangeDim rounded-lg p-4 mt-4`}
        >
          <Text
            style={tw`text-offWhite text-lg font-crimsonProRegular tracking-widest text-center`}
          >
            Voyage Status
          </Text>
          <Text
            style={tw`text-orange text-8xl font-playfairDisplayBold text-center`}
          >
            {analytics?.totalDays ?? 0}
          </Text>
          <Text
            style={tw`text-offWhite text-xl font-crimsonProRegular text-center uppercase`}
          >
            Days at Sea
          </Text>
          <View style={tw`flex-row justify-between mt-4`}>
            <View style={tw`items-center border-r border-cardBorder w-1/3 p-2`}>
              <Text
                style={tw`text-offWhite text-4xl font-playfairDisplayBlack`}
              >
                {analytics?.checkedIn ?? 0}
              </Text>
              <Text
                style={tw`text-muted text-xs font-dmMedium tracking-widest text-center uppercase`}
              >
                Checked In
              </Text>
            </View>
            <View style={tw`items-center border-r border-cardBorder w-1/3 p-2`}>
              <Text
                style={tw`text-offWhite text-4xl font-playfairDisplayBlack`}
              >
                {analytics?.alcoholFree ?? 0}%
              </Text>
              <Text
                style={tw`text-muted text-xs font-dmMedium tracking-widest text-center uppercase`}
              >
                Alcohol Free
              </Text>
            </View>
            <View style={tw`items-center w-1/3 p-2`}>
              <Text
                style={tw`text-offWhite text-4xl font-playfairDisplayBlack uppercase`}
              >
                {analytics?.averageMood ?? 0}
              </Text>
              <Text
                style={tw`text-muted text-xs font-dmMedium tracking-widest text-center uppercase`}
              >
                AVG Mood
              </Text>
            </View>
          </View>
        </View>
        <View style={tw`mt-4`}>
          <Text
            style={tw`text-offWhite text-base font-dmSemiBold tracking-widest`}
          >
            Daily Summary
          </Text>
          <View
            style={tw`border border-cardBorder bg-orangeDim rounded-lg p-4 mt-4`}
          >
            <View>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-offWhite text-base font-dmMedium`}>
                  Habits Completed
                </Text>
                <View
                  style={tw`flex-row items-center px-3 py-1 rounded-full bg-navy/40`}
                >
                  <View
                    style={tw`w-2 h-2 rounded-full mr-2 ${
                      today?.completed ? 'bg-orange' : 'bg-muted'
                    }`}
                  />
                  <Text
                    style={tw`text-xs font-dmMedium tracking-widest uppercase ${
                      today?.completed ? 'text-orange' : 'text-muted'
                    }`}
                  >
                    {today?.completed ? 'Logged for Today' : 'Not Logged'}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-muted text-xs font-dmMedium mt-1`}>
                {today?.completed
                  ? 'Nice work – come back tomorrow to add another entry.'
                  : "You haven't logged today’s habits yet."}
              </Text>
            </View>
            <View style={tw`flex-row justify-between mt-4 gap-2`}>
              <View
                style={[
                  tw`flex-1 items-center border rounded-lg py-3 px-2`,
                  today?.alcohol
                    ? tw`border-orange bg-navy/40`
                    : tw`border-cardBorder bg-navy/10 opacity-40`,
                ]}
              >
                <MaterialDesignIcons
                  name="beer"
                  size={24}
                  color={
                    today?.alcohol ? tw.color('offWhite') : tw.color('muted')
                  }
                />
                <Text
                  style={tw`${
                    today?.alcohol ? 'text-offWhite' : 'text-muted'
                  } text-xs font-dmMedium tracking-widest text-center uppercase mt-2`}
                >
                  Alcohol{'\n'}Free
                </Text>
              </View>
              <View
                style={[
                  tw`flex-1 items-center border rounded-lg py-3 px-2`,
                  today?.caffeine
                    ? tw`border-orange bg-navy/40`
                    : tw`border-cardBorder bg-navy/10 opacity-40`,
                ]}
              >
                <MaterialDesignIcons
                  name="coffee"
                  size={24}
                  color={
                    today?.caffeine ? tw.color('offWhite') : tw.color('muted')
                  }
                />
                <Text
                  style={tw`${
                    today?.caffeine ? 'text-offWhite' : 'text-muted'
                  } text-xs font-dmMedium tracking-widest text-center uppercase mt-2`}
                >
                  No Late{'\n'}Caffeine
                </Text>
              </View>
              <View
                style={[
                  tw`flex-1 items-center border rounded-lg py-3 px-2`,
                  today?.food
                    ? tw`border-orange bg-navy/40`
                    : tw`border-cardBorder bg-navy/10 opacity-40`,
                ]}
              >
                <MaterialDesignIcons
                  name="weather-night"
                  size={24}
                  color={today?.food ? tw.color('offWhite') : tw.color('muted')}
                />
                <Text
                  style={tw`${
                    today?.food ? 'text-offWhite' : 'text-muted'
                  } text-xs font-dmMedium tracking-widest text-center uppercase mt-2`}
                >
                  Late{'\n'}Meals
                </Text>
              </View>
            </View>
            <View style={tw`mt-4`}>
              <CommonButton
                onPress={handleLogHabitsPress}
                label={
                  today?.completed
                    ? "Today's habits logged"
                    : "Log today's habits"
                }
                variant={today?.completed ? 'outlined' : 'filled'}
                disabled={today?.completed}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
