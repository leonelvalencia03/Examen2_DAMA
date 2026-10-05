// Pantalla de inicio de sesión (login simulado)
import { useState } from 'react';
import {View, Text, TextInput, Pressable, StyleSheet, Alert} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen(){
    const {login} = useAuth();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleLogin = async () => {
        if(!usuario.trim() || !password.trim()){
            setError('Ingresa usuario y contraseña');
            return;
        }
        setError('');
        setCargando(true);
        try{
            const ok = await login(usuario.trim(), password);
             if (!ok) setError('Usuario o contraseña incorrectos');
        } catch (error) {
            Alert.alert('Error', 'No se pudo iniciar sesión');
        }finally{
            setCargando(false);
        }
    };

    return (
    <View>
        <Text style={styles.titulo}>Iniciar sesión</Text>

        <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // oculta la contraseña
      />
      {/* Mensaje de validación */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        style={[styles.boton, cargando && styles.botonDeshabilitado]}
        onPress={handleLogin}
        disabled={cargando}
      >
        <Text style={styles.botonTexto}>{cargando ? 'Ingresando...' : 'Ingresar'}</Text>
      </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24 
},
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    textAlign: 'center' 
},
  input: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8,
    padding: 12, 
    marginBottom: 12, 
    fontSize: 16,
},
  error: { 
    color: '#dc2626', 
    marginBottom: 12 
},
  boton: { 
    backgroundColor: '#2563eb', 
    padding: 14, 
    borderRadius: 8, 
    alignItems: 'center' 
},
  botonDeshabilitado: { 
    opacity: 0.6 
},
  botonTexto: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
},
});