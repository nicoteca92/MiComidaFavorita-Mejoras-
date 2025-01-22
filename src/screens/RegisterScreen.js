import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';import { auth } from '../config/firebase';
export default function RegisterScreen({ navigation }) {
  //Inicializaci;on de variables y estados
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  //Validación de datos para Registrar al usuario
  const handleRegister = async () => {
    setIsLoading(true);//Loading state
    try {
      if (email == "") throw 'El email es requerido';
      const isEmailValid = /\S+@\S+\.\S+/.test(email);
      if (!isEmailValid) throw 'Email inválido';
      
      if (password == "") throw 'La contraseña es requerida';
      const passwordRegex = /(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
      const isPasswordValid = passwordRegex.test(password);
      if (!isPasswordValid) throw 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial';
      
      if (confirmPassword !== password) throw 'Las contraseñas no coinciden';
      //Validadciones de Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      setError('Error al registrarse: ' + error);
    } finally {
      setIsLoading(false);//Loading state
    }
  };
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Registro</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
      <Button
        title="Registrarse"
        onPress={handleRegister}
        containerStyle={styles.button}
        disabled={isLoading}
      />
      )}
      <Button
        title="Volver al Login"
        type="outline"
        onPress={() => navigation.navigate('Login')}
        containerStyle={styles.button}
        disabled={isLoading}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});