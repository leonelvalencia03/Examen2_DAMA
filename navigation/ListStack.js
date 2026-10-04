// Stack anidado dentro del tab "Lista": ListScreen -> DataEntryScreen
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DataEntryScreen from '../screens/DataEntryScreen';
import HeaderButton from './HeaderButton';

const Stack = createNativeStackNavigator();

export default function ListStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name = "ListScreen"
        component = {ListScreen} 
        options = {({navigation}) =>({
            title: 'Lista',
            //Header Personalizado
            HeaderRight: ({tintColor}) =>(
                <HeaderButton
                icon = "add"
                color = {tinColor}
                onPress = {() => navigation.navigate('DataEntryScreen')}
                />
            ),
        })}
        />
        <Stack.Screen
        name = "DataEntryScreen"
        component = {DataEntryScreen}
        //Se pasan parametros
        options = {({route}) => ({
            title: route.params?.id ? 'Editar registro' : 'Nuevo registro',
        })}
        />
    </Stack.Navigator>
  );
}