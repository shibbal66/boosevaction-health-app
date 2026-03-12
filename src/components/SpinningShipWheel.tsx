import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import tw from '../../lib/tailwind';
import ShipWheel from '../assets/icons/ShipWheel';

type Props = {
  color?: string;
  width?: number;
  height?: number;
  duration?: number;
  style?: string;
};

const SpinningShipWheel: React.FC<Props> = ({
  color = 'rgba(255,255,255,0.03)',
  width = 400,
  height = 400,
  duration = 20000,
  style = 'absolute -top-20 -right-20',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue, duration]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View
      style={[tw`${style}`, { transform: [{ rotate: spin }] }]}
    >
      <ShipWheel color={color} width={width} height={height} />
    </Animated.View>
  );
};

export default SpinningShipWheel;
