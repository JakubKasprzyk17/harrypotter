import React, { memo } from 'react';
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
import { SpellToLearn } from '@src/data/spellsToLearn';
import { getImage } from '@src/utils/getImage';

export interface ListItemProps {
  spell: SpellToLearn;
  onPress: () => void;
  viewableItems: SharedValue<ViewToken[]>;
}

const ListItem: React.FC<ListItemProps> = memo(
  ({ spell, onPress, viewableItems }) => {
    const { id, name, description, type, image } = spell;

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
          colors={[Colors.GRAPHITE, Colors.SILVER]}
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
            <Image source={getImage(image)} style={s.image} />
          </Pressable>

          <View style={s.content}>
            <Pressable onPress={onPress}>
              <Text style={s.title}>{name}</Text>
              <Text style={s.detail} numberOfLines={4}>
                {description}
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
