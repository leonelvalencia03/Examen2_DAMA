// Navegación principal con pestañas inferiores: Home, Lista y Perfil
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <Stack.Screen name="Main" component={AppTabs} />
            ) : (
                <Stack.Screen name="Auth" component={AuthStack} />
            )}
        </Stack.Navigator>
    );
}