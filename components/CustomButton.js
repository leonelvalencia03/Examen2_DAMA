// components/CustomButton.js
// Botón reutilizable con variantes (primary, danger, outline),
// ícono opcional y tamaño que se ajusta al ancho de la pantalla.
import React from 'react';
import { Pressable, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightColors, spacing, fontSizes, radius } from '../styles/theme';

/**
 * Props:
 *  - title:    texto del botón
 *  - onPress:  función al presionar
 *  - variant:  'primary' (por defecto) | 'danger' | 'outline'
 *  - icon:     nombre de un ícono de Ionicons (opcional)
 *  - disabled: deshabilita el botón
 *  - colors:   paleta del tema activo (si no se envía, usa la clara)
 *  - style:    estilos extra para el contenedor
 */
export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  colors = lightColors,
  style,
}) {
  // En pantallas anchas (tablets) el botón es un poco más grande
  const { width } = useWindowDimensions();
  const isLarge = width >= 600;

  // Colores según la variante elegida
  const isOutline = variant === 'outline';
  const baseColor = variant === 'danger' ? colors.danger : colors.primary;
  const backgroundColor = isOutline ? 'transparent' : baseColor;
  const textColor = isOutline ? colors.primary : colors.onPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor: baseColor,
          paddingVertical: isLarge ? spacing.md : spacing.sm + 4,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      {/* Ícono opcional a la izquierda del texto */}
      {icon && (
        <Ionicons
          name={icon}
          size={isLarge ? 24 : 20}
          color={textColor}
          style={styles.icon}
        />
      )}
      <Text
        style={[
          styles.text,
          { color: textColor, fontSize: isLarge ? fontSizes.subtitle : fontSizes.body },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',        // ícono y texto en la misma línea
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontWeight: '600',
  },
});