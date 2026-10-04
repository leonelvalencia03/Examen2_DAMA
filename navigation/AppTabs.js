// Navegación principal con pestañas inferiores: Home, Lista y Perfil
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ListStack from './ListStack';

const Tab = createBottomTabNavigator();

// Ícono de cada pestaña (relleno si está activa, contorno si no)
const ICONOS = { Home: 'home', Lista: 'list', Perfil: 'person' };

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? ICONOS[route.name] : `${ICONOS[route.name]}-outline`}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      {/* headerShown: false evita un header doble, porque ListStack ya tiene el suyo */}
      <Tab.Screen name="Lista" component={ListStack} options={{ headerShown: false }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}