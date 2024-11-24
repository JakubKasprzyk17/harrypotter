import { Colors } from '@src/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';

interface StartProps {
  onAnimationFinish: (isCancelled: boolean) => void;
}

const Start: React.FC<StartProps> = ({ onAnimationFinish }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, { duration: 1500, easing: Easing.ease });
    opacity.value = withTiming(1, { duration: 1500, easing: Easing.ease });

    setTimeout(() => {
      onAnimationFinish(false);
    }, 1500);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value
  }));

  return (
    <LinearGradient
      colors={[Colors.GRADIENT_DARK_BLUE, Colors.GRADIENT_LIGHT_BLUE]}
      style={s.container}
    >
      <Animated.View style={animatedStyle}>
        <Image
          source={require('@src/assets/images/hogwart.png')}
          style={s.image}
        />
      </Animated.View>
    </LinearGradient>
  );
};

export default Start;

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  }
});
