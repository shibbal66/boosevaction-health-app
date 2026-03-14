import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import MoodEnergySlider from '../components/MoodEnergySlider';
import useVoyage from '../hooks/useVoyage';
import HabitToggle from '../components/HabitToggle';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { formatDisplayDate } from '../utils/helpers';
import CommonButton from '../components/CommonButton';
import type { VoyageMood } from '../api/voyage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogContentLoader } from '../components/ScreenContentLoaders';

export const LogScreen: React.FC = () => {
  const [mood, setMood] = React.useState<number>(4);
  const [alcoholFreeToday, setAlcoholFreeToday] = useState(false);
  const [noCaffeineAfterTwo, setNoCaffeineAfterTwo] = useState(false);
  const [noLateMeals, setNoLateMeals] = useState(false);
  const { voyage, analytics, getVoyageAll, logVoyage } = useVoyage({
    showToasts: true,
  });

  const today = voyage?.days?.[0] ?? null;
  const [loading, setLoading] = useState(true);

  const isCompleted = !!today?.completed;

  useEffect(() => {
    getVoyageAll().finally(() => setLoading(false));
  }, [getVoyageAll]);

  useEffect(() => {
    if (!today) {
      setAlcoholFreeToday(false);
      setNoCaffeineAfterTwo(false);
      setNoLateMeals(false);
      setMood(4);
      return;
    }

    setAlcoholFreeToday(!!today.alcohol);
    setNoCaffeineAfterTwo(!!today.caffeine);
    setNoLateMeals(!!today.food);
    if (today.mood) {
      const valueMap: Record<VoyageMood, number> = {
        TERRIBLE: 1,
        BAD: 2,
        OK: 3,
        GOOD: 4,
        GREAT: 5,
      };
      setMood(valueMap[today.mood]);
    }
  }, [today?.alcohol, today?.caffeine, today?.food, today?.mood]);

  const moodValueToApi = useMemo(() => {
    const map: Record<number, VoyageMood> = {
      1: 'TERRIBLE',
      2: 'BAD',
      3: 'OK',
      4: 'GOOD',
      5: 'GREAT',
    };
    return map[mood] ?? 'OK';
  }, [mood]);

  const handleSubmit = async () => {
    if (!voyage) return;
    try {
      await logVoyage({
        alcohol: alcoholFreeToday,
        caffeine: noCaffeineAfterTwo,
        food: noLateMeals,
        mood: moodValueToApi,
      });
      await getVoyageAll();
    } catch (error) {
      // logVoyage already surfaces a toast; avoid unhandled promise rejection
      console.error(error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-navy`} edges={['top']}>
        <LogContentLoader />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={tw`flex-1`}>
      <SafeAreaView style={tw`flex-1 bg-navy`}>
        <GridBackground />
        <View style={tw`flex-1 px-4`}>
          {/* Today's Log header above Today's Habits */}
          <View style={tw`mt-6 mb-2`}>
            <Text
              style={tw`text-tealLight text-xs font-dmBold tracking-[4px] text-center uppercase`}
            >
              Today's Log
            </Text>
            <Text
              style={tw`text-offWhite text-base font-crimsonProRegular text-center mt-1`}
            >
              {formatDisplayDate(new Date())} · Day {analytics?.totalDays ?? 0}
            </Text>
            <Text
              style={tw`text-offWhite text-heading font-playfairDisplayBold text-center mt-1`}
            >
              Daily Check-In
            </Text>
          </View>
          {isCompleted && (
            <View
              style={tw`mt-4 border border-orange bg-navy/40 rounded-lg px-4 py-3`}
            >
              <Text
                style={tw`text-orange text-xs font-dmBold tracking-widest uppercase text-center`}
              >
                Today's entry is locked in
              </Text>
              <Text
                style={tw`text-muted text-xs font-dmRegular text-center mt-1`}
              >
                You’ve already submitted today’s log. Come back tomorrow to
                chart new waters.
              </Text>
            </View>
          )}

          <View style={tw`mt-2`}>
            <Text
              style={tw`text-offWhite text-base font-dmSemiBold tracking-widest mb-3 uppercase`}
            >
              Today's Habits
            </Text>
            <View style={tw`gap-3`}>
              <HabitToggle
                title="Alcohol-Free Today"
                description="The primary commitment · most important"
                iconName="anchor"
                active={alcoholFreeToday}
                onToggle={setAlcoholFreeToday}
                disabled={isCompleted}
              />
              <HabitToggle
                title="No Caffeine After 2pm"
                description="Last cup before 14:00"
                iconName="coffee"
                active={noCaffeineAfterTwo}
                onToggle={setNoCaffeineAfterTwo}
                disabled={isCompleted}
              />
              <HabitToggle
                title="No Late Meals"
                description="Nothing large 3hrs before bedtime"
                iconName="weather-night"
                active={noLateMeals}
                onToggle={setNoLateMeals}
                disabled={isCompleted}
              />
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text
              style={tw`text-offWhite text-base font-dmSemiBold tracking-widest uppercase mb-2`}
            >
              How are you sailing?
            </Text>
            <MoodEnergySlider
              initialValue={mood}
              onChange={setMood}
              disabled={isCompleted}
            />
          </View>
          {!isCompleted && (
            <View style={tw`mt-6`}>
              <CommonButton
                label="Submit today's log"
                onPress={handleSubmit}
                variant="filled"
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LogScreen;
