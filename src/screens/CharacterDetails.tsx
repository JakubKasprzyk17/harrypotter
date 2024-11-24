import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Image
} from 'react-native';
import React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  CompositeNavigationProp,
  NavigationProp,
  RouteProp
} from '@react-navigation/native';
import {
  AppNavigatorParamsList,
  AppRoutes,
  BottomNavigatorParamsList,
  BottomRoutes
} from '@src/types/Navigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT } from '@src/constants/screen';
import { Colors } from '@src/styles/colors';
import IconButton from '@src/components/IconButton';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { getImage } from '@src/utils/getImage';

interface CharacterDetailsProps {
  route: RouteProp<AppNavigatorParamsList, AppRoutes.CharacterDetails>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigatorParamsList, BottomRoutes.Characters>,
    NavigationProp<AppNavigatorParamsList, AppRoutes>
  >;
}

const CharacterDetails = ({ route, navigation }: CharacterDetailsProps) => {
  const { item } = route.params;
  const { id, attributes } = item;
  const {
    name,
    house,
    image,
    species,
    patronus,
    boggart,
    born,
    blood_status,
    gender,
    animagus,
    wiki
  } = attributes;
  const { t } = useTranslation();

  return (
    <SafeAreaView style={s.container}>
      <IconButton
        style={s.backButton}
        icon={<Ionicons name="chevron-back" size={30} color={Colors.BLACK} />}
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={s.scrollContainer}>
        <Animated.Image
          sharedTransitionTag={`character_${id}`}
          source={
            image ? { uri: image } : require('@src/assets/images/hogwart.png')
          }
          style={s.image}
        />

        <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
          <Text style={s.name}>{name}</Text>

          {house && (
            <View style={s.houseContainer}>
              <Image source={getImage(house)} style={s.houseEmblem} />
              <Text style={s.houseName}>{house}</Text>
            </View>
          )}

          <View style={s.detailsContainer}>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('boggart')}</Text>
              {boggart ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('bloodStatus')}</Text>
              {blood_status ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('gender')}</Text>
              {gender ?? t('unknown')}
            </Text>
            {!house && (
              <Text style={s.detailItem}>
                <Text style={s.detailTitle}>{t('house')}</Text>
                {house ?? t('unknown')}
              </Text>
            )}
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('born')}</Text>
              {born ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('animagus')}</Text>
              {animagus ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('patronus')}</Text>
              {patronus ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('species')}</Text>
              {species ?? t('unknown')}
            </Text>
          </View>

          {wiki && (
            <Pressable onPress={() => Linking.openURL(wiki)}>
              <Text style={s.wikiLink}>{t('wiki')}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CharacterDetails;

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BEIGE
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: Colors.SILVER,
    borderRadius: 5
  },
  scrollContainer: {
    flex: 1
  },
  image: {
    width: '100%',
    height: SCREEN_HEIGHT / 2,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 4,
    borderBottomColor: Colors.SILVER
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.TEXT_NAVY,
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: Colors.BLACK,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  },
  houseContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  houseEmblem: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  houseName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.TEXT_NAVY
  },
  detailsContainer: {
    marginVertical: 20,
    paddingHorizontal: 10
  },
  detailItem: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.GRAPHITE,
    marginBottom: 12
  },
  detailTitle: {
    fontWeight: '600',
    color: Colors.TEXT_NAVY
  },
  wikiLink: {
    color: Colors.RAVENCLAW_BLUE,
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '600',
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  }
});
