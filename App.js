import React,{useRef, useEffect} from 'react';
import {AppState} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import {checkToken} from './api/user';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

const AppContent = () => {
  const appState = useRef(AppState.currentState)
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change', 
      async nextAppState => {
      if(appState.current.match(/inactive|background/) && 
        nextAppState === 'active'
      ){
        console.log('You are come back in the app')
        await checkToken();
      }
      appState.current = nextAppState
    })
    checkToken();
    console.log('Application has rendered');
  }, []) 
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        // paddingLeft: insets.left,
        // paddingRight: insets.right,
      }}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </View>
  )
}

export default App;
