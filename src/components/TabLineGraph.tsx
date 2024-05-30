import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { data } from '../data/chartData';
import { COLORS } from '../utils/constants';
import { calculatePaths } from '../utils/pathUtils';
import AnimatedLineGraph from './AnimatedLineGraph';
import Tabs from './Tabs';

const TabLineGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const prevPathData1 = useRef<string | null>(null);
  const prevPathData2 = useRef<string | null>(null);

  const { secondPathColor, pathData1, pathData2, path1Changed, path2Changed } = useMemo(() => {
    const { points, secondPathColor } = data[activeTab];
    const { pathData1, pathData2 } = calculatePaths(points);
    const path1Changed = pathData1 !== prevPathData1.current;
    const path2Changed = pathData2 !== prevPathData2.current;

    prevPathData1.current = pathData1;
    prevPathData2.current = pathData2;

    return { secondPathColor, pathData1, pathData2, path1Changed, path2Changed };
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
          <AnimatedLineGraph
            pathData1={pathData1}
            pathData2={pathData2}
            path1Changed={path1Changed}
            path2Changed={path2Changed}
            secondPathColor={secondPathColor}
          />
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
