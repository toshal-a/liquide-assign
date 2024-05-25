/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  ScrollView
} from 'react-native';

import TabLineGraph from './src/components/TabLineGraph';

function App(): React.JSX.Element {
  return (
    <ScrollView>
      <TabLineGraph />
    </ScrollView>
  );
}

export default App;
