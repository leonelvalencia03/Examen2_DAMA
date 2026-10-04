// Pantalla temporal: Desarrollo en progreso

import { View, Text, StyleSheet } from "react-native";

export default function LoginScreen() {
    return (
        <View style={styles.Container}>
                    <Text>ListScreen</Text>
                    {/*Este es una prueba de navegacion hacie el formulario*/}
                    <Button title = "Ir a data" onPress={() => navigation.navigate('DataEntryScreen')} />
                </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});