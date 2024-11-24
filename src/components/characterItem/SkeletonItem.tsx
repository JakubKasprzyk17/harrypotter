import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@src/styles/colors';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/constants/screen';
import Animated, {
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const SkeletonItem = () => {
  const opacity = useSharedValue(1);

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
  return (
    <View style={s.container}>
      <View style={s.artistInfo}>
        <Animated.View style={[s.artistAvatar, { opacity }]} />
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Animated.View style={[s.artistName, { opacity }]} />
          <Animated.View style={[s.artworkTitle, { opacity }]} />
        </View>
      </View>
      <View style={s.imageContainer}>
        <Animated.View style={[s.image, { opacity }]} />
      </View>
      <View style={s.info}>
        <View style={s.buttonsContainer}>
          <Animated.View style={[s.icon, { opacity }]} />
          <Animated.View style={[s.icon, { opacity }]} />
          <Animated.View style={[s.icon, { opacity }]} />
        </View>
        <View style={s.description}>
          <Animated.View style={[s.title, { opacity }]} />
          <Animated.View style={[s.date, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

export default SkeletonItem;

const s = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Colors.WHITE
  },
  artistInfo: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  artistAvatar: {
    backgroundColor: Colors.GRAPHITE,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  artistName: {
    marginLeft: 10,
    width: 200,
    height: 15,
    backgroundColor: Colors.GRAPHITE
  },
  artworkTitle: {
    marginTop: 5,
    marginLeft: 10,
    width: 200,
    height: 15,
    backgroundColor: Colors.GRAPHITE
  },
  imageContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  image: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT,
    backgroundColor: Colors.GRAPHITE
  },
  info: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 5,
    marginRight: 10,
    width: 25,
    height: 25,
    backgroundColor: Colors.GRAPHITE,
    borderRadius: 15
  },
  description: {
    flex: 1,
    marginTop: 10
  },
  title: {
    flex: 1,
    width: 200,
    height: 30,
    backgroundColor: Colors.GRAPHITE
  },
  date: {
    marginVertical: 5,
    width: 150,
    height: 15,
    backgroundColor: Colors.GRAPHITE
  }
});
