import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@src/styles/colors';

const SkeletonListItem = () => {
  const opacity = useSharedValue<number>(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(0.5, { duration: 500 })),
        withTiming(1, { duration: 500 })
      ),
      -1,
      false
    );
  }, [opacity]);

  const defaultGradientColors = [Colors.GRAPHITE, Colors.SILVER];

  return (
    <View style={s.card}>
      <LinearGradient
        colors={defaultGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.gradient}
      >
        <Animated.View style={[s.imageContainer, { opacity }]}>
          <Animated.View style={s.image} />
        </Animated.View>

        <View style={s.content}>
          <Animated.View style={[s.title, { opacity }]} />
          <Animated.View style={[s.detail, { opacity }]} />
          <Animated.View style={[s.detail, { opacity }]} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default SkeletonListItem;

const s = StyleSheet.create({
  card: {
    marginVertical: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginHorizontal: 16
  },
  gradient: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16
  },
  imageContainer: {
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden'
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: Colors.DARK_GRAY,
    borderRadius: 12
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    width: 150,
    height: 20,
    backgroundColor: Colors.GRAPHITE,
    marginBottom: 6,
    borderRadius: 4
  },
  detail: {
    width: 200,
    height: 15,
    backgroundColor: Colors.GRAPHITE,
    marginBottom: 6,
    borderRadius: 4
  }
});
