import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import Tabs from './Tabs';
import AnimatedLineGraph from './AnimatedLineGraph';
import { data } from '../data/chartData';

const TabLineGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { points, secondPathColor } = data[activeTab];

  const transition = useSharedValue(1);

  useEffect(() => {
    transition.value = 0;
    transition.value = withTiming(1, { duration: 500 });
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} data={data} />
      <View style={styles.chartContainer}>
        <Animated.View style={animatedStyle}>
          <AnimatedLineGraph points={points} secondPathColor={secondPathColor} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: COLORS.background,
  },
  chartContainer: {
    marginHorizontal: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabLineGraph;