import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SettingsStackParamList } from '../navigation/types';
import tw from '../../lib/tailwind';
import GridBackground from '../components/GridBackground';
import CommonButton from '../components/CommonButton';
import useUserProfile from '../hooks/useUserProfile';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

type Nav = NativeStackNavigationProp<SettingsStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { user, patchUser, updating } = useUserProfile({ showToasts: true });
  const [name, setName] = useState(user?.name ?? '');

  const handleSave = useCallback(async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    try {
      await patchUser({ name: trimmed });
      navigation.goBack();
    } catch {
      // Toast already shown by hook
    }
  }, [name, patchUser, navigation]);

  return (
    <View style={tw`flex-1 bg-navy`}>
      <GridBackground />

      <KeyboardAvoidingView
        style={tw`flex-1 px-6 pt-12`}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`flex-row items-center mb-6`}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <MaterialDesignIcons
            name="arrow-left"
            size={30}
            color={tw.color('offWhite')}
          />
        </TouchableOpacity>

        <Text
          style={tw`text-muted text-xs font-dmSemiBold tracking-widest uppercase mb-1`}
        >
          PROFILE
        </Text>
        <Text style={tw`text-offWhite text-2xl font-dmSemiBold mb-4`}>
          Edit name
        </Text>

        <Text style={tw`text-muted text-sm font-dmMedium mb-2`}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          placeholderTextColor={tw.color('muted')}
          style={[
            tw`bg-cardBg border border-cardBorder rounded-xl px-4 py-3 text-offWhite text-base font-dmRegular`,
            { minHeight: 48 },
          ]}
          autoCapitalize="words"
          autoCorrect={false}
          editable={!updating}
        />

        <View style={tw`mt-8`}>
          <CommonButton
            label={updating ? 'Saving…' : 'Save'}
            color="orange"
            onPress={handleSave}
            disabled={updating || !name.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileScreen;
