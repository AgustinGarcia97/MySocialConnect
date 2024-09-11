import {View} from "react-native";
import {Text} from 'react-native-paper'
import {profile_style} from "../assets/styles/profile/profile_style";
export const Profile = () => {
    return (
        <View style={{...profile_style.profile_container}}>
            <View style={{...profile_style.header_options_container}}>
                <Text>Editar perfil</Text>
            </View>
            <View style={{...profile_style.user_info_container}}>
                <View style={{...profile_style.profile_pic_name_container}}>
                    <View style={{...profile_style.user_profile_pic_container}}>
                        <Text>Foto de perfil</Text>
                    </View>
                    <View style={{...profile_style.user_profile_username_container}}>
                        <Text>Nombre y @username</Text>
                    </View>
                </View>

                <View style={{...profile_style.user_profile_bio_container}}>
                    <Text>Bio de usuario</Text>
                </View>

                <View style={{...profile_style.user_profile_follows_followers_container}}>
                    <Text>publicaciones seguidores siguiendo</Text>
                </View>

            </View>

            <View style={{...profile_style.user_profile_post_options_container}}>
                <Text>Publicaciones button</Text>
            </View>
            <View style={{...profile_style.user_profile_post}}>
                <Text>Posts</Text>
            </View>

        </View>
    )
}
