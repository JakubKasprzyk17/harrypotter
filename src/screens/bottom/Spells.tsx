import React, { useCallback, useRef, useState, useMemo } from 'react';
import { StyleSheet, ViewToken } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import {
  AppNavigatorParamsList,
  AppRoutes,
  BottomNavigatorParamsList,
  BottomRoutes
} from '@src/types/Navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FilterModal, { BottomModalRefType } from '@src/components/FilterModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import SearchInput from '@src/components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@src/styles/colors';
import { useTranslation } from 'react-i18next';
import { SpellsFilters, useSpells } from '@src/services/spells';
import { Spell } from '@src/types/Spells';
import ListItem from '@src/components/spellsItem/ListItem';
import SkeletonListItem from '@src/components/spellsItem/SkeletonListItem';
import Select from '@src/components/Select';
import { SpellCategory } from '@src/types/spellCategory';
import { Light } from '@src/types/light';

interface SpellsProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigatorParamsList, BottomRoutes.Spells>,
    NativeStackNavigationProp<AppNavigatorParamsList>
  >;
}

const Spells = ({ navigation }: SpellsProps) => {
  const { t } = useTranslation();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const previousOffsetY = useSharedValue<number>(0);
  const isVisible = useSharedValue<boolean>(true);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const currentOffsetY = event.contentOffset.y;
      if (currentOffsetY < 100) {
        isVisible.value = true;
      } else if (currentOffsetY < previousOffsetY.value) {
        isVisible.value = true;
      } else if (currentOffsetY > previousOffsetY.value) {
        isVisible.value = false;
      }

      previousOffsetY.value = currentOffsetY;
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isVisible.value ? 1 : 0, { duration: 300 }),
      transform: [
        {
          translateY: withTiming(isVisible.value ? 0 : -100, { duration: 300 })
        }
      ]
    };
  });

  const spellsModal = useRef<BottomSheetModal>(null);

  const closeModal = useCallback((ref: BottomModalRefType) => {
    ref.current?.close();
  }, []);

  const openModal = useCallback((ref: BottomModalRefType) => {
    ref.current?.present();
  }, []);

  const [filters, setFilters] = useState<SpellsFilters>({
    page: 1,
    limit: 25
  });

  const memoizedFilters = useMemo(() => filters, [filters]);

  const { data, isLoading, error } = useSpells({ filters: memoizedFilters });

  if (isLoading || !data) {
    return (
      <LinearGradient
        colors={[Colors.GRADIENT_DARK_BLUE, Colors.GRADIENT_LIGHT_BLUE]}
        style={s.gradientBackground}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View style={[s.header, animatedStyle]}>
            <SearchInput
              onSearch={text => handleFilterChange({ name: text })}
              placeholder={t('search')}
              onFilterPress={() => openModal(spellsModal)}
            />
          </Animated.View>

          <Animated.FlatList
            data={Array(10)}
            renderItem={() => <SkeletonListItem />}
            onScroll={scrollHandler}
            onViewableItemsChanged={() => {}}
            stickyHeaderHiddenOnScroll
            contentContainerStyle={s.contentContainer}
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const renderItem = ({ item }: { item: Spell }) => (
    <ListItem
      spell={item}
      viewableItems={viewableItems}
      onPress={() => navigation.navigate(AppRoutes.SpellDetails, { item })}
    />
  );

  const handleFilterChange = (newFilters: Partial<SpellsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleNextPage = () => {
    setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }));
  };

  return (
    <LinearGradient
      colors={[Colors.GRADIENT_DARK_BLUE, Colors.GRADIENT_LIGHT_BLUE]}
      style={s.gradientBackground}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[s.header, animatedStyle]}>
          <SearchInput
            onSearch={text => handleFilterChange({ name: text })}
            placeholder={t('search')}
            onFilterPress={() => openModal(spellsModal)}
          />
        </Animated.View>

        <Animated.FlatList
          data={data.data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          onScroll={scrollHandler}
          stickyHeaderHiddenOnScroll
          onViewableItemsChanged={
            isLoading
              ? () => {}
              : ({ viewableItems: vItems }) => {
                  viewableItems.value = vItems;
                }
          }
          onEndReached={
            data.meta.pagination.last > filters.page
              ? handleNextPage
              : undefined
          }
          contentContainerStyle={s.contentContainer}
        />

        <FilterModal
          onClear={() => setFilters({ page: 1, limit: 25 })}
          onDismiss={() => closeModal(spellsModal)}
          ref={spellsModal}
          snapPoints={['50%']}
          title={t('filter')}
        >
          <Select
            title={t('Select.category')}
            items={Object.values(SpellCategory).map(category => ({
              label: category,
              value: category
            }))}
            value={filters.category}
            onValueChange={category => handleFilterChange({ category })}
            placeholder={t('Select.none')}
          />
          <Select
            title={t('Select.light')}
            items={Object.values(Light).map(light => ({
              label: light,
              value: light
            }))}
            value={filters.light}
            onValueChange={light => handleFilterChange({ light })}
            placeholder={t('Select.none')}
          />
        </FilterModal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Spells;

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
    paddingTop: 100,
    paddingBottom: 75
  }
});
