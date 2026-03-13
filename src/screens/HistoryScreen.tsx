import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import MoodTrendChart from '../components/MoodTrendChart';
import useVoyage from '../hooks/useVoyage';
import { formatShortDateRange, moodToScore, toISODate } from '../utils/helpers';
import type { VoyageDay } from '../api/voyage';

const MOOD_SCORE_MAX = 5;

type DayForDisplay = {
  date: Date;
  dateStr: string;
  dayNum: number;
  dayLabel: string;
  isToday: boolean;
  record: VoyageDay | undefined;
};

function getLast7Days(): DayForDisplay[] {
  const out: DayForDisplay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    out.push({
      date: d,
      dateStr: toISODate(d),
      dayNum: d.getDate(),
      dayLabel: i === 0 ? 'TODAY' : dayLabels[d.getDay()],
      isToday: i === 0,
      record: undefined,
    });
  }
  return out;
}

function mergeDaysWithRecords(
  days: DayForDisplay[],
  records: VoyageDay[] | undefined,
): DayForDisplay[] {
  if (!records?.length) return days;
  const byDate: Record<string, VoyageDay> = {};
  records.forEach(r => {
    byDate[r.date] = r;
  });
  return days.map(d => ({
    ...d,
    record: byDate[d.dateStr],
  }));
}

export const HistoryScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const { voyage, getVoyage, loadingVoyage } = useVoyage({ showToasts: false });

  const fetchHistory = useCallback(async () => {
    await getVoyage({ limit: 7 });
  }, [getVoyage]);

  React.useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const daysForDisplay = useMemo(() => {
    const base = getLast7Days();
    return mergeDaysWithRecords(base, voyage?.days);
  }, [voyage?.days]);

  const dateRangeText = useMemo(() => {
    if (daysForDisplay.length < 2) return '';
    const oldest = daysForDisplay[daysForDisplay.length - 1]!.date;
    const newest = daysForDisplay[0]!.date;
    return formatShortDateRange(oldest, newest);
  }, [daysForDisplay]);

  const chartLabels = useMemo(() => {
    const reversed = [...daysForDisplay].reverse();
    return reversed.map(d => (d.isToday ? 'Today' : d.dayLabel));
  }, [daysForDisplay]);

  const chartData = useMemo(() => {
    const reversed = [...daysForDisplay].reverse();
    return reversed.map(d => moodToScore(d.record?.mood ?? null));
  }, [daysForDisplay]);

  if (loadingVoyage && !voyage) {
    return (
      <SafeAreaView style={tw`flex-1 bg-navy`}>
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color={tw.color('teal')} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-navy`} edges={['top']}>
      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`pb-8`}
        showsVerticalScrollIndicator={false}
      >
        <GridBackground />
        <View style={tw`px-4 pt-2`}>
          {/* Header: anchor — VOYAGE LOG — anchor */}
          <View style={tw`flex-row items-center justify-center gap-2 mb-1`}>
            <MaterialDesignIcons
              name="anchor"
              size={20}
              color={tw.color('muted')}
            />
            <Text
              style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase`}
            >
              VOYAGE LOG
            </Text>
            <MaterialDesignIcons
              name="anchor"
              size={20}
              color={tw.color('muted')}
            />
          </View>
          <Text
            style={tw`text-offWhite text-2xl font-dmSemiBold text-center mt-1`}
          >
            7-Day History
          </Text>
          <Text
            style={tw`text-muted text-sm font-dmRegular text-center mt-0.5`}
          >
            {dateRangeText}
          </Text>

          {/* Mood & Energy Trend */}
          <Text
            style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase mt-8 mb-2`}
          >
            MOOD & ENERGY TREND
          </Text>
          <View
            style={[
              tw`rounded-xl border border-cardBorder overflow-hidden`,
              { backgroundColor: tw.color('navyMid') ?? 'rgba(26,53,80,0.6)' },
            ]}
          >
            <Text
              style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase pt-3 px-4`}
            >
              MOOD SCORE • LAST 7 DAYS
            </Text>
            <MoodTrendChart
              labels={chartLabels}
              data={chartData}
              width={width - 32}
            />
          </View>

          {/* Daily Records */}
          <Text
            style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase mt-8 mb-3`}
          >
            DAILY RECORDS
          </Text>
          <View style={tw`gap-3`}>
            {daysForDisplay.map(day => (
              <View
                key={day.dateStr}
                style={[
                  tw`flex-row items-center rounded-xl border border-cardBorder px-4 py-3`,
                  {
                    backgroundColor: tw.color('navyMid') ?? 'rgba(26,53,80,0.6)',
                  },
                ]}
              >
                {/* Left: day number + label */}
                <View style={tw`w-12 items-center mr-3`}>
                  <Text style={tw`text-offWhite text-xl font-dmSemiBold`}>
                    {day.dayNum}
                  </Text>
                  <Text
                    style={[
                      tw`text-xs font-dmMedium`,
                      day.isToday
                        ? { color: tw.color('orange') }
                        : tw`text-muted`,
                    ]}
                  >
                    {day.dayLabel}
                  </Text>
                </View>

                {/* Middle: habits + mood bar or "No check-in recorded" */}
                <View style={tw`flex-1`}>
                  {day.record?.completed ? (
                    <>
                      <Text
                        style={tw`text-muted text-xs font-dmMedium mb-1`}
                      >
                        Mood
                      </Text>
                      <View style={tw`flex-row items-center gap-2 mb-2`}>
                        <MaterialDesignIcons
                          name="anchor"
                          size={20}
                          color={
                            day.record.alcohol
                              ? tw.color('tealLight')
                              : tw.color('muted')
                          }
                        />
                        <MaterialDesignIcons
                          name="coffee"
                          size={20}
                          color={
                            day.record.caffeine
                              ? tw.color('tealLight')
                              : tw.color('muted')
                          }
                        />
                        <MaterialDesignIcons
                          name="weather-night"
                          size={20}
                          color={
                            day.record.food
                              ? tw.color('tealLight')
                              : tw.color('muted')
                          }
                        />
                      </View>
                      <View
                        style={tw`h-2 rounded-full overflow-hidden bg-navy/60`}
                      >
                        <View
                          style={[
                            tw`h-full rounded-full`,
                            {
                              width: `${(moodToScore(day.record.mood) / MOOD_SCORE_MAX) * 100}%`,
                              backgroundColor: tw.color('tealLight'),
                            },
                          ]}
                        />
                      </View>
                    </>
                  ) : (
                    <Text
                      style={tw`text-muted text-xs font-dmRegular text-center py-2`}
                    >
                      — No check-in recorded —
                    </Text>
                  )}
                </View>

                {/* Right: mood score */}
                {day.record?.completed && day.record.mood != null && (
                  <View style={tw`w-8 items-end`}>
                    <Text style={tw`text-offWhite text-lg font-dmSemiBold`}>
                      {moodToScore(day.record.mood)}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
