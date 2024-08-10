/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import ProductList from './src/products/ProductList';

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
        {/* <ScrollView>
          <View style={styles.buttonContainer}>
            <Button onPress={onButtonPress} title='Show Graph'/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={onHidePress} title='HideGraph'/>
          </View>
          {
            showGraph ? <TabNavigator /> : null
          }
        </ScrollView> */}
        {/* <ScrollView> */}
        {/* <ApiCallProvider>
          <ApiCallTsx />
        </ApiCallProvider> */}
        <ProductList />
        {/* </ScrollView> */}
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
