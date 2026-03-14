import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '../../lib/tailwind';
import { useAppSelector } from '../store';
import { selectIsOnline } from '../store/networkSlice';

/**
 * App-wide banner shown at the top of the screen when the user is offline.
 * Rendered at root so it appears on every screen.
 */
const OfflineBanner: React.FC = () => {
  const isOnline = useAppSelector(selectIsOnline);

  if (isOnline) {
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={tw`bg-orange/90`}>
      <View style={tw`px-4 py-2`}>
        <Text
          style={tw`text-navy text-center font-dmSemiBold text-sm tracking-widest uppercase`}
        >
          You're offline
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OfflineBanner;
