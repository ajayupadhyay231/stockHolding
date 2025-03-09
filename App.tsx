import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StockHoldingScreen from './src/screens/StockHoldingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App : React.FC = () => {   // React.FC to define functional Component type...
  return (
    <SafeAreaView style={styles.appContainer}>
      <GestureHandlerRootView style={{ flex: 1 }}>  
        <StockHoldingScreen></StockHoldingScreen>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    width:"100%",
    backgroundColor:"grey"
  },
});
