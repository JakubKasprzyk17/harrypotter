import { StyleSheet } from 'react-native';
import React, { FC } from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle
} from 'react-native-reanimated';
import { Colors } from '@src/styles/colors';

type CircleProps = {
  circleX: SharedValue<number>;
};

const circleContainerSize = 55;

const AnimatedCircle: FC<CircleProps> = ({ circleX }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }]
    };
  }, [circleX]);

  return <Animated.View style={[circleContainerStyle, s.container]} />;
};

export default AnimatedCircle;

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.BURGUNDY,
    position: 'absolute',
    top: -circleContainerSize / 1.75,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
