import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { data } from '../data/chartData';
import { COLORS } from '../utils/constants';
import AnimatedLineGraph from './AnimatedLineGraph';
import Tabs from './Tabs';
import { calculatePaths } from '../utils/pathUtils';

const TabLineGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const { secondPathColor, pathData1, pathData2 } = useMemo(() => {
    const { points, secondPathColor } = data[activeTab];
    const { pathData1, pathData2 } = calculatePaths(points);
    return { points, secondPathColor, pathData1, pathData2 };
  }, [activeTab]);

  const transition = useSharedValue(1);
  const translateX = useSharedValue(0);

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

  const handleSwipe = (direction: string) => {
    const tabKeys = Object.keys(data);
    const currentIndex = tabKeys.indexOf(activeTab);
    let newIndex = currentIndex;

    if (direction === 'left' && currentIndex > 0) {
      newIndex -= 1;
    } else if (direction === 'right' && currentIndex < tabKeys.length - 1) {
      newIndex += 1;
    }

    setActiveTab(tabKeys[newIndex]);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX > 50) {
        runOnJS(handleSwipe)('left');
      } else if (event.translationX < -50) {
        runOnJS(handleSwipe)('right');
      }
      translateX.value = withTiming(0);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} data={data} />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.chartContainer, animatedStyle]}>
          <AnimatedLineGraph initialPathData1={pathData1} initialPathData2={pathData2} secondPathColor={secondPathColor} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
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
