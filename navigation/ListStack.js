// Stack anidado dentro del tab "Lista": ListScreen -> DataEntryScreen
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DataEntryScreen from '../screens/DataEntryScreen';

const Stack = createNativeStackNavigator();

export default function ListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Lista' }} />
      <Stack.Screen name="DataEntryScreen" component={DataEntryScreen} options={{ title: 'Registro' }} />
    </Stack.Navigator>
  );
}