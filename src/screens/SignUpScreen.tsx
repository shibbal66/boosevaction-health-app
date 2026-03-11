import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import tw from '../../lib/tailwind';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useAppDispatch } from '../store';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import LabeledInput from '../components/LabeledInput';
import CommonButton from '../components/CommonButton';
import useFormValidation from '../hooks/useFormValidation';
import {
  validateEmail,
  validatePassword,
  validateFullName,
} from '../../lib/validation';
import { signupRequest } from '../api/auth';
import { showToast } from '../store/toastSlice';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { values, errors, setFieldValue, validateAll } = useFormValidation(
    {
      fullName: '',
      email: '',
      password: '',
    },
    {
      fullName: validateFullName,
      email: validateEmail,
      password: validatePassword,
    },
  );

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleSignUp = async () => {
    const { isValid } = validateAll();
    if (!isValid) {
      return;
    }

    try {
      setSubmitting(true);
      const result = await signupRequest(
        values.fullName,
        values.email,
        values.password,
      );

      dispatch(
        showToast({
          type: 'success',
          message: result.message,
        }),
      );

      navigation.navigate('Login');
    } catch (error: any) {
      const message =
        error?.message || 'Unable to create account. Please try again.';

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
    <View style={tw`flex-1 justify-center px-6 bg-navyDark`}>
      <Text
        style={tw`text-heading font-playfairDisplayBlack text-offWhite mb-1 text-center leading-tight`}
      >
        Chart Your{'\n'}Course, Captain
      </Text>
      <Text
        style={tw`text-muted text-center font-bold italic font-crimsonProMedium text-sm`}
      >
        Create your captain's account
      </Text>
      <View style={tw`mt-4`}>
        <LabeledInput
          label="Full Name"
          value={values.fullName}
          onChangeText={text => setFieldValue('fullName', text)}
          autoCapitalize="words"
          placeholder="John Doe"
          errorMessage={errors.fullName}
          leftIcon={
            <MaterialDesignIcons
              name="account-outline"
              size={20}
              color={tw.color('muted') as string}
            />
          }
        />

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
      </View>
      <CommonButton
        onPress={handleSignUp}
        label="Create Account"
        variant="filled"
        loading={submitting}
      />
      <Text style={tw`text-center font-dmRegular text-muted text-sm`}>
        Already have an account?{' '}
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text
            style={tw`text-tealLight font-dmRegular text-sm -mb-1 border-b border-tealLight`}
          >
            Login
          </Text>
        </Pressable>
      </Text>
    </View>
  );
};

export default SignUpScreen;
