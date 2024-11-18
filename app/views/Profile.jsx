import { TouchableOpacity, View, TextInput,   } from "react-native";
import { profile_style } from "../assets/styles/profile/profile_style";
import { ProfileTabView } from "../components/profile_components/user/ProfileTabView";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { IconButton, MD3Colors, Text,Avatar} from 'react-native-paper'
import {updateBio, updateLastname, updateName, updateProfilePic, updateUsername} from "../redux/slices/userSlice";
import {fetch_update_user} from "../api/fetch_user_data";

export const Profile = () => {

    const defaultProfilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    const defaultBio = "Software developer. #coding #java #nonstop something about java something about me bla bla bla bla bla bla bla";


    const user = useSelector((state) => state.user);
    const followersR = user.followers;
    const followingR = user.following;
    const userId = useSelector((state) => state.user.userId);
    const [name, setName] = useState(useSelector(state => state.user.name));
    const [lastname, setLastName] = useState(useSelector(state => state.user.lastname));
    const [username, setUsername] = useState(useSelector(state => state.user.username));
    const [profilePic,setProfilePic] = useState(useSelector(state => state.user.profilePic))
    const [bio, setBio] = useState(useSelector(state => state.user.bio));
    const [isEditing, setIsEditing] = useState(false);
    const [followers, setFollowers] = useState(followersR);
    const [followings, setFollowing] = useState(followingR);
    const dispatch = useDispatch();

    const toggleEditing = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            if(name){
                dispatch(updateName(name));
            }
            if(lastname){
                dispatch(updateLastname(lastname));
            }
            if(bio){
                dispatch(updateBio(bio));
            }
            if(username){
                dispatch(updateUsername(username));
            }
            if(profilePic){
                dispatch(updateProfilePic(profilePic));
            }
            const data = {
                name,
                lastname,
                profilePic,
                username,
                bio
            }
            await fetch_update_user(data,userId);
        }

    };

    useEffect(() => {
        setName(user.name);
        setLastName(user.lastname);
        setUsername(user.username);
        setProfilePic(user.profilePic);
        setBio(user.bio);
        setFollowers(user.followers);
        setFollowing(user.following);
    }, [user]);


    useEffect(() => {
            setFollowing(followingR);
            setFollowers(followersR)
        },[user]
    )

    return (
        <View style={profile_style.profile_container}>
            <View style={{ ...profile_style.header_options_container, flexDirection: 'row-reverse' }}>
                <TouchableOpacity style={profile_style.options_button} onPress={toggleEditing}>
                    <Text style={profile_style.options_button_text}>
                        {isEditing ? "Guardar" : "Editar Perfil"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={profile_style.user_info_container}>
                <View style={profile_style.profile_pic_name_container}>
                    <View style={profile_style.user_profile_pic_container}>
                        <Avatar.Image
                            size={60}
                            source={{
                                uri: profilePic?.photoUrl !== "" ? profilePic.photoUrl : defaultProfilePic
                            }}
                        />
                    </View>

                    <View style={profile_style.user_profile_username_container}>
                        {isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={name}
                                onChangeText={setName}
                                style={profile_style.name_text}
                                placeholder="Nombre"
                            />
                        ) : (
                            <Text style={profile_style.name_text}>{name + " " + lastname}</Text>
                        )}

                        {isEditing ? (
                            <TextInput
                                mode="outlined"
                                value={username}
                                onChangeText={setUsername}
                                style={profile_style.username_text}
                                placeholder="Username"
                            />
                        ) : (
                            <Text style={profile_style.username_text}>@{username}</Text>
                        )}
                    </View>
                </View>

                <View style={profile_style.user_profile_bio_container}>
                    {isEditing ? (
                        <TextInput
                            mode="outlined"
                            multiline
                            value={bio}
                            onChangeText={setBio}
                            style={profile_style.bio_text}
                            placeholder="Bio"
                        />
                    ) : (
                        <Text style={profile_style.bio_text}>{bio}</Text>
                    )}
                </View>

                <View style={profile_style.user_profile_follows_followers_container}>
                    <Text style={profile_style.post_text}>
                        <Text style={{ fontWeight: 'bold' }}>{user.posts? user.posts.length:0}{' '}</Text>Publicaciones
                    </Text>
                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{followers? followers.length:0}{' '}</Text>Seguidores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{followings?followings.length:0}{' '}</Text>Siguiendo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ProfileTabView />
        </View>
    );
}
