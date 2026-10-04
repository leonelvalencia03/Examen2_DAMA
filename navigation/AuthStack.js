import{ createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return(
        <Stack.Navigator>
            {/* Que hace? Oculta el header porque el login ocupa toda la pantalla*/}
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}