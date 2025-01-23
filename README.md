# MiComidaFavorita-Mejoras-
Modulo5_Univalle

Para instalar los archivos se requiere seguir los siguientes pasos:

1.- Crear Proyecto EXPO
  - #Crear nuevo proyecto
  - npx create-expo-app MiComidaFavorita --template blank
  - cd MiComidaFavorita
  - #Instalar dependencias
  - npm install @react-navigation/native @react-navigation/native-stack
  - npm install firebase
  - npm install react-native-elements
  - npm install expo-constants
  - npm install react-native-safe-area-context
  - npm install expo-image-picker

2.- Configurar Firebase
- Ir a Firebase Console (https://console.firebase.google.com/)
- Crear nuevo proyecto MiComidaFavorita
- Habilitar Authentication (Email/Password)
- Crear Cloud Firestore
- Registrar la aplicación web
- Copiar la configuración de Firebase en el archivo /src/config/firebase.js "const firebaseConfig"

3.- Copiar archivos
- Copiar todos los archivos del repositorio en la carpeta 'MiComidaFavorita' de su computador.

4.- Ejecución
- Ejecutar 'npx expo start' en el CMD y escanear código QR con ExpoGO en un dispositivo físico.


MEJORAS IMPLEMENTADAS.
- En el formulario de Registro se agregaron los siguientes requerimientos:
    - El campo del email no puede estar vacío
    - Formato correcto de email
    - Contraseña m{inimo de 8 caracteres que contenga al menos una mayúscula, una minúscula, un número y un caracter especial.
    - Se agregó un campo para ingresar la confirmación de la contraseña.
    - Se validan qe ambas contraseñas sean iguales
    - Se muestran los mensajes de error para cada caso de modo que no se puede registrar al usuario hasta que todos estos requisitos sean cumplidos.
- En el formulario de LogIn se agreagron los siguientes requerimientos:
    - Valida el formato del email.
    - Verifica que el campo de la contraseña no esté vacío.
    - No habilita el botón de LogIn hasta que estos requisitos sean cumplidos.
    - Se muestran los mensajes de error correspondientes.
- Implementación de Loading States
    - Se muestran indicadores de carga durante los siguientes procesos:
    - Registro de Usuario
    - LogIn de usuario
    - Carga de datos del perfil de usuario
    - Actualización de datos del perfil de usuario
    - Mientras se muestran los indicadores de carga, quedan deshabilitados los botones 'Registrar', 'Actualizar', 'Log In'
- Implementación de la Foto de Perfil
    - En el primer proceso de LogIn que realice el usuario podrá observar una imagen estándar de una persona.
    - Presionando en la imagen podrá acceder a la galería de imágenes del dispositivo para cargar una nueva foto de perfil.
    - De la misma manera puede presionar el ícono de 'cámara' que está a lado de la foto de perfil para poder tomarse una foto con la cámara del dispositivo y cargarla como nueva fot de perfil
    - En ambos casos la nueva imagen queda almacenada en Firebase y es recuperada en cada LogIn que haga el usuario.
    - La foto de perfil puede ser actualizada en cualquier momento al igual que los otros campos del perfil.
  

SCREENSHOTS DE LA APP


<img src="https://github.com/user-attachments/assets/222f8025-4746-409b-a34a-1571167004c0" alt="Alt Text" width="200" height="450">

<img src="https://github.com/user-attachments/assets/90b6441e-178f-43b2-92e7-171cda3929bd" alt="Alt Text" width="200" height="450">

<img src="https://github.com/user-attachments/assets/f156446b-92c1-48ea-9fd8-21a1a98975fa" alt="Alt Text" width="200" height="450">

