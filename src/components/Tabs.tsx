import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/constants';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  data: { [key: string]: { points: number[], secondPathColor: string } };
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange, data }) => (
  <View style={styles.tabs}>
    {Object.keys(data).map((tab) => (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, activeTab === tab && styles.activeTab]}
        onPress={() => onTabChange(tab)}
      >
        <Text style={styles.tabText}>{tab.toUpperCase()}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabs: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeTab: {
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
  },
});

export default Tabs;
