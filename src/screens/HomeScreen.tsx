import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import CommonButton from '../components/CommonButton';
import SpinningShipWheel from '../components/SpinningShipWheel';

export const HomeScreen: React.FC = () => {
  // TODO: Replace this with real data from your log store
  const todayLog = {
    isLogged: false,
    habits: {
      alcoholFree: false,
      noLateCaffeine: false,
      lateMeals: false,
    },
  };

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
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
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
            12
          </Text>
          <Text
            style={tw`text-offWhite text-xl font-crimsonProRegular text-center uppercase -mt-5`}
          >
            Days at Sea
          </Text>
          <View style={tw`flex-row justify-between mt-4`}>
            <View style={tw`items-center border-r border-cardBorder w-1/3 p-2`}>
              <Text
                style={tw`text-offWhite text-4xl font-playfairDisplayBlack`}
              >
                9
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
                87%
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
                3.8
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
                      todayLog.isLogged ? 'bg-orange' : 'bg-muted'
                    }`}
                  />
                  <Text
                    style={tw`text-xs font-dmMedium tracking-widest uppercase ${
                      todayLog.isLogged ? 'text-orange' : 'text-muted'
                    }`}
                  >
                    {todayLog.isLogged ? 'Logged for Today' : 'Not Logged'}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-muted text-xs font-dmMedium mt-1`}>
                {todayLog.isLogged
                  ? 'Nice work – come back tomorrow to add another entry.'
                  : "You haven't logged today’s habits yet."}
              </Text>
            </View>
            <View style={tw`flex-row justify-between mt-4 gap-2`}>
              <View
                style={[
                  tw`flex-1 items-center border rounded-lg py-3 px-2`,
                  todayLog.habits.alcoholFree
                    ? tw`border-orange bg-navy/40`
                    : tw`border-cardBorder bg-navy/10 opacity-40`,
                ]}
              >
                <MaterialDesignIcons
                  name="beer"
                  size={24}
                  color={
                    todayLog.habits.alcoholFree
                      ? tw.color('offWhite')
                      : tw.color('muted')
                  }
                />
                <Text
                  style={tw`${
                    todayLog.habits.alcoholFree ? 'text-offWhite' : 'text-muted'
                  } text-xs font-dmMedium tracking-widest text-center uppercase mt-2`}
                >
                  Alcohol{'\n'}Free
                </Text>
              </View>
              <View
                style={[
                  tw`flex-1 items-center border rounded-lg py-3 px-2`,
                  todayLog.habits.noLateCaffeine
                    ? tw`border-orange bg-navy/40`
                    : tw`border-cardBorder bg-navy/10 opacity-40`,
                ]}
              >
                <MaterialDesignIcons
                  name="coffee"
                  size={24}
                  color={
                    todayLog.habits.noLateCaffeine
                      ? tw.color('offWhite')
                      : tw.color('muted')
                  }
                />
                <Text
                  style={tw`${
                    todayLog.habits.noLateCaffeine
                      ? 'text-offWhite'
                      : 'text-muted'
                  } text-xs font-dmMedium tracking-widest text-center uppercase mt-2`}
                >
                  No Late{'\n'}Caffeine
                </Text>
              </View>
              <View
                style={[
                  tw`flex-1 items-center border rounded-lg py-3 px-2`,
                  todayLog.habits.lateMeals
                    ? tw`border-orange bg-navy/40`
                    : tw`border-cardBorder bg-navy/10 opacity-40`,
                ]}
              >
                <MaterialDesignIcons
                  name="weather-night"
                  size={24}
                  color={
                    todayLog.habits.lateMeals
                      ? tw.color('offWhite')
                      : tw.color('muted')
                  }
                />
                <Text
                  style={tw`${
                    todayLog.habits.lateMeals ? 'text-offWhite' : 'text-muted'
                  } text-xs font-dmMedium tracking-widest text-center uppercase mt-2`}
                >
                  Late{'\n'}Meals
                </Text>
              </View>
            </View>
            <View style={tw`mt-4`}>
              <CommonButton
                onPress={() => {}}
                label={
                  todayLog.isLogged
                    ? "Today's habits logged"
                    : "Log today's habits"
                }
                variant={todayLog.isLogged ? 'outlined' : 'filled'}
                color={todayLog.isLogged ? 'muted' : 'orange'}
                disabled={todayLog.isLogged}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
