import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import PhotoIcon from "../../../../assets/icons/PhotoIcon";
import Icon from 'react-native-vector-icons/Fontisto';
import storage from '@react-native-firebase/storage';
import { useDispatch, useSelector } from "react-redux";
import {addPhotos} from "../../../../redux/slices/postSlice";


const ImagePickerComponent = () => {
    const [images, setImages] = useState([null, null, null, null]);
    const dispatch = useDispatch();

    const selectImage = async (index) => {
        try {
            const result = await ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (!result.didCancel && result.assets && result.assets.length > 0) {
                const newImages = [...images];
                const selectedImageUri = result.assets[0].uri;

                newImages[index] = selectedImageUri;
                setImages(newImages);


                await uploadImage(selectedImageUri, index);
            }
        } catch (error) {
            console.error('Error selecting image: ', error);
        }
    };

    const uploadImage = async (uri, index) => {
        if (uri) {
            const fileName = uri.substring(uri.lastIndexOf('/') + 1);
            const reference = storage().ref(fileName);

            try {
                await reference.putFile(uri);
                console.log(`Image uploaded to Firebase Storage: ${fileName}`);

                const downloadURL = await reference.getDownloadURL();
                console.log(`Download URL: ${downloadURL}`);
                dispatch(addPhotos(downloadURL));


            } catch (error) {
                console.error('Error uploading image: ', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            {images.map((imageUri, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.imageContainer}
                    onPress={() => selectImage(index)}
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
            <PhotoIcon />
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
