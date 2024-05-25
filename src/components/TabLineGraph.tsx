import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Tabs from './Tabs';
import AnimatedLineGraph from './AnimatedLineGraph';
import { data } from '../data/chartData';

const TabLineGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const { points, secondPathColor } = data[activeTab];

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
          <AnimatedLineGraph points={points} secondPathColor={secondPathColor} />
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