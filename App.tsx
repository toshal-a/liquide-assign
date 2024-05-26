/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import TabLineGraph from './src/components/TabLineGraph';
import Button from './src/components/Button';

function App(): React.JSX.Element {
    const [showGraph, setShowGraph] = useState<boolean>(false);

    const onButtonPress = () => {
      setShowGraph(true);
    }

    const onHidePress = () => {
      setShowGraph(false);
    }

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <Button onPress={onButtonPress} title='Show Graph'/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={onHidePress} title='HideGraph'/>
          </View>
          {
            showGraph ? <TabLineGraph /> : null
          }
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})

export default App;
