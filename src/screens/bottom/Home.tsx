import React, { useCallback, useRef, useState, useMemo } from 'react';
import { StyleSheet, View, ViewToken } from 'react-native';
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
import { Character } from '@src/types/Character';
import { CharacterFilters, useCharacters } from '@src/services/characters';
import FilterModal, { BottomModalRefType } from '@src/components/FilterModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { House } from '@src/types/house';
import { Gender } from '@src/types/gender';
import { BloodStatus } from '@src/types/bloodStatus';
import Select from '@src/components/Select';
import SearchInput from '@src/components/SearchInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@src/styles/colors';
import ListItem from '@src/components/characterItem/ListItem';
import { useTranslation } from 'react-i18next';
import SkeletonListItem from '@src/components/spellsItem/SkeletonListItem';

interface HomeProps {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigatorParamsList, BottomRoutes.Characters>,
    NativeStackNavigationProp<AppNavigatorParamsList>
  >;
}

const Home = ({ navigation }: HomeProps) => {
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

  const charactesModal = useRef<BottomSheetModal>(null);

  const closeModal = useCallback((ref: BottomModalRefType) => {
    ref.current?.close();
  }, []);

  const openModal = useCallback((ref: BottomModalRefType) => {
    ref.current?.present();
  }, []);

  const [filters, setFilters] = useState<CharacterFilters>({
    page: 1,
    limit: 25
  });

  const memoizedFilters = useMemo(() => filters, [filters]);

  const { data, isLoading, error } = useCharacters({
    filters: memoizedFilters
  });

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
              onFilterPress={() => openModal(charactesModal)}
            />
          </Animated.View>

          <Animated.FlatList
            data={Array(10)}
            renderItem={() => <SkeletonListItem />}
            onScroll={scrollHandler}
            stickyHeaderHiddenOnScroll
            onViewableItemsChanged={() => {}}
            contentContainerStyle={s.contentContainer}
          />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const renderItem = ({ item }: { item: Character }) => (
    <ListItem
      character={item}
      viewableItems={viewableItems}
      onPress={() =>
        navigation.navigate(AppRoutes.CharacterDetails, { item: item })
      }
    />
  );

  const handleFilterChange = (newFilters: Partial<CharacterFilters>) => {
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
            onFilterPress={() => openModal(charactesModal)}
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
          onDismiss={() => closeModal(charactesModal)}
          ref={charactesModal}
          snapPoints={['50%']}
          title={t('filter')}
        >
          <Select
            title={t('Select.house')}
            items={Object.values(House).map(house => ({
              label: house,
              value: house
            }))}
            value={filters.house}
            onValueChange={house => handleFilterChange({ house })}
            placeholder={t('Select.none')}
          />
          <Select
            title={t('Select.gender')}
            items={Object.values(Gender).map(gender => ({
              label: gender,
              value: gender
            }))}
            value={filters.gender}
            onValueChange={gender => handleFilterChange({ gender })}
            placeholder={t('Select.none')}
          />
          <Select
            title={t('Select.bloodStatus')}
            items={Object.values(BloodStatus).map(bloodStatus => ({
              label: bloodStatus,
              value: bloodStatus
            }))}
            value={filters.bloodStatus}
            onValueChange={bloodStatus => handleFilterChange({ bloodStatus })}
            placeholder={t('Select.none')}
          />
        </FilterModal>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;

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
  },
  loadingIndicator: {
    marginVertical: 20
  }
});
