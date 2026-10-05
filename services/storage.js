import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = 'sessionToken';
const USER_KEY = 'userData';

export const saveSession = async (token) => {
    await AsyncStorage.setItem(SESSION_KEY, token);
};

export const getSession = async () => {
    return await AsyncStorage.getItem(SESSION_KEY);
};

export const removeSession = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
};

export const saveUser = async (user) => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async () => {
    const data = await AsyncStorage.getItem(USER_KEY);

    return data ? JSON.parse(data) : null;
};

//Guarda el tema correspondiente a un usuario específico
export const saveTheme = async (username, theme) => {
    await AsyncStorage.setItem(`theme_${username}`, theme);
};

//Obtiene el tema correspondiente a un usuario específico
export const getTheme = async (username) => {
    return await AsyncStorage.getItem(`theme_${username}`);
};

//Limpia solamente la sesión actual.
//Los temas de los usuarios se conservan.
export const clearStorage = async () => {
    await AsyncStorage.multiRemove([
        SESSION_KEY,
        USER_KEY
    ]);
};