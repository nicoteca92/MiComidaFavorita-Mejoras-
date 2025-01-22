import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
export default function HomeScreen({ navigation }) {
  //Inicialización de variables y estados
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    fotoPerfil: null,
    nombre: '',
    apellido: '',
    comidaFavorita: ''
  });
  //Carga de datos del perfil de usuario
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    setIsLoading(true);//Loading state
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
 
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    }  finally {
        setIsLoading(false);//Loading state
    }
  };
  //Actualización de datos del perfil de usuario
  const handleUpdate = async () => {
    setIsLoading(true);//Loading state
    try { await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar perfil');
    } finally {
      setIsLoading(false);//Loading state
    }
  };
  //Cierre de sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  //Selección de foto de perfil
  
  let uploadImage = async () => {
    let resultPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (resultPermiso.granted === true) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (result.canceled == true) {
        return;
      }
      else{
        setProfile({...profile, fotoPerfil: result.assets[0].uri})
      }
    }
  };

  let takePhoto = async () => {
    let resultPermiso = await ImagePicker.requestCameraPermissionsAsync();
    if (resultPermiso.granted === true) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (result.canceled == true) {
        return;
      }
      else{
        setProfile({...profile, fotoPerfil: result.assets[0].uri})
      }
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Mi Perfil</Text>
      <View style={styles.container2}>
        
        <TouchableOpacity //Para cargar foto desde la galeria
          value={profile.fotoPerfil}
          style={styles.button}
          onPress={uploadImage}>
            <Image source={{uri: profile.fotoPerfil}}
            style={styles.logo}/>
            <Text style={styles.text}>
            Cargar Nueva Foto
            </Text>
        </TouchableOpacity>
        <TouchableOpacity //Para tomar foto con la cámara
          onPress={takePhoto}>
          <Image source={require('./camara.png')}
          style={styles.camara}/>
        </TouchableOpacity>
        
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (null)}
      <Input
        placeholder="Nombre"
        value={profile.nombre}
        onChangeText={(text) => setProfile({...profile, nombre: text})}
      />
      <Input
        placeholder="Apellido"
        value={profile.apellido}
        onChangeText={(text) => setProfile({...profile, apellido: text})}
      />
      <Input
        placeholder="Comida Favorita"
        value={profile.comidaFavorita}
        onChangeText={(text) => setProfile({...profile, comidaFavorita: text})}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />//Loading state
      ) : (
        <Button
          title="Actualizar Perfil"
          onPress={handleUpdate}
          containerStyle={styles.button}
          disabled={isLoading}
        />
      )}
        <Button
          title="Cerrar Sesión"
          type="outline"
          onPress={handleSignOut}
          containerStyle={styles.button}
          disabled={isLoading}
        />
    </View>
  );
}
const styles = StyleSheet.create({
 container: {flex: 1,
    padding: 20,
  },
  container2: {flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 10,
  },
  logo:{
    alignSelf: 'center',
    borderRadius: 25,
    height:100,
    width:100
  },
  camara:{
    height:30, 
    width:30, 
    margin: 5
  },
  text:{
    fontStyle: 'italic'
  }
});