// Pantalla principal: bienvenida, resumen de registros y accesos rápidos
import { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { getItems } from '../services/database';
import { useTheme } from '../context/ThemeContext';
import { spacing, fontSizes, radius } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { colors } = useTheme();

  const [total, setTotal] = useState(0);

  // Recarga el total cada vez que Home recibe el foco
  useFocusEffect(
    useCallback(() => {
      const cargarTotal = async () => {
        try {
          const items = await getItems(user?.nombreUsuario);
          setTotal(items.length);
        } catch (e) {
          console.log('Error al cargar el total:', e);
        }
      };

      cargarTotal();
    }, [])
  );

  // Accesos rápidos
  const accesos = [
    {
      titulo: 'Nuevo registro',
      icono: 'add-circle-outline',
      onPress: () =>
        navigation.navigate('Lista', {
          screen: 'DataEntryScreen',
          initial: false,
        }),
    },
    {
      titulo: 'Ver lista',
      icono: 'list-outline',
      onPress: () =>
        navigation.navigate('Lista', {
          screen: 'ListScreen',
        }),
    },
    {
      titulo: 'Mi perfil',
      icono: 'person-outline',
      onPress: () => navigation.navigate('Perfil'),
    },
  ];

  return (
    <ScrollView
      style={[
        styles.scroll,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.bienvenida, { color: colors.text }]}>
        ¡Hola, {user?.nombre ?? 'usuario'}!
      </Text>

      <Text
        style={[
          styles.subtitulo,
          { color: colors.textSecondary },
        ]}
      >
        Este es tu panel principal
      </Text>

      {/* Tarjeta de resumen */}
      <View
        style={[
          styles.tarjeta,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons
          name="albums-outline"
          size={36}
          color={colors.primary}
        />

        <View>
          <Text style={[styles.total, { color: colors.text }]}>
            {total}
          </Text>

          <Text style={{ color: colors.textSecondary }}>
            Registros guardados
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.seccion,
          { color: colors.text },
        ]}
      >
        Accesos rápidos
      </Text>

      {accesos.map((a) => (
        <Pressable
          key={a.titulo}
          style={[
            styles.acceso,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={a.onPress}
        >
          <Ionicons
            name={a.icono}
            size={24}
            color={colors.primary}
          />

          <Text
            style={[
              styles.accesoTexto,
              { color: colors.text },
            ]}
          >
            {a.titulo}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  container: {
    padding: spacing.md,
  },

  bienvenida: {
    fontSize: fontSizes.title,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },

  subtitulo: {
    fontSize: fontSizes.body,
    marginBottom: spacing.lg,
  },

  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },

  total: {
    fontSize: fontSizes.header,
    fontWeight: 'bold',
  },

  seccion: {
    fontSize: fontSizes.subtitle,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },

  acceso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    marginBottom: spacing.sm,
  },

  accesoTexto: {
    flex: 1,
    fontSize: fontSizes.body,
  },
});