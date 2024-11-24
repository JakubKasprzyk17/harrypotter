import React, { memo, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ViewToken
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
  withTiming
} from 'react-native-reanimated';
import { Colors } from '@src/styles/colors';
import { Character } from '@src/types/Character';
import { useTranslation } from 'react-i18next';

export interface ListItemProps {
  character: Character;
  onPress: () => void;
  viewableItems: SharedValue<ViewToken[]>;
}

const ListItem: React.FC<ListItemProps> = React.memo(
  ({ character, onPress, viewableItems }) => {
    const { id, attributes } = character;
    const { name, house, image, species, patronus } = attributes;
    const { t } = useTranslation();

    const containerStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(item => item.isViewable)
          .find(viewableItem => viewableItem.item.id === id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6)
          }
        ]
      };
    }, []);

    const gradientColors = {
      Gryffindor: [Colors.GRYFFINDOR_GOLD, Colors.GRYFFINDOR_RED],
      Slytherin: [Colors.SLYTHERIN_GREEN, Colors.SLYTHERIN_SILVER],
      Ravenclaw: [Colors.RAVENCLAW_BLUE, Colors.RAVENCLAW_BRONZE],
      Hufflepuff: [Colors.HUFFLEPUFF_YELLOW, Colors.HUFFLEPUFF_BLACK],
      default: [Colors.GRAPHITE, Colors.SILVER]
    };

    const cardColors =
      house && gradientColors[house]
        ? gradientColors[house]
        : gradientColors.default;

    const scale = useSharedValue<number>(1);

    const onPressIn = () => {
      scale.value = withSpring(1.05);
    };

    const onPressOut = () => {
      scale.value = withSpring(1);
    };

    return (
      <Animated.View style={[s.card, containerStyle]}>
        <LinearGradient
          colors={
            Array.isArray(cardColors) && cardColors.length >= 2
              ? cardColors
              : gradientColors.default
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.gradient}
        >
          <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={s.imageContainer}
          >
            <Image
              source={
                image
                  ? { uri: image }
                  : require('@src/assets/images/hogwart.png')
              }
              style={s.image}
            />
          </Pressable>

          <View style={s.content}>
            <Pressable onPress={onPress}>
              <Text style={s.title}>{name ?? t('unknown')}</Text>
              <Text style={s.detail}>{t('house') + (house ?? t('none'))}</Text>
              <Text style={s.detail}>
                {t('species') + (species ?? t('unknown'))}
              </Text>
              <Text style={s.detail}>
                {t('patronus') + (patronus ?? t('none'))}
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  }
);

export default ListItem;

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
    resizeMode: 'cover'
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginBottom: 6,
    textShadowColor: Colors.BLACK,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  },
  detail: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.WHITE,
    marginBottom: 4,
    textShadowColor: Colors.GRAPHITE,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  }
});
