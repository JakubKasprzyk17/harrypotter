import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '@src/components/BottomBar/CustomBottomTab';
import Home from '@src/screens/bottom/Home';
import Spells from '@src/screens/bottom/Spells';
import SpellsDictionary from '@src/screens/bottom/SpellsDictionary';
import { BottomNavigatorParamsList, BottomRoutes } from '@src/types/Navigation';

const BottomTab = createBottomTabNavigator<BottomNavigatorParamsList>();

const BottomNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      initialRouteName={BottomRoutes.Characters}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false
      }}
    >
      <BottomTab.Group>
        <BottomTab.Screen name={BottomRoutes.Characters} component={Home} />
        <BottomTab.Screen name={BottomRoutes.Spells} component={Spells} />
        <BottomTab.Screen
          name={BottomRoutes.SpellsDictionary}
          component={SpellsDictionary}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
