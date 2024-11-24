import React from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import {
  AppNavigatorParamsList,
  AppRoutes,
  BottomNavigatorParamsList,
  BottomRoutes
} from '@src/types/Navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@src/styles/colors';
import { useTranslation } from 'react-i18next';
import ListItem from '@src/components/spellsDictionaryItem/ListItem';
import { spellsToLearn, SpellToLearn } from '@src/data/spellsToLearn';

interface SpellsDictionaryProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<
      BottomNavigatorParamsList,
      BottomRoutes.SpellsDictionary
    >,
    NativeStackNavigationProp<AppNavigatorParamsList>
  >;
}

const SpellsDictionary = ({ navigation }: SpellsDictionaryProps) => {
  const { t } = useTranslation();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const renderItem = ({ item }: { item: SpellToLearn }) => (
    <ListItem
      spell={item}
      viewableItems={viewableItems}
      onPress={() => navigation.navigate(AppRoutes.LearnSpell, { item })}
    />
  );

  return (
    <LinearGradient
      colors={[Colors.GRADIENT_DARK_BLUE, Colors.GRADIENT_LIGHT_BLUE]}
      style={s.gradientBackground}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.FlatList
          data={spellsToLearn}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          stickyHeaderHiddenOnScroll
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            viewableItems.value = vItems;
          }}
          contentContainerStyle={s.contentContainer}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SpellsDictionary;

const s = StyleSheet.create({
  gradientBackground: {
    flex: 1
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: Colors.OBSIDIAN,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: Colors.SILVER,
    justifyContent: 'center'
  },
  contentContainer: {
    paddingBottom: 75
  }
});
