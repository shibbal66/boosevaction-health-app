import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const GRID_SIZE = 28;
const GRID_COLOR = 'rgba(46,122,140,0.05)';

export const GridBackground: React.FC = () => {
  const { width, height } = Dimensions.get('window');
  const numVerticalLines = Math.ceil(width / GRID_SIZE) + 1;
  const numHorizontalLines = Math.ceil(height / GRID_SIZE) + 1;

  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: numVerticalLines }).map((_, index) => (
        <View
          key={`v-${index}`}
          style={[styles.verticalLine, { left: index * GRID_SIZE }]}
        />
      ))}
      {Array.from({ length: numHorizontalLines }).map((_, index) => (
        <View
          key={`h-${index}`}
          style={[styles.horizontalLine, { top: index * GRID_SIZE }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: GRID_COLOR,
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: GRID_COLOR,
  },
});

export default GridBackground;

