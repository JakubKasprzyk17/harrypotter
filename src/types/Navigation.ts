import { NavigatorScreenParams } from '@react-navigation/native';
import { Character } from './Character';
import { Spell } from './Spells';
import { SpellToLearn } from '@src/data/spellsToLearn';

export enum RootRoutes {
  Start = 'Start',
  AppNavigator = 'AppNavigator'
}

export enum AppRoutes {
  BottomNavigation = 'BottomNavigation',
  CharacterDetails = 'CharacterDetails',
  SpellDetails = 'SpellDetails',
  LearnSpell = 'LearnSpell'
}

export enum BottomRoutes {
  Characters = 'Characters',
  Spells = 'Spells',
  SpellsDictionary = 'SpellsDictionary'
}

export type RootNavigatorParamsList = {
  [RootRoutes.Start]: undefined;
  [RootRoutes.AppNavigator]: NavigatorScreenParams<AppNavigatorParamsList>;
};

export type AppNavigatorParamsList = {
  [AppRoutes.BottomNavigation]: NavigatorScreenParams<BottomNavigatorParamsList>;
  [AppRoutes.CharacterDetails]: { item: Character };
  [AppRoutes.SpellDetails]: { item: Spell };
  [AppRoutes.LearnSpell]: { item: SpellToLearn };
};

export type BottomNavigatorParamsList = {
  [BottomRoutes.Characters]: undefined;
  [BottomRoutes.Spells]: undefined;
  [BottomRoutes.SpellsDictionary]: undefined;
};
