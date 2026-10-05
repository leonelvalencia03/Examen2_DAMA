// ---------- Paleta modo claro ----------
export const lightColors = {
  background: '#F5F5F5',     // fondo de pantallas
  card: '#FFFFFF',           // fondo de tarjetas e inputs
  text: '#212121',           // texto principal
  textSecondary: '#757575',  // texto secundario / placeholders
  primary: '#2196F3',        // color de acento (botones, tabs activos)
  onPrimary: '#FFFFFF',      // texto sobre el color primario
  danger: '#E53935',         // eliminar / errores
  success: '#43A047',        // confirmaciones
  border: '#E0E0E0',         // líneas y bordes
};

// ---------- Paleta modo oscuro ----------
export const darkColors = {
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  primary: '#64B5F6',
  onPrimary: '#121212',
  danger: '#EF5350',
  success: '#66BB6A',
  border: '#333333',
};

// ---------- Espaciados estándar (en px) ----------
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// ---------- Tamaños de fuente ----------
export const fontSizes = {
  small: 12,
  body: 16,
  subtitle: 18,
  title: 24,
  header: 32,
};

// ---------- Bordes redondeados ----------
export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
  round: 999, // círculos / botones tipo píldora
};

// ---------- Sombra estándar para tarjetas ----------
export const shadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
  elevation: 3,
};

// ---------- Categorías de gastos ----------
// Lista fija usada en el selector del formulario y en las tarjetas
export const categories = [
  'Comida',
  'Transporte',
  'Servicios',
  'Entretenimiento',
  'Salud',
  'Otros',
];

// Color asociado a cada categoría (etiquetas y tarjetas)
export const categoryColors = {
  Comida: '#FB8C00',
  Transporte: '#1E88E5',
  Servicios: '#8E24AA',
  Entretenimiento: '#E91E63',
  Salud: '#43A047',
  Otros: '#757575',
};

// Ícono de Ionicons para cada categoría
export const categoryIcons = {
  Comida: 'restaurant',
  Transporte: 'bus',
  Servicios: 'flash',
  Entretenimiento: 'game-controller',
  Salud: 'medkit',
  Otros: 'ellipsis-horizontal-circle',
};

// ---------- Función auxiliar ----------
// Devuelve la paleta según el modo activo.
// Uso: const colors = getColors(isDark);
export const getColors = (isDark) => (isDark ? darkColors : lightColors);