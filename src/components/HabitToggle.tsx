import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from '../../lib/tailwind';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type Props = {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  active: boolean;
  onToggle: (next: boolean) => void;
  disabled?: boolean;
};

const HabitToggle: React.FC<Props> = ({
  title,
  description,
  iconName,
  active,
  onToggle,
  disabled = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.04,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [active, scaleAnim]);

  return (
    <Animated.View
      style={[
        tw`flex-row items-center rounded-3xl bg-navy/40 px-4 py-3 bg-orangeDim`,
        {
          borderWidth: 1,
          borderColor: active ? tw.color('orange') : tw.color('cardBorder'),
          transform: [{ scale: disabled ? 1 : scaleAnim }],
          shadowColor: active ? '#000' : 'transparent',
          shadowOpacity: active ? 0.3 : 0,
          shadowRadius: active ? 10 : 0,
          shadowOffset: { width: 0, height: 4 },
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <View
        style={tw`w-12 h-12 rounded-2xl bg-navy/70 items-center justify-center mr-3`}
      >
        <MaterialDesignIcons
          name={iconName}
          size={26}
          color={active ? tw.color('offWhite') : tw.color('muted')}
        />
      </View>
      <View style={tw`flex-1`}>
        <Text
          style={tw`text-offWhite text-base font-dmSemiBold`}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={tw`text-muted text-xs font-dmMedium mt-0.5`}
          numberOfLines={1}
        >
          {description}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.85}
        onPress={() => {
          if (disabled) return;
          onToggle(!active);
        }}
        style={[
          tw`ml-3 rounded-full px-0.5 py-0.5`,
          {
            width: 54,
            height: 32,
            backgroundColor: active ? tw.color('orange') : tw.color('navyDark'),
            borderWidth: 1,
            borderColor: active ? tw.color('orange') : tw.color('cardBorder'),
            justifyContent: 'center',
          },
        ]}
      >
        <View
          style={[
            tw`rounded-full bg-offWhite`,
            {
              width: 24,
              height: 24,
              alignSelf: active ? 'flex-end' : 'flex-start',
              shadowColor: '#000',
              shadowOpacity: 0.25,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            },
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default HabitToggle;
