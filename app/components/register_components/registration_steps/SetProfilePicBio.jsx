import {useState} from "react";
import {useDispatch} from "react-redux";
import {Image, TouchableOpacity, View,StyleSheet} from "react-native";

import {Text, TextInput} from "react-native-paper";
import {createAccountStyle, register_style} from "../../../assets/styles/register/register_style";
import {fetch_login} from "../../../api/fetch_user_data";
import * as ImagePicker from "react-native-image-picker";
import {addPhotos} from "../../../redux/slices/postSlice";
import Icon from 'react-native-vector-icons/Fontisto';
import storage from "@react-native-firebase/storage";
import {setBioSlice, setProfilePicSlice} from "../../../redux/slices/registerSlice";



export const SetProfilePicBio = ({navigation}) => {

    const [bio, setBio] = useState('');
    const dispatch = useDispatch();


    return(
        <View style={{...createAccountStyle.create_account_container, alignItems:'center'}}>
            <View style={{...createAccountStyle.logo_title_container}}>
                <View style={{...register_style.register_logo_container}}>
                    <Image source={require('../../../assets/logos/logo.png')}
                           style={{...register_style.logo,height:150,width:150}} resizeMode="cover"/>

                </View>
                <Text style={{...createAccountStyle.logo_title}}>Crea tu cuenta</Text>
                <Text style={{...createAccountStyle.subtitle,fontSize:18,marginTop:20}}>Subí una foto de Perfil</Text>
            </View>
            <View style={{...createAccountStyle.inputs_texts_container}}>


                        <View  style={{...createAccountStyle.input_text_container, alignItems:'center'}}>
                            <ProfileImagePicker/>
                        </View>

            </View>

            <View style={{ alignItems:'center', height:80, width:350, gap:15, marginVertical:20 }}>
                <Text style={{...createAccountStyle.subtitle,fontSize:18}}>Escribí tu bio</Text>
                <TextInput
                    style={{fontSize: 16, color: '#690909', textAlignVertical: 'top', height:100, width:'100%',backgroundColor:'#fff',borderWidth:2, borderColor:'rgba(114,112,112,0.22)' }}
                    placeholder="Escribe una breve biografía..."
                    value={bio}
                    onChangeText={(text) => {
                        setBio(text);
                        dispatch(setBioSlice(text));
                    }}
                    maxLength={150}
                    multiline
                />
            </View>



            <View style={{...createAccountStyle.next_button_container,  marginVertical: 115,}}>


                <TouchableOpacity onPress={() => navigation.navigate('CreatePassword')}>
                    <View style={{...createAccountStyle.next_button,backgroundColor:'#475a7e'}}>
                        <Text style={{...createAccountStyle.text_button,fontSize:20}}>Siguiente</Text>
                    </View>
                </TouchableOpacity>
                <View style={{...register_style.existing_account_container,height:40,
                    padding:5,margin:5}}>
                    <Text style={{...register_style.simple_text}}>Ya tenes una cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text  style={{...register_style.pressable_text}}>Inicia sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const ProfileImagePicker = () => {
    const [imageUri, setImageUri] = useState(null);
    const dispatch = useDispatch();

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
            });

            if (!result.didCancel && result.assets && result.assets.length > 0) {
                const selectedImageUri = result.assets[0].uri;
                setImageUri(selectedImageUri);

                // Upload the image to Firebase Storage
                await uploadImage(selectedImageUri);
            }
        } catch (error) {
            console.error('Error selecting image: ', error);
        }
    };

    const uploadImage = async (uri) => {
        if (uri) {
            const fileName = uri.substring(uri.lastIndexOf('/') + 1);
            const reference = storage().ref(fileName);

            try {
                await reference.putFile(uri);
                const downloadURL = await reference.getDownloadURL();
                dispatch(setProfilePicSlice(downloadURL));
            } catch (error) {
                console.error('Error uploading image: ', error);
            }
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={selectImage}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <Icon name="photograph" size={50} color="#475A7E" />
            )}
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(182,181,173,0.34)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
