import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import Animated, { FadeIn } from 'react-native-reanimated';
import { RootNavigatorParamsList, RootRoutes } from '@src/types/Navigation';
import Start from '@src/screens/Start';
import AppNavigator from './AppNavigator';

const RootStack = createNativeStackNavigator<RootNavigatorParamsList>();

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const [appReady, setAppReady] = useState<boolean>(false);
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);

  const [fontsLoaded, fontError] = useFonts({});

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  const showStart = !appReady || !animationFinished;

  if (showStart) {
    return (
      <Start
        onAnimationFinish={isCancelled => {
          if (!isCancelled) {
            setAnimationFinished(true);
          }
        }}
      />
    );
  }

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootRoutes.AppNavigator}
          component={AppNavigator}
        />
      </RootStack.Navigator>
    </Animated.View>
  );
};

export default RootNavigator;
