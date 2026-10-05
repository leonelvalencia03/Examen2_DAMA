import { createContext, useContext, useEffect, useState } from 'react';
import { saveSession, getSession, saveUser, getUser, clearStorage } from '../services/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) =>{
        const userData = {
            nombreUsuario: username,
            nombre: username
        };
        await saveSession(username);
        await saveUser(userData); 
        setUser(userData);

        return true;
    };

    const logout = async () => {
        await clearStorage();
        setUser(null);
    };

    useEffect(() => {
        const loadSession = async () => {
            const token = await getSession();

            if(token){
                const savedUser = await getUser();
                setUser(savedUser);
            }
        };

        loadSession();
    }, []);

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);