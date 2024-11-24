import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigatorParamsList, AppRoutes } from '@src/types/Navigation';
import BottomNavigator from './BottomNavigator';
import CharacterDetails from '@src/screens/CharacterDetails';
import SpellDetails from '@src/screens/SpellDetails';
import LearnSpell from '@src/screens/LearnSpell';

const App = createNativeStackNavigator<AppNavigatorParamsList>();

const AppNavigator = () => {
  return (
    <App.Navigator
      screenOptions={{
        presentation: 'containedModal',
        headerShown: false
      }}
    >
      <App.Screen
        name={AppRoutes.BottomNavigation}
        component={BottomNavigator}
      />
      <App.Screen
        name={AppRoutes.CharacterDetails}
        component={CharacterDetails}
      />
      <App.Screen name={AppRoutes.SpellDetails} component={SpellDetails} />
      <App.Screen name={AppRoutes.LearnSpell} component={LearnSpell} />
    </App.Navigator>
  );
};

export default AppNavigator;
