import { StatusBar, useColorScheme, View, Text } from 'react-native';
import tw from './lib/tailwind';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

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
      <View >
        <Text style={tw`text-4xl text-blue-500 font-sfProRounded mt-100`}>Hello World</Text>
      </View>
    </SafeAreaProvider>
  );
}

export default App;
