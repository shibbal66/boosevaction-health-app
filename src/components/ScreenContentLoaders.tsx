import React from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import tw from '../../lib/tailwind';
import colors from '../utils/colors';

const backgroundColor = colors.navyDark;
const foregroundColor = colors.navy;

export function HomeContentLoader() {
  return (
    <View style={tw`flex-1 bg-navy`}>
      <View style={tw`px-4 py-15`}>
        {/* Title line */}
        <ContentLoader
          viewBox="0 0 280 40"
          width="100%"
          height={40}
          backgroundColor={tw.color('navy')}
          foregroundColor={foregroundColor}
          style={tw`mb-2`}
        >
          <Rect x="60" y="8" rx="2" ry="2" width="160" height="24" />
        </ContentLoader>
        {/* Date line */}
        <ContentLoader
          viewBox="0 0 200 20"
          width="100%"
          height={20}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={tw`mb-6`}
        >
          <Rect x="70" y="0" rx="2" ry="2" width="60" height="16" />
        </ContentLoader>
        {/* Voyage Status card */}
        <ContentLoader
          viewBox="0 0 340 200"
          width="100%"
          height={200}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={tw`rounded-lg mb-6`}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="340" height="44" />
          <Rect x="120" y="56" rx="4" ry="4" width="100" height="72" />
          <Rect x="100" y="140" rx="2" ry="2" width="140" height="20" />
          <Rect x="20" y="180" rx="2" ry="2" width="90" height="16" />
          <Rect x="125" y="180" rx="2" ry="2" width="90" height="16" />
          <Rect x="230" y="180" rx="2" ry="2" width="90" height="16" />
        </ContentLoader>
        {/* Daily Summary section */}
        <ContentLoader
          viewBox="0 0 340 24"
          width="100%"
          height={24}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={tw`mb-3`}
        >
          <Rect x="0" y="0" rx="2" ry="2" width="140" height="20" />
        </ContentLoader>
        <ContentLoader
          viewBox="0 0 340 180"
          width="100%"
          height={180}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={tw`rounded-lg`}
        >
          <Rect x="0" y="0" rx="8" ry="8" width="340" height="50" />
          <Rect x="0" y="60" rx="4" ry="4" width="340" height="52" />
          <Rect x="40" y="128" rx="8" ry="8" width="260" height="44" />
        </ContentLoader>
      </View>
    </View>
  );
}

export function LogContentLoader() {
  return (
    <View style={tw`flex-1 bg-navy px-4`}>
      {/* Header block */}
      <ContentLoader
        viewBox="0 0 320 80"
        width="100%"
        height={80}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mt-6 mb-6`}
      >
        <Rect x="100" y="0" rx="2" ry="2" width="120" height="14" />
        <Rect x="80" y="24" rx="2" ry="2" width="160" height="16" />
        <Rect x="90" y="48" rx="2" ry="2" width="140" height="28" />
      </ContentLoader>
      {/* Today's Habits label */}
      <ContentLoader
        viewBox="0 0 200 24"
        width="100%"
        height={24}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mb-3`}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="160" height="20" />
      </ContentLoader>
      {/* Three habit rows */}
      {[0, 1, 2].map(i => (
        <ContentLoader
          key={i}
          viewBox="0 0 320 72"
          width="100%"
          height={72}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={tw`rounded-lg mb-3`}
        >
          <Circle cx="36" cy="36" r="24" />
          <Rect x="72" y="14" rx="2" ry="2" width="180" height="18" />
          <Rect x="72" y="40" rx="2" ry="2" width="220" height="14" />
        </ContentLoader>
      ))}
      {/* Mood section */}
      <ContentLoader
        viewBox="0 0 320 80"
        width="100%"
        height={80}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mt-4 mb-4`}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="200" height="20" />
        <Rect x="0" y="36" rx="8" ry="8" width="320" height="40" />
      </ContentLoader>
      {/* Submit button */}
      <ContentLoader
        viewBox="0 0 320 48"
        width="100%"
        height={48}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mt-4 rounded-lg`}
      >
        <Rect x="0" y="0" rx="8" ry="8" width="320" height="48" />
      </ContentLoader>
    </View>
  );
}

export function HistoryContentLoader() {
  return (
    <View style={tw`flex-1 bg-navy px-4 pt-2`}>
      {/* Title + date range */}
      <ContentLoader
        viewBox="0 0 280 50"
        width="100%"
        height={50}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mb-8`}
      >
        <Rect x="60" y="0" rx="2" ry="2" width="160" height="28" />
        <Rect x="80" y="36" rx="2" ry="2" width="120" height="14" />
      </ContentLoader>
      {/* Mood trend label */}
      <ContentLoader
        viewBox="0 0 200 20"
        width="100%"
        height={20}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mb-2`}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="180" height="16" />
      </ContentLoader>
      {/* Chart card */}
      <ContentLoader
        viewBox="0 0 340 180"
        width="100%"
        height={180}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`rounded-xl mb-8`}
      >
        <Rect x="16" y="12" rx="2" ry="2" width="200" height="14" />
        <Rect x="20" y="40" rx="4" ry="4" width="300" height="120" />
      </ContentLoader>
      {/* Daily records label */}
      <ContentLoader
        viewBox="0 0 180 20"
        width="100%"
        height={20}
        backgroundColor={backgroundColor}
        foregroundColor={foregroundColor}
        style={tw`mb-3`}
      >
        <Rect x="0" y="0" rx="2" ry="2" width="140" height="16" />
      </ContentLoader>
      {/* 7 day rows */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <ContentLoader
          key={i}
          viewBox="0 0 340 64"
          width="100%"
          height={64}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          style={tw`rounded-xl mb-3`}
        >
          <Rect x="0" y="12" rx="4" ry="4" width="48" height="40" />
          <Rect x="64" y="16" rx="2" ry="2" width="180" height="14" />
          <Rect x="64" y="36" rx="2" ry="2" width="240" height="12" />
        </ContentLoader>
      ))}
    </View>
  );
}
