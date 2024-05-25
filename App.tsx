/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView
} from 'react-native';

import TabLineGraph from './src/components/TabLineGraph';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <TabLineGraph />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
