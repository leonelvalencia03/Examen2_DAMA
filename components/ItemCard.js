// components/ItemCard.js
// Tarjeta que muestra un gasto dentro del FlatList de ListScreen.
// Muestra: ícono de categoría, concepto, categoría y fecha, monto,
// y botones de editar y eliminar.
import React from 'react';
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  lightColors,
  spacing,
  fontSizes,
  radius,
  shadow,
  categoryColors,
  categoryIcons,
} from '../styles/theme';

/**
 * Props:
 *  - item:     gasto { id, concepto, descripcion, categoria, monto, fecha }
 *  - onEdit:   función que se ejecuta al presionar editar
 *  - onDelete: función que se ejecuta al presionar eliminar
 *  - colors:   paleta del tema activo (si no se envía, usa la clara)
 */
export default function ItemCard({ item, onEdit, onDelete, colors = lightColors }) {
  // Tamaños que cambian según el ancho de la pantalla
  const { width } = useWindowDimensions();
  const isLarge = width >= 600;
  const circleSize = isLarge ? 56 : 44;

  // Si la categoría no existe en la lista, se usa "Otros"
  const categoria = categoryColors[item.categoria] ? item.categoria : 'Otros';
  const categoryColor = categoryColors[categoria];

  // Monto con dos decimales, ej. $12.50
  const montoTexto = `$${Number(item.monto).toFixed(2)}`;

  return (
    <View style={[styles.card, shadow, { backgroundColor: colors.card }]}>
      {/* Círculo con el ícono de la categoría */}
      <View
        style={[
          styles.iconCircle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: categoryColor + '22', // color con transparencia
          },
        ]}
      >
        <Ionicons
          name={categoryIcons[categoria]}
          size={isLarge ? 28 : 22}
          color={categoryColor}
        />
      </View>

      {/* Centro: concepto, categoría y fecha */}
      <View style={styles.info}>
        <Text
          style={[
            styles.concepto,
            { color: colors.text, fontSize: isLarge ? fontSizes.subtitle : fontSizes.body },
          ]}
          numberOfLines={1}
        >
          {item.concepto}
        </Text>
        <Text style={[styles.detalle, { color: colors.textSecondary }]} numberOfLines={1}>
          {categoria} · {item.fecha}
        </Text>
      </View>

      {/* Derecha: monto y botones de acción */}
      <View style={styles.right}>
        <Text
          style={[
            styles.monto,
            { color: colors.text, fontSize: isLarge ? fontSizes.title : fontSizes.subtitle },
          ]}
        >
          {montoTexto}
        </Text>
        <View style={styles.actions}>
          <Pressable onPress={onEdit} hitSlop={8} style={styles.actionButton}>
            <Ionicons name="create-outline" size={22} color={colors.primary} />
          </Pressable>
          <Pressable onPress={onDelete} hitSlop={8} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={22} color={colors.danger} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',          // ícono | info | monto y acciones
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: {
    flex: 1,                       // ocupa el espacio central disponible
    marginRight: spacing.sm,
  },
  concepto: {
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: fontSizes.small,
    marginTop: spacing.xs,
  },
  right: {
    alignItems: 'flex-end',
  },
  monto: {
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  actionButton: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
});