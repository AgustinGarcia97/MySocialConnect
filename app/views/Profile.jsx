import {TouchableOpacity, View, Image, ScrollView, FlatList, Dimensions, SafeAreaView} from "react-native";
import { IconButton, MD3Colors, Text,Avatar} from 'react-native-paper'
import {profile_style} from "../assets/styles/profile/profile_style";
import Icon from 'react-native-vector-icons/Ionicons';
import {ProfileTabView} from "../components/profile_components/ProfileTabView";


export const Profile = () => {


    const post = [1,2,3,4];
    return (
        <View style={{...profile_style.profile_container}}>
            <View style={{...profile_style.header_options_container}}>
                <TouchableOpacity>
                    <Icon
                        name={'chevron-back'}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{...profile_style.options_button}}>
                    <Text style={{...profile_style.options_button_text}}>Editar Perfil</Text>
                </TouchableOpacity>
            </View>
            <View style={{...profile_style.user_info_container}}>
                <View style={{...profile_style.profile_pic_name_container}}>
                    <View style={{...profile_style.user_profile_pic_container}}>
                        <Avatar.Image
                            size={60}
                            source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} />
                    </View>
                    <View style={{...profile_style.user_profile_username_container}}>
                        <Text style={{...profile_style.name_text}}>John Doe</Text>
                        <Text style={{...profile_style.username_text}}>@username</Text>
                    </View>
                </View>

                <View style={{...profile_style.user_profile_bio_container}}>
                    <Text style={{...profile_style.bio_text}}>Software developer.
                    #coding #java #nonstop something about java something about me bla bla bla
                    bla bla bla bla bla bla bla</Text>
                </View>

                <View style={{...profile_style.user_profile_follows_followers_container}}>
                    <Text style={profile_style.post_text}><Text style={{fontWeight:'bold'}}>10{' '}</Text>Publicaciones</Text>

                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{fontWeight:'bold'}}>200{' '}</Text>Seguidores</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={profile_style.post_text}>
                        <Text ><Text style={{fontWeight:'bold'}}>189{' '}</Text>Siguiendo</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <ProfileTabView></ProfileTabView>

        </View>
    )
}
