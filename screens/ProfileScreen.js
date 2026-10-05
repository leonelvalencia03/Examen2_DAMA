import React from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { spacing, fontSizes, radius } from '../styles/theme';

const ProfileScreen = () => {

    const { user, logout } = useAuth();
    const { theme, colors, toggleTheme } = useTheme();

    const esOscuro = theme === 'dark';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <Text style={[styles.titulo, { color: colors.text }]}>
                Mi perfil
            </Text>

            {/* Información del usuario */}
            <View
                style={[
                    styles.tarjeta,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }
                ]}
            >
                <Text style={[styles.etiqueta, { color: colors.textSecondary }]}>
                    Usuario
                </Text>

                <Text style={[styles.usuario, { color: colors.text }]}>
                    {user?.nombreUsuario || 'Usuario'}
                </Text>
            </View>

            {/* Configuración del tema */}
            <View
                style={[
                    styles.tarjeta,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border
                    }
                ]}
            >
                <View style={styles.fila}>
                    <View style={styles.textos}>
                        <Text style={[styles.subtitulo, { color: colors.text }]}>
                            Tema de la aplicación
                        </Text>

                        <Text style={[styles.descripcion, { color: colors.textSecondary }]}>
                            {esOscuro ? 'Modo oscuro' : 'Modo claro'}
                        </Text>
                    </View>

                    <Switch
                        value={esOscuro}
                        onValueChange={toggleTheme}
                        trackColor={{
                            false: colors.border,
                            true: colors.primary
                        }}
                        thumbColor={colors.card}
                    />
                </View>
            </View>

            {/* Cerrar sesión */}
            <TouchableOpacity
                style={[
                    styles.botonCerrar,
                    { backgroundColor: colors.danger }
                ]}
                onPress={logout}
            >
                <Text
                    style={[
                        styles.textoBoton,
                        { color: colors.onPrimary }
                    ]}
                >
                    Cerrar sesión
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
    },

    titulo: {
        fontSize: fontSizes.title,
        fontWeight: 'bold',
        marginBottom: spacing.lg,
    },

    tarjeta: {
        borderWidth: 1,
        borderRadius: radius.md,
        padding: spacing.md,
        marginBottom: spacing.md,
    },

    etiqueta: {
        fontSize: fontSizes.small,
        marginBottom: spacing.xs,
    },

    usuario: {
        fontSize: fontSizes.subtitle,
        fontWeight: 'bold',
    },

    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textos: {
        flex: 1,
        marginRight: spacing.md,
    },

    subtitulo: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
    },

    descripcion: {
        fontSize: fontSizes.small,
    },

    botonCerrar: {
        borderRadius: radius.md,
        padding: spacing.md,
        alignItems: 'center',
        marginTop: spacing.md,
    },

    textoBoton: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;