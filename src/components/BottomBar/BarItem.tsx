import { Pressable, StyleSheet, Text } from 'react-native';
import React, { FC, useCallback, useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import {
  MaterialCommunityIcons,
  FontAwesome,
  SimpleLineIcons,
  MaterialIcons,
  Ionicons
} from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { SCREEN_WIDTH } from '@src/constants/screen';
import usePath from '@src/hooks/usePath';
import { getPathXCenterByIndex } from '@src/utils/path';
import { BottomRoutes } from '@src/types/Navigation';
import { Colors } from '@src/styles/colors';

export type BarProps = {
  label: BottomRoutes;
  routeName: BottomRoutes;
  index: number;
  activeIndex: number;
  onTabPress: () => void;
};

const ICON_SIZE = 30;
const LABEL_WIDTH = SCREEN_WIDTH / 3;

const BarItem: FC<BarProps> = ({
  label,
  routeName,
  index,
  activeIndex,
  onTabPress
}) => {
  const { t } = useTranslation();
  const { curvedPaths } = usePath();
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);
  const labelPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? -20 : 20;

    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 }
      ]
    };
  }, [animatedActiveIndex, iconPosition, index]);

  const labelContainerStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 36 : 100;
    return {
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: labelPosition - LABEL_WIDTH / 2 }
      ]
    };
  });

  const iconColor = useSharedValue(Colors.OBSIDIAN);

  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming(Colors.SILVER);
    } else {
      iconColor.value = withTiming(Colors.GRAPHITE);
    }
  }, [activeIndex, animatedActiveIndex, iconColor, index]);

  const animatedIconProps = useAnimatedProps(() => ({
    color: iconColor.value
  }));

  const getIcon = useCallback(() => {
    switch (routeName) {
      case BottomRoutes.Characters:
        const CharactersIcon = Animated.createAnimatedComponent(
          MaterialCommunityIcons
        );
        return (
          <CharactersIcon
            name="wizard-hat"
            size={ICON_SIZE}
            animatedProps={animatedIconProps}
          />
        );
      case BottomRoutes.Spells:
        const SpellsIcon = Animated.createAnimatedComponent(FontAwesome);
        return (
          <SpellsIcon
            name="magic"
            size={ICON_SIZE}
            animatedProps={animatedIconProps}
          />
        );
      case BottomRoutes.SpellsDictionary:
        const SpellsDictionaryIcon = Animated.createAnimatedComponent(
          MaterialCommunityIcons
        );
        return (
          <SpellsDictionaryIcon
            name="book-education"
            size={ICON_SIZE}
            animatedProps={animatedIconProps}
          />
        );
    }
  }, [animatedIconProps, routeName]);

  return (
    <>
      <Animated.View style={tabStyle}>
        <Pressable
          testID={`tab${label}`}
          hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
          onPress={onTabPress}
        >
          {getIcon}
        </Pressable>
      </Animated.View>
      <Animated.View style={[labelContainerStyle, s.labelContainer]}>
        <Text style={s.label}>{t(`Screens.${label}`)}</Text>
      </Animated.View>
    </>
  );
};

export default BarItem;

const s = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: LABEL_WIDTH
  },
  label: {
    color: Colors.NAVY_BLUE,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 5
  }
});
