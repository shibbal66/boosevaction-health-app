import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
