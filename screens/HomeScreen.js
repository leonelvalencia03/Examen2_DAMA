// Pantalla principal: bienvenida, resumen de registros y accesos rápidos
import { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { getItems } from '../services/database';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [total, setTotal] = useState(0);

  // Recarga el total cada vez que Home recibe el foco
  // (por ejemplo, al volver después de crear un registro)
  useFocusEffect(
    useCallback(() => {
      const cargarTotal = async () => {
        try {
          const items = await getItems();
          setTotal(items.length);
        } catch (e) {
          console.log('Error al cargar el total:', e);
        }
      };
      cargarTotal();
    }, [])
  );

  // Accesos rápidos: navegan a otras pestañas o a pantallas del stack anidado
  const accesos = [
    {
      titulo: 'Nuevo registro',
      icono: 'add-circle-outline',
      // initial: false deja ListScreen debajo, así la flecha "atrás" regresa a la lista
      onPress: () => navigation.navigate('Lista', { screen: 'DataEntryScreen', initial: false }),
    },
    {
      titulo: 'Ver lista',
      icono: 'list-outline',
      onPress: () => navigation.navigate('Lista', { screen: 'ListScreen' }),
    },
    {
      titulo: 'Mi perfil',
      icono: 'person-outline',
      onPress: () => navigation.navigate('Perfil'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.bienvenida}>¡Hola, {user?.nombre ?? 'usuario'}!</Text>
      <Text style={styles.subtitulo}>Este es tu panel principal</Text>

      {/* Tarjeta de resumen */}
      <View style={styles.tarjeta}>
        <Ionicons name="albums-outline" size={36} color="#2563eb" />
        <View>
          <Text style={styles.total}>{total}</Text>
          <Text>Registros guardados</Text>
        </View>
      </View>

      <Text style={styles.seccion}>Accesos rápidos</Text>
      {accesos.map((a) => (
        <Pressable key={a.titulo} style={styles.acceso} onPress={a.onPress}>
          <Ionicons name={a.icono} size={24} color="#2563eb" />
          <Text style={styles.accesoTexto}>{a.titulo}</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  bienvenida: { fontSize: 26, fontWeight: 'bold' },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 20 },
  tarjeta: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 20, borderRadius: 12, backgroundColor: '#eff6ff', marginBottom: 24,
  },
  total: { fontSize: 32, fontWeight: 'bold' },
  seccion: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  acceso: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 16, borderRadius: 10, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10,
  },
  accesoTexto: { flex: 1, fontSize: 16 },
});