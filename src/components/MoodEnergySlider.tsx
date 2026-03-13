import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from '../../lib/tailwind';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type Step = {
  label: string;
  value: number;
  icon: React.ReactElement;
};

const STEPS: Step[] = [
  {
    label: 'Terrible',
    value: 1,
    icon: (
      <MaterialDesignIcons
        name="emoticon-cry-outline"
        size={30}
        color="white"
      />
    ),
  },
  {
    label: 'Bad',
    value: 2,
    icon: (
      <MaterialDesignIcons
        name="emoticon-sad-outline"
        size={30}
        color="white"
      />
    ),
  },
  {
    label: 'OK',
    value: 3,
    icon: (
      <MaterialDesignIcons
        name="emoticon-neutral-outline"
        size={30}
        color="white"
      />
    ),
  },
  {
    label: 'Good',
    value: 4,
    icon: (
      <MaterialDesignIcons
        name="emoticon-happy-outline"
        size={30}
        color="white"
      />
    ),
  },
  {
    label: 'Great',
    value: 5,
    icon: (
      <MaterialDesignIcons
        name="emoticon-excited-outline"
        size={30}
        color="white"
      />
    ),
  },
];

interface MoodEnergySliderProps {
  initialValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export default function MoodEnergySlider({
  initialValue = 3,
  onChange,
  disabled = false,
}: MoodEnergySliderProps) {
  const [selected, setSelected] = useState(initialValue);
  const scaleAnims = useRef(STEPS.map(() => new Animated.Value(1))).current;

  // Sync internal state when initialValue changes (e.g. after API load in LogScreen).
  useEffect(() => {
    setSelected(initialValue);
  }, [initialValue]);

  const handleSelect = (value: number) => {
    if (disabled) return;
    // Animate the tapped node
    const idx = value - 1;
    Animated.sequence([
      Animated.timing(scaleAnims[idx], {
        toValue: 1.25,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[idx], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    setSelected(value);
    onChange?.(value);
  };

  const getNodeStyle = (value: number) => {
    if (value === selected) return tw.color('orange');
    if (value < selected) return tw.color('teal'); // already visited
    return tw.color('navyDark/60'); // not yet reached
  };

  const fillFraction = (selected - 1) / (STEPS.length - 1);

  return (
    <View
      style={[
        tw`rounded-lg p-4 border border-cardBorder bg-orangeDim`,
        disabled ? tw`opacity-60` : tw`opacity-100`,
        {
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        },
      ]}
    >
      {/* Header */}
      <Text
        style={tw`text-offWhite text-sm font-dmSemiBold tracking-widest uppercase mb-0.5`}
      >
        Mood & Energy
      </Text>
      <Text style={tw`text-muted text-xs font-dmMedium mb-6`}>
        How are you feeling today? Be honest, Captain.
      </Text>

      {/* Track + Nodes */}
      <View style={tw`relative justify-center`}>
        {/* Full background track */}
        <View
          style={tw`absolute left-0 right-0 h-[3px] rounded-full bg-navy/40 mx-5`}
        />

        {/* Filled (active) track */}
        <View
          style={[
            tw`absolute h-[3px] rounded-full bg-orange`,
            {
              left: 20,
              right: `${(1 - fillFraction) * 100}%`,
            },
          ]}
        />

        {/* Nodes */}
        <View style={tw`flex-row justify-between`}>
          {STEPS.map((step, index) => {
            const isSelected = step.value === selected;
            const bgColor = getNodeStyle(step.value);

            return (
              <TouchableOpacity
                key={step.value}
                activeOpacity={disabled ? 1 : 0.85}
                onPress={() => handleSelect(step.value)}
                style={tw`items-center justify-center`}
              >
                <Animated.View
                  style={[
                    tw`items-center justify-center rounded-full`,
                    {
                      width: isSelected ? 54 : 46,
                      height: isSelected ? 54 : 46,
                      backgroundColor: bgColor,
                      transform: [{ scale: scaleAnims[index] }],
                      // Glow ring on selected
                      shadowColor: isSelected
                        ? tw.color('orange')
                        : 'transparent',
                      shadowOpacity: isSelected ? 0.6 : 0,
                      shadowRadius: isSelected ? 10 : 0,
                      shadowOffset: { width: 0, height: 0 },
                      elevation: isSelected ? 8 : 0,
                    },
                  ]}
                >
                  {step.icon}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Footer Labels */}
      <View style={tw`flex-row justify-between mt-4`}>
        <Text style={tw`text-muted text-xs font-dmMedium uppercase`}>
          Rough Seas
        </Text>
        <Text style={tw`text-muted text-xs font-dmMedium uppercase`}>
          Full Sail
        </Text>
      </View>
    </View>
  );
}
