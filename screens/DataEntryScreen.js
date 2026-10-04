import { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { categories, categoryColors, categoryIcons, spacing, radius, fontSizes } from '../styles/theme.js';
import { createItem, getItemById, updateItem } from '../services/database';

// Fecha de hoy en formato AAAA-MM-DD
const hoy = () => {
    const d = new Date();
    const mes = String(d.getMonth() + 1).toString().padStart(2, '0');
    const dia = String(d.getDate()).toString().padStart(2, '0');
    return `${d.getFullYear()}-${mes}-${dia}`;
};

// Verifica formato AAAA-MM-DD y que la fecha exista 
const fechaValida = (texto) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
    const [anio, mes, dia] = texto.split('-').map(Number);
    const f = new Date(anio, mes - 1, dia);
    return f.getFullYear() === anio && f.getMonth() === mes - 1 && f.getDate() === dia;
};

export default function DataEntryScreen({ route, navigation }) {
    const { colors } = useTheme();


    // Si llega un id es edicion, si no es un nuevo gasto
    const id = route.params?.id;
    const modoEditar = id !== undefined && id !== null;

    // Estados para los campos del formulario
    const [concepto, setConcepto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState(hoy());
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(modoEditar);
    const [guardando, setGuardando] = useState(false);

    // en modo editar, cargamos los datos del gasto y rellena los campos 
    useEffect(() => {
        if (!modoEditar) return;
        const cargar = async () => {
            try {
                const gasto = await getItemById(id);
                if (!gasto) {
                    Alert.alert('Error', 'No se encontró el gasto.');
                    navigation.goBack();
                    return;
                }
                setConcepto(gasto.concepto);
                setDescripcion(gasto.descripcion ?? '');
                setCategoria(gasto.categoria);
                setMonto(String(gasto.monto));
                setFecha(gasto.fecha);
            } catch (e) {
                console.log('Error al cargar el gasto:', e);
                Alert.alert('Error', 'No se pudo cargar el gasto.');
                navigation.goBack();
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, [id]);

    // Valida el formulario y devuelve los errores encontrados
    const validar = () => {
        const e = {};
        if (!concepto.trim()) e.concepto = 'El concepto es obligatorio.';

        const numero = Number(monto.trim().replace(',', '.'));
        if (!monto.trim() || !Number.isFinite(numero) || numero <= 0) {
            e.monto = 'Ingresa un número mayor a 0.';
        }
        if (!fechaValida(fecha.trim())) e.fecha = 'Usa el formato AAAA-MM-DD.';
        if (!categoria) e.categoria = 'Selecciona una categoría.';
        return e;
    };

    // Guarda (crea o actualiza) y regresa a ListScreen
    const guardar = async () => {
        const e = validar();
        setErrores(e);
        if (Object.keys(e).length > 0) return;

        const datos = {
            concepto: concepto.trim(),
            descripcion: descripcion.trim(),
            categoria,
            monto: Number(monto.trim().replace(',', '.')),
            fecha: fecha.trim(),
        };

        setGuardando(true);
        try {
            if (modoEditar) {
                await updateItem(id, datos);
            } else {
                await createItem(datos);
            }
            navigation.goBack(); // ListScreen se recarga sola con useFocusEffect
        } catch (error) {
            console.log('Error al guardar:', error);
            Alert.alert('Error', 'No se pudo guardar el gasto. Intenta de nuevo.');
            setGuardando(false);
        }
    };

    // Estilos que dependen del tema (claro/oscuro)
    const inputStyle = [
        styles.input,
        { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
    ];

    if (cargando) {
        return (
            <View style={[styles.centro, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.background }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
                {/* Concepto */}
                <Text style={[styles.label, { color: colors.text }]}>Concepto *</Text>
                <TextInput
                    style={[inputStyle, errores.concepto && { borderColor: colors.danger }]}
                    value={concepto}
                    onChangeText={setConcepto}
                    placeholder="Ej. Almuerzo"
                    placeholderTextColor={colors.textSecondary}
                    maxLength={60}
                />
                {errores.concepto && <Text style={[styles.error, { color: colors.danger }]}>{errores.concepto}</Text>}

                {/* Descripción (opcional) */}
                <Text style={[styles.label, { color: colors.text }]}>Descripción</Text>
                <TextInput
                    style={[inputStyle, styles.multilinea]}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    placeholder="Detalle del gasto (opcional)"
                    placeholderTextColor={colors.textSecondary}
                    multiline
                />

                {/* Monto */}
                <Text style={[styles.label, { color: colors.text }]}>Monto *</Text>
                <TextInput
                    style={[inputStyle, errores.monto && { borderColor: colors.danger }]}
                    value={monto}
                    onChangeText={setMonto}
                    placeholder="0.00"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="decimal-pad"
                />
                {errores.monto && <Text style={[styles.error, { color: colors.danger }]}>{errores.monto}</Text>}

                {/* Fecha */}
                <Text style={[styles.label, { color: colors.text }]}>Fecha *</Text>
                <TextInput
                    style={[inputStyle, errores.fecha && { borderColor: colors.danger }]}
                    value={fecha}
                    onChangeText={setFecha}
                    placeholder="AAAA-MM-DD"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numbers-and-punctuation"
                    maxLength={10}
                />
                {errores.fecha && <Text style={[styles.error, { color: colors.danger }]}>{errores.fecha}</Text>}

                {/* Selector de categoría: una "chip" por cada categoría fija */}
                <Text style={[styles.label, { color: colors.text }]}>Categoría *</Text>
                <View style={styles.chips}>
                    {categories.map((cat) => {
                        const activa = categoria === cat;
                        const colorCat = categoryColors[cat];
                        return (
                            <Pressable
                                key={cat}
                                onPress={() => setCategoria(cat)}
                                style={[
                                    styles.chip,
                                    { borderColor: colorCat, backgroundColor: activa ? colorCat : 'transparent' },
                                ]}
                            >
                                <Ionicons name={categoryIcons[cat]} size={16} color={activa ? colors.onPrimary : colorCat} />
                                <Text style={{ color: activa ? colors.onPrimary : colors.text, fontSize: fontSizes.small }}>
                                    {cat}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
                {errores.categoria && <Text style={[styles.error, { color: colors.danger }]}>{errores.categoria}</Text>}

                {/* Botón guardar */}
                <Pressable
                    onPress={guardar}
                    disabled={guardando}
                    style={({ pressed }) => [
                        styles.boton,
                        { backgroundColor: colors.primary, opacity: pressed || guardando ? 0.7 : 1 },
                    ]}
                >
                    <Ionicons name="save-outline" size={20} color={colors.onPrimary} />
                    <Text style={[styles.botonTexto, { color: colors.onPrimary }]}>
                        {modoEditar ? 'Guardar cambios' : 'Guardar gasto'}
                    </Text>
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}
const styles = StyleSheet.create({
    centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    contenido: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
    label: { fontSize: fontSizes.medium, fontWeight: '600', marginTop: spacing.md, marginBottom: spacing.xs },
    input: {
        borderWidth: 1,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: fontSizes.medium,
    },
    multilinea: { minHeight: 80, textAlignVertical: 'top' },
    error: { fontSize: fontSizes.small, marginTop: spacing.xs },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        borderWidth: 1.5,
        borderRadius: radius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        borderRadius: radius.md,
        paddingVertical: spacing.md,
        marginTop: spacing.xl,
    },
    botonTexto: { fontSize: fontSizes.medium, fontWeight: '700' },
});

