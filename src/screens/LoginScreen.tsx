import React from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import tw from '../../lib/tailwind';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppDispatch } from '../store';
import { setCredentials } from '../store/authSlice';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import LabeledInput from '../components/LabeledInput';
import CommonButton from '../components/CommonButton';
import useFormValidation from '../hooks/useFormValidation';
import { validateEmail, validatePassword } from '../utils/validation';
import { loginRequest } from '../api/auth';
import { getErrorMessage } from '../api/errors';
import { saveAuthState } from '../services/authStorage';
import { showToast } from '../store/toastSlice';
import SpinningShipWheel from '../components/SpinningShipWheel';
import useUserProfile from '../hooks/useUserProfile';
import { getDeviceTimezone } from '../utils/helpers';
import { requestNotificationPermissionAndFcmToken } from '../utils/fcm';
import type { PatchCurrentUserPayload } from '../api/user';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { patchUser } = useUserProfile({ showToasts: false });
  const { values, errors, setFieldValue, validateAll } = useFormValidation(
    {
      email: '',
      password: '',
    },
    {
      email: validateEmail,
      password: validatePassword,
    },
  );

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleLogin = async () => {
    const { isValid } = validateAll();
    if (!isValid) {
      return;
    }

    try {
      setSubmitting(true);
      const data = await loginRequest(values.email, values.password);

      const action = setCredentials({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
      });

      dispatch(action);

      await saveAuthState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: data.user,
      });

      const timezone = getDeviceTimezone();
      const { enabled: notificationsEnabled, token: fcmToken } =
        await requestNotificationPermissionAndFcmToken();

      const patchPayload: PatchCurrentUserPayload = {};
      if (timezone) patchPayload.timezone = timezone;
      // Persist the user's OS-level notification decision to backend.
      patchPayload.notificationEnabled = notificationsEnabled;
      patchPayload.fcmToken = fcmToken;
      console.log('patchPayload', patchPayload);

      try {
        await patchUser(patchPayload);
      } catch {
        // Non-fatal: allow login even if user update fails.
      }
    } catch (error: unknown) {
      const message = getErrorMessage(
        error,
        'Unable to log in. Please try again.',
      );

      dispatch(
        showToast({
          type: 'error',
          message,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-navyDark`}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={tw`flex-1 justify-center px-6`}>
        <SpinningShipWheel style="absolute top-[30%] right-[0%]" />
        <Text
          style={tw`text-heading font-playfairDisplayBlack text-offWhite mb-1 text-center leading-tight`}
        >
          Welcome{'\n'}Back, Captain
        </Text>
        <Text
          style={tw`text-muted text-center font-bold italic font-crimsonProMedium text-sm`}
        >
          Your Voyage Continue Here
        </Text>

        <LabeledInput
          label="Email"
          value={values.email}
          onChangeText={text => setFieldValue('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="you@example.com"
          errorMessage={errors.email}
          leftIcon={
            <MaterialDesignIcons
              name="email-outline"
              size={20}
              color={tw.color('muted')}
            />
          }
        />

        <LabeledInput
          label="Password"
          value={values.password}
          onChangeText={text => setFieldValue('password', text)}
          secureTextEntry={!passwordVisible}
          placeholder="••••••••"
          containerClassName="mb-6"
          errorMessage={errors.password}
          leftIcon={
            <MaterialDesignIcons
              name="lock-outline"
              size={20}
              color={tw.color('muted')}
            />
          }
          rightIcon={
            <Pressable onPress={() => setPasswordVisible(prev => !prev)}>
              <MaterialDesignIcons
                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={tw.color('muted')}
              />
            </Pressable>
          }
        />

        <CommonButton
          onPress={handleLogin}
          label="Set Sail"
          variant="filled"
          loading={submitting}
        />
        <Text style={tw`text-center font-dmRegular text-muted text-sm`}>
          New to voyage?{' '}
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={tw`text-tealLight font-dmRegular text-sm -mb-1 border-b border-tealLight`}
            >
              Create an account
            </Text>
          </Pressable>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
