import React, { useMemo } from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import tw from '../../lib/tailwind';

const CHART_HEIGHT = 160;
const MOOD_SCORE_MAX = 5;

export type MoodTrendChartProps = {
  labels: string[];
  data: number[];
  width: number;
};

export const MoodTrendChart: React.FC<MoodTrendChartProps> = ({
  labels,
  data,
  width,
}) => {
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [{ data: data.length ? data : [0] }],
    }),
    [labels, data],
  );

  const chartConfig = useMemo(
    () => ({
      backgroundColor: 'transparent',
      backgroundGradientFrom: tw.color('navyDark'),
      backgroundGradientTo: tw.color('navyDark'),
      backgroundGradientFromOpacity: 1,
      backgroundGradientToOpacity: 1,
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(46, 122, 140, ${opacity})` /* teal */,
      labelColor: () => tw.color('muted'),
      style: { paddingRight: 0 },
      propsForLabels: { fontSize: 11 },
      yAxisSuffix: '',
      yAxisLabel: '',
    }),
    [],
  );

  return (
    <View style={tw`px-2 pb-2`}>
      <LineChart
        data={chartData}
        width={width}
        height={CHART_HEIGHT}
        chartConfig={chartConfig}
        bezier
        withDots
        withInnerLines
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        style={tw`self-center`}
        withVerticalLabels
        withHorizontalLabels
        segments={MOOD_SCORE_MAX}
      />
    </View>
  );
};

export default MoodTrendChart;
