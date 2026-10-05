import { createContext, useContext, useEffect, useState } from 'react';
import { saveTheme, getTheme } from '../services/storage';
import { getColors } from '../styles/theme';
import { useAuth } from './AuthContext';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { user } = useAuth();

    const [theme, setTheme] = useState('light');

    const isDark = theme === 'dark';
    const colors = getColors(isDark);

    //Carga el tema del usuario actual
    useEffect(() => {
        const loadTheme = async () => {

            //Si no hay usuario, vuelve al tema claro
            if (!user?.nombreUsuario) {
                setTheme('light');
                return;
            }

            const savedTheme = await getTheme(user.nombreUsuario);

            //Si el usuario nunca guardó un tema, se usa el tema claro
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                setTheme('light');
            }
        };

        loadTheme();
    }, [user]);

    const toggleTheme = async () => {
        if (!user?.nombreUsuario) {
            return;
        }

        const newTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);

        await saveTheme(
            user.nombreUsuario,
            newTheme
        );
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colors,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);