import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import tw from '../../lib/tailwind';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppDispatch } from '../store';
import { setToken } from '../store/authSlice';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import LabeledInput from '../components/LabeledInput';
import CommonButton from '../components/CommonButton';
import useFormValidation from '../hooks/useFormValidation';
import { validateEmail, validatePassword } from '../../lib/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
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

  const handleLogin = () => {
    const { isValid } = validateAll();
    if (!isValid) {
      return;
    }

    // In a real app, call API and handle server-side errors.
    dispatch(setToken({ token: 'dummy-login-token' }));
  };

  return (
    <View style={tw`flex-1 justify-center px-6 bg-navyDark`}>
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
            color={tw.color('muted') as string}
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
            color={tw.color('muted') as string}
          />
        }
        rightIcon={
          <Pressable onPress={() => setPasswordVisible(prev => !prev)}>
            <MaterialDesignIcons
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={tw.color('muted') as string}
            />
          </Pressable>
        }
      />

      <CommonButton onPress={handleLogin} label="Set Sail" variant="accent" />
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
  );
};

export default LoginScreen;
