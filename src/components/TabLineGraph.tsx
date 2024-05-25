import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { data } from '../data/chartData';
import { COLORS } from '../utils/constants';
import AnimatedLineGraph from './AnimatedLineGraph';
import Tabs from './Tabs';

const TabLineGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const points = data[activeTab];

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
          <AnimatedLineGraph points={points} />
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