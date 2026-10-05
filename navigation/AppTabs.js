// Navegación principal con pestañas inferiores: Home, Lista y Perfil
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListStack from './ListStack';

import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

// Ícono de cada pestaña
const ICONOS = {
  Home: 'home',
  Lista: 'list',
  Perfil: 'person',
};

export default function AppTabs() {

  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={
              focused
                ? ICONOS[route.name]
                : `${ICONOS[route.name]}-outline`
            }
            size={size}
            color={color}
          />
        ),

        //Colores de la barra inferior
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,

        //Fondo de la barra
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },

        //Color de los headers
        headerStyle: {
          backgroundColor: colors.card,
        },

        headerTintColor: colors.text,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />

      <Tab.Screen
        name="Lista"
        component={ListStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}