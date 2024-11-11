import { TouchableOpacity, View, TextInput,   } from "react-native";
import { profile_style } from "../assets/styles/profile/profile_style";
import { ProfileTabView } from "../components/profile_components/ProfileTabView";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { IconButton, MD3Colors, Text,Avatar} from 'react-native-paper'
import {fetch_add_follow_followers, unfollow} from "../api/fetch_user_data";
import {ProfileSearchTabView} from "../components/profile_components/UserSearchTabView";

export const SearchedProfile = () => {


    const defaultBio = "Software developer. #coding #java #nonstop something about java something about me bla bla bla bla bla bla bla";
    const user = useSelector((state) => state.user.searched);

    const defaultProfilePic =  user.profilePicture !== null? user.profilePicture.photoUrl :  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    const [bio, setBio] = useState(defaultBio);
    const [isEditing, setIsEditing] = useState(false);
    const [followers, setFollowers ] = useState(user.followers?user.followers.length:0);
    const [following, setFollowing] = useState(user.following?user.following.length:0);
    const [posts,setPosts] = useState(user.post?user.post.length:0);
    const userId = useSelector((state) => state.user.userId);
    const token = useSelector((state) => state.user.token);
    const followingList = useSelector(state => state.user.following);
    let match;
    if (followingList.length > 0) {
         match = followingList.filter(f => f.userId === user.userId);
        if (match.length > 0 && !isEditing) {
            setIsEditing(true);
        }
    }


    const dispatch = useDispatch();
    const toggleEditing = async () => {
        setIsEditing(!isEditing)
        if(isEditing){
            setFollowers(followers - 1);
            await unfollow()
        } else{
            setFollowers(followers + 1);
            const data = {
                followerId: userId,
                followedId:  user.userId
            }

            await fetch_add_follow_followers(dispatch,data,token)
        }
    };

    return (
        <View style={profile_style.profile_container}>
            {token?
                (
            <View style={{ ...profile_style.header_options_container, flexDirection: 'row-reverse' }}>

                        <TouchableOpacity style={{...profile_style.options_button,borderColor:'rgb(150,148,148)',backgroundColor:isEditing?'#7e7c7c':"#4b6eaf"}} onPress={toggleEditing}>
                            <Text style={{...profile_style.options_button_text,color:"#fff"}}>
                                {isEditing ? "Siguiendo" : "Seguir"}
                            </Text>
                        </TouchableOpacity>



            </View>) :
                (
                <></>  )

            }

            <View style={profile_style.user_info_container}>
                <View style={profile_style.profile_pic_name_container}>
                    <View style={profile_style.user_profile_pic_container}>
                        <Avatar.Image size={60} source={{ uri: defaultProfilePic }} />
                    </View>

                    <View style={profile_style.user_profile_username_container}>

                            <Text style={profile_style.name_text}>{user.name + " " + user.lastname}</Text>
                            <Text style={profile_style.username_text}>@{user.username}</Text>

                    </View>
                </View>

                <View style={profile_style.user_profile_bio_container}>

                        <Text style={profile_style.bio_text}>{user.bio?user.bio:""}</Text>

                </View>

                <View style={profile_style.user_profile_follows_followers_container}>
                    <Text style={profile_style.post_text}>
                        <Text style={{ fontWeight: 'bold' }}>{posts?posts.length:0}{' '}</Text>Publicaciones
                    </Text>
                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{followers}{' '}</Text>Seguidores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{following}{' '}</Text>Siguiendo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ProfileSearchTabView/>
        </View>
    );
}
