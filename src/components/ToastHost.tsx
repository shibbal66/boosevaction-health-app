import React, { useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppSelector } from '../store';
import { selectCurrentToast } from '../store/toastSlice';
import tw from '../../lib/tailwind';

type ToastVariant = 'success' | 'error' | 'info';

const VARIANT_STYLES: Record<
  ToastVariant,
  {
    title: string;
    container: string;
  }
> = {
  success: {
    title: 'Success',
    container: 'bg-tealLight',
  },
  error: {
    title: 'Error',
    container: 'bg-red',
  },
  info: {
    title: "Captain's Log",
    container: 'bg-navy',
  },
};

const BaseToast = ({
  text1,
  variant,
}: {
  text1?: string;
  variant: ToastVariant;
}) => {
  const { title, container } = VARIANT_STYLES[variant];

  return (
    <View
      style={tw`mx-4 mt-4 rounded-xl ${container} px-4 py-3 shadow-lg border-l-4 border-orange`}
    >
      <Text
        style={tw`text-offWhite font-dmBold text-sm uppercase tracking-wide`}
      >
        {title}
      </Text>
      {text1 ? (
        <Text style={tw`text-offWhite font-dmRegular mt-1`}>{text1}</Text>
      ) : null}
    </View>
  );
};

const toastConfig = {
  success: (props: { text1?: string }) => (
    <BaseToast {...props} variant="success" />
  ),
  error: (props: { text1?: string }) => (
    <BaseToast {...props} variant="error" />
  ),
  info: (props: { text1?: string }) => <BaseToast {...props} variant="info" />,
};

export const ToastHost: React.FC = () => {
  const toast = useAppSelector(selectCurrentToast);
  const lastIdRef = useRef<number | null>(null);

  const toastId = toast?.id;
  const toastType = toast?.type;
  const toastMessage = toast?.message;

  useEffect(() => {
    if (!toastId || !toastType) {
      return;
    }

    if (toastId === lastIdRef.current) {
      return;
    }

    lastIdRef.current = toastId;

    Toast.show({
      type: toastType,
      text1: toastMessage,
      position: 'top',
    });
  }, [toastId, toastType, toastMessage]);

  return <Toast config={toastConfig} />;
};

export default ToastHost;
