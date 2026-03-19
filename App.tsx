import { Alert, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { initializeNetworkListener } from './src/services/network';
import { loadAuthState } from './src/services/authStorage';
import { setCredentials } from './src/store/authSlice';
import ToastHost from './src/components/ToastHost';
import messaging from '@react-native-firebase/messaging';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isBootstrapped, setIsBootstrapped] = useState(false);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted ✅');
    } else {
      console.error('Notification permission denied ❌');
    }
  };

  messaging().onMessage(async remoteMessage => {
    console.log('Notification received!', remoteMessage);
  });

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    let unsubscribeNetwork: (() => void) | undefined;

    const bootstrap = async () => {
      try {
        // Restore auth state from storage if available
        const storedAuth = await loadAuthState();
        if (
          storedAuth &&
          storedAuth.accessToken &&
          storedAuth.refreshToken &&
          storedAuth.user
        ) {
          store.dispatch(
            setCredentials({
              accessToken: storedAuth.accessToken,
              refreshToken: storedAuth.refreshToken,
              user: storedAuth.user,
            }),
          );
        }
      } finally {
        unsubscribeNetwork = initializeNetworkListener(store.dispatch);
        setIsBootstrapped(true);
        SplashScreen.hide();
      }
    };

    bootstrap();

    return () => {
      if (unsubscribeNetwork) {
        unsubscribeNetwork();
      }
    };
  }, []);

  if (!isBootstrapped) {
    // Native splash is still visible
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <ToastHost />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
