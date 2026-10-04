import { useState, useCallback } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { spacing, fontSizes } from '../styles/theme.js';
import ItemCard from '../components/ItemCard.js';
import { getItems, deleteItem } from '../services/database';

export default function ListScreen({ navigation }) {
    const { colors } = useTheme();
    const [gastos, setGastos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // Lee los gastos de SQLite
    const cargarGastos = async () => {
        try {
            setGastos(await getItems());
        } catch (e) {
            console.log('Error al cargar los gastos:', e);
            Alert.alert('Error', 'No se pudieron cargar los gastos.');
        } finally {
            setCargando(false);
        }
    };

    // Recarga la lista cada vez que la pantalla recibe el foco
    // (al abrirla y al volver desde DataEntryScreen después de guardar)
    useFocusEffect(
        useCallback(() => {
            cargarGastos();
        }, [])
    );

    // Editar: pasa el id para que DataEntryScreen funcione en modo "editar"
    const editar = (item) => navigation.navigate('DataEntryScreen', { id: item.id });

    // Eliminar: pide confirmación antes de borrar
    const eliminar = (item) => {
        Alert.alert('Eliminar gasto', `¿Eliminar "${item.concepto}"? Esta acción no se puede deshacer.`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteItem(item.id);
                        await cargarGastos();
                    } catch (e) {
                        console.log('Error al eliminar:', e);
                        Alert.alert('Error', 'No se pudo eliminar el gasto.');
                    }
                },
            },
        ]);
    };

    if (cargando) {
        return (
            <View style={[styles.centro, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <FlatList
                data={gastos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <ItemCard item={item} colors={colors} onEdit={() => editar(item)} onDelete={() => eliminar(item)} />
                )}
                contentContainerStyle={gastos.length === 0 ? styles.centro : styles.lista}
                // Mensaje cuando no hay gastos
                ListEmptyComponent={
                    <View style={styles.vacio}>
                        <Ionicons name="wallet-outline" size={64} color={colors.textSecondary} />
                        <Text style={[styles.vacioTexto, { color: colors.textSecondary }]}>
                            Aún no has registrado gastos
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    centro: { flexGrow: 1, alignItems: 'center', justifyContent: 'center' },
    lista: { padding: spacing.md, gap: spacing.sm },
    vacio: { alignItems: 'center', gap: spacing.md },
    vacioTexto: { fontSize: fontSizes.body },
});