import React, { ReactElement, createContext, isValidElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS } from '../utils/constants';
import { calculatePaths } from '../utils/pathUtils';
// import { data } from './chartData';

interface TabContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleSwipe: (direction: string) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);
const tabWidth = 100; 

export const TabProvider: React.FC = ({ children }: any) => {
  const childArray = React.Children.toArray(children) as ReactElement[];
  const initialTab = (childArray.length > 0 && isValidElement(childArray[0]) && childArray[0]?.props?.tabName)
      ? childArray[0].props.tabName : 'defaultTab';

  const handleTabChange = (tab: string) => {
      setActiveTab(tab);
  };

  const [activeTab, setActiveTab] = useState(
      initialTab
  );

  const data = useMemo(() => {
      const data = React.Children.toArray(children).reduce((acc, child) => {
        if (isValidElement(child)) {
          const { tabName, points, secondPathColor } = child.props;
          acc[tabName] = { points, secondPathColor };
        }
        return acc;
      }, {} as Record<string, { points: any, secondPathColor: any }>);

      return data;
  }, [children]);

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
    const tabIndex = Object.keys(data).indexOf(activeTab);
    translateX.value = withTiming(tabIndex * tabWidth, { duration: 300 });
  }, [activeTab]);

  const animatedTabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    transition.value = 0;
    transition.value = withTiming(1, { duration: 500 });
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));


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
    })
    .onEnd((event) => {
      if (event.translationX > 50) {
        runOnJS(handleSwipe)('left');
      } else if (event.translationX < -50) {
        runOnJS(handleSwipe)('right');
      }
    });

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, handleSwipe }}>
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.tabsContainer}>
          <View style={styles.tabs}>
            <Animated.View style={[styles.activeTab, animatedTabStyle]} />
            {Object.keys(data).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => handleTabChange(tab)}
              >
                <Text style={styles.tabText}>{tab.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.chartContainer, animatedStyle]}>
            {
              React.Children.map(children, (child) => {
                if (isValidElement(child)) {
                  const { tabName, component: Component } = child.props;
                  if (tabName !== activeTab) return null;
                  return (
                    <Component 
                      // {...child.Component.props} 
                      pathData1={pathData1}
                      pathData2={pathData2}
                      secondPathColor={secondPathColor}
                      path1Changed={path1Changed}
                      path2Changed={path2Changed}
                    />                    
                  );
                }
                return null;
              })
            }
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </TabContext.Provider>
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
  tabsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  tab: {
    paddingVertical: 10,
    width: tabWidth, // Adjust to the width of each tab
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    position: 'absolute',
    width: tabWidth, // Adjust to the width of each tab
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  tabText: {
    width: 100,
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.onPrimary,
  },
});

export const useTabContext = (): TabContextProps => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};
