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
import GorgonBottomSheetModal from './src/components/GorgonBottomSheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): React.JSX.Element {
    const [showGraph, setShowGraph] = useState<boolean>(false);

    const onButtonPress = () => {
      setShowGraph(true);
    }

    const onHidePress = () => {
      setShowGraph(false);
    }

    return (
      <>
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
        { 
          /* <ProductList />*/
        }
        <GestureHandlerRootView>
        <GorgonBottomSheetModal />
        </GestureHandlerRootView>
        {/* </ScrollView> */}
      </>
      
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  }
})

export default App;
