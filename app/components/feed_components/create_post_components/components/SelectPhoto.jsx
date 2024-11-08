import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Alert, PermissionsAndroid, Platform } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Fontisto';
import storage from '@react-native-firebase/storage';
import { addPhotos } from "../../../../redux/slices/postSlice";
import { useDispatch } from "react-redux";

const ImagePickerComponent = () => {
    const [images, setImages] = useState([null, null, null, null]);
    const dispatch = useDispatch();

    // Verificar permisos en Android
    const requestGalleryPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Permiso de Acceso a la Galería",
                    message: "Esta aplicación necesita acceder a tu galería para seleccionar imágenes.",
                    buttonNeutral: "Preguntar luego",
                    buttonNegative: "Cancelar",
                    buttonPositive: "Aceptar"
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    // Función para seleccionar la imagen de la galería
    const selectImage = async (index) => {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) {
            Alert.alert("Permiso Denegado", "No tienes permisos para acceder a la galería.");
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            console.log("Resultado de ImagePicker:", result);

            // Verificación adicional para evitar errores
            if (result && result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;

                if (selectedImageUri) {
                    const newImages = [...images];
                    newImages[index] = selectedImageUri;
                    setImages(newImages);
                    dispatch(addPhotos(newImages));

                    // Cargar imagen a Firebase y obtener URL de descarga
                    await uploadImage(selectedImageUri, index);
                } else {
                    console.warn("La URI de la imagen seleccionada es undefined.");
                    Alert.alert("Error", "No se pudo obtener la URI de la imagen seleccionada.");
                }
            } else {
                console.warn("No se seleccionó ninguna imagen o hubo un problema al acceder a ella.");
                Alert.alert("Error", "No se seleccionó ninguna imagen o hubo un problema al acceder a ella.");
            }
        } catch (error) {
            console.error('Error seleccionando la imagen: ', error);
            Alert.alert("Error", "Ocurrió un error al seleccionar la imagen.");
        }
    };

    // Función para subir la imagen a Firebase Storage
    const uploadImage = async (uri, index) => {
        if (uri) {
            const fileName = uri.substring(uri.lastIndexOf('/') + 1);
            const reference = storage().ref(fileName);

            try {
                await reference.putFile(uri);
                console.log(`Imagen subida a Firebase Storage: ${fileName}`);

                // Obtener URL de descarga y actualizar estado
                const downloadURL = await reference.getDownloadURL();
                Alert.alert("URL de descarga", downloadURL);

                const updatedImages = [...images];
                updatedImages[index] = downloadURL;
                setImages(updatedImages);
                dispatch(addPhotos(updatedImages));

            } catch (error) {
                console.error('Error al subir la imagen: ', error);
                Alert.alert("Error", "Ocurrió un error al subir la imagen.");
            }
        }
    };

    return (
        <View style={styles.container}>
            {images.map((imageUri, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.imageContainer}
                    onPress={() => selectImage(index)} // Al presionar, seleccionamos la imagen
                >
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <View style={styles.placeholder}>
                            <Icon name="photograph" size={30} color="#475A7E" />
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(182,181,173,0.34)',
        border: '2px solid #000',
        borderRadius: 5,
        height: 320,
        gap: 1,
    },
    imageContainer: {
        flexBasis: '46%',
        height: "47%",
        marginBottom: 1,
        backgroundColor: 'rgb(182,181,173)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 9,
        marginTop: 7,
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.43)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default ImagePickerComponent;
