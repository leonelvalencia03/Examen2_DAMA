// components/CustomInput.js
// Campo de texto reutilizable con etiqueta, ícono opcional
// y mensaje de error debajo del campo.
import React from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightColors, spacing, fontSizes, radius } from '../styles/theme';

/**
 * Props:
 *  - label:           texto sobre el campo
 *  - value:           valor actual
 *  - onChangeText:    función que recibe el nuevo texto
 *  - placeholder:     texto de ayuda
 *  - error:           mensaje de error (si existe, el borde se pone rojo)
 *  - icon:            nombre de un ícono de Ionicons (opcional)
 *  - keyboardType:    'default' | 'numeric' | 'decimal-pad' ...
 *  - secureTextEntry: true para contraseñas
 *  - multiline:       true para textos largos (ej. descripción)
 *  - colors:          paleta del tema activo (si no se envía, usa la clara)
 *  - style:           estilos extra para el contenedor
 */
export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  icon,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  colors = lightColors,
  style,
}) {
  // En pantallas anchas se agranda un poco la letra y la altura
  const { width } = useWindowDimensions();
  const isLarge = width >= 600;

  return (
    <View style={[styles.container, style]}>
      {/* Etiqueta del campo */}
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}

      {/* Caja del campo: ícono + TextInput */}
      <View
        style={[
          styles.inputBox,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.danger : colors.border,
            minHeight: multiline ? 90 : isLarge ? 56 : 48,
          },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={colors.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontSize: isLarge ? fontSizes.subtitle : fontSizes.body,
              textAlignVertical: multiline ? 'top' : 'center',
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          autoCapitalize="none"
        />
      </View>

      {/* Mensaje de error (solo si existe) */}
      {error ? (
        <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSizes.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inputBox: {
    flexDirection: 'row',        // ícono y campo en la misma línea
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,                     // ocupa el espacio restante
    paddingVertical: spacing.sm,
  },
  error: {
    fontSize: fontSizes.small,
    marginTop: spacing.xs,
  },
});