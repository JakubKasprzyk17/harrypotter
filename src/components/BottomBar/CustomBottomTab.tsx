import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { interpolatePath } from 'react-native-redash';
import AnimatedCircle from './AnimatedCircle';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { getPathXCenter } from '@src/utils/path';
import usePath from '@src/hooks/usePath';
import { SCREEN_WIDTH } from '@src/constants/screen';
import { Colors } from '@src/styles/colors';
import { BottomRoutes } from '@src/types/Navigation';
import BarItem from './BarItem';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const CustomBottomTab: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const { containerPath, curvedPaths, tHeight } = usePath();
  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);

  const handleMoveCircle = (currentPath: string) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };

  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
      curvedPaths
    );
    runOnJS(handleMoveCircle)(currentPath);
    return {
      d: `${containerPath} ${currentPath}`
    };
  });

  const handleTabPress = (index: number, tab: string) => {
    if (index === progress.value) return;
    navigation.navigate(tab);

    progress.value = withTiming(index);
  };

  return (
    <View style={s.tabBarContainer}>
      <Svg width={SCREEN_WIDTH} height={tHeight}>
        <AnimatedPath fill={Colors.SAND_YELLOW} animatedProps={animatedProps} />
      </Svg>
      <AnimatedCircle circleX={circleXCoordinate} />
      <View
        style={[
          s.tabItemsContainer,
          {
            height: tHeight
          }
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ? options.tabBarLabel : route.name;
          return (
            <BarItem
              key={index.toString()}
              label={label as BottomRoutes}
              routeName={route.name as BottomRoutes}
              activeIndex={state.index + 1}
              index={index}
              onTabPress={() => handleTabPress(index + 1, route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};
export default CustomBottomTab;

const s = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2
  },
  tabItemsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%'
  }
});
