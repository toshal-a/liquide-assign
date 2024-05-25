import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/constants';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  data: { [key: string]: { points: number[], secondPathColor: string } };
}

const tabWidth = 100; 
const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, data }) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    const tabIndex = Object.keys(data).indexOf(activeTab);
    translateX.value = withTiming(tabIndex * tabWidth, { duration: 300 });
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabs}>
        <Animated.View style={[styles.activeTab, animatedStyle]} />
        {Object.keys(data).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => onTabChange(tab)}
          >
            <Text style={styles.tabText}>{tab.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    position: 'relative',
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

export default Tabs;