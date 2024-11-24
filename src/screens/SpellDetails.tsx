import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Pressable
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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/constants/screen';
import { Colors } from '@src/styles/colors';
import IconButton from '@src/components/IconButton';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface SpellDetailsProps {
  route: RouteProp<AppNavigatorParamsList, AppRoutes.SpellDetails>;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigatorParamsList, BottomRoutes.Spells>,
    NavigationProp<AppNavigatorParamsList, AppRoutes>
  >;
}

const SpellDetails = ({ route, navigation }: SpellDetailsProps) => {
  const { item } = route.params;
  const { id, attributes } = item;
  const {
    name,
    image,
    category,
    creator,
    effect,
    incantation,
    hand,
    light,
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
          sharedTransitionTag={`spell_${id}`}
          source={
            image ? { uri: image } : require('@src/assets/images/hogwart.png')
          }
          style={s.image}
        />

        <View
          style={{
            paddingHorizontal: 20,
            flex: 1,
            marginTop: 20,
            paddingBottom: 20
          }}
        >
          <Text style={s.title}>{name}</Text>
          <View style={s.detailsContainer}>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('category')}</Text>
              {category ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('creator')}</Text>
              {creator ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('effect')}</Text>
              {effect ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('incantation')}</Text>
              {incantation ?? t('none')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('hand')}</Text>
              {hand ?? t('unknown')}
            </Text>
            <Text style={s.detailItem}>
              <Text style={s.detailTitle}>{t('light')}</Text>
              {light ?? t('unknown')}
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

export default SpellDetails;

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
    borderColor: Colors.SILVER
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.TEXT_NAVY,
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: Colors.BLACK,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  },
  detailsContainer: {
    marginTop: 20,
    marginBottom: 20,
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
