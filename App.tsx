import { Alert, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { I18nextProvider } from 'react-i18next';
import i18n from '@src/locales/i18n';
import RootNavigator from '@src/navigations/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@src/services';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { toast, toastConfig } from '@src/utils/toast';
import Toast from 'react-native-toast-message';

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        toast.error('No internet connection');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={s.container}>
            <BottomSheetModalProvider>
              <NavigationContainer>
                <RootNavigator />
                <Toast config={toastConfig} />
              </NavigationContainer>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;

const s = StyleSheet.create({
  container: {
    flex: 1
  }
});
