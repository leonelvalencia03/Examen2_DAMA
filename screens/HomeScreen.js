// Pantalla temporal se termina al finalizar el proyecto

import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen(){
    return(
        <View style={styles.Container}>
            <Text>HomeScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});