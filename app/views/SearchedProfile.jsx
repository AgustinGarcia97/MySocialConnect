import { TouchableOpacity, View, TextInput,   } from "react-native";
import { profile_style } from "../assets/styles/profile/profile_style";
import { ProfileTabView } from "../components/profile_components/user/ProfileTabView";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { IconButton, MD3Colors, Text,Avatar} from 'react-native-paper'
import {fetch_add_follow_followers, unfollow} from "../api/fetch_user_data";
import {ProfileSearchTabView} from "../components/profile_components/searched/UserSearchTabView";
import {addFollow, addFollowingUser, removeFollow, removeFollowingUser} from "../redux/slices/userSlice";
import {addFollower, removeFollower} from "../redux/slices/searchedSlice";
import {useRoute} from "@react-navigation/core";
import {addFollowingPosts, removeFollowingPosts} from "../redux/slices/postSlice";

export const SearchedProfile = () => {

    //importar todos los state de Searched.
    const defaultBio = "Software developer. #coding #java #nonstop something about java something about me bla bla bla bla bla bla bla";
    const route = useRoute();
    const { user: searchedUser } = route.params;
    const p = searchedUser.posts;
    const dispatch = useDispatch();
    const [name,setName] = useState(searchedUser.name);
    const [lastname, setLastname] = useState(searchedUser.lastname);
    const [username, setUsername] = useState(searchedUser.nickname);
    const [followers, setFollowers] = useState(searchedUser.followers);
    const [following, setFollowing] = useState(searchedUser.following);
    const [posts, setPosts] = useState(searchedUser.posts? searchedUser.posts.length : 0);
    const [bio, setBio] = useState(searchedUser.biography);
    const token = useSelector((state) => state.user.token);
    const userId = useSelector((state) => state.user.userId);
    const [isEditing, setEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState(
        searchedUser?.profilePicture ||
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    );


    console.log(searchedUser);

    useEffect(() => {
        setName(searchedUser.name);
        setLastname(searchedUser.lastname);
        setUsername(searchedUser.username);
        setProfilePicture(searchedUser.profilePicture);
        setPosts(searchedUser.posts.length);
        setBio(searchedUser.biography);
        setFollowers(searchedUser.followers);
        setFollowing(searchedUser.following);
        setEditing( searchedUser.followers.some(follower => follower.userId === userId));
    }, [searchedUser]);

/*
    useEffect(() => {

        if (followers.some(follower => follower.userId === userId)) {
            console.log("SEGUIDOS",JSON.stringify(followers));
            setEditing(true);

        }
    }, [followers, userId]); */

    const handleFollowToggle = async () => {
        if (isEditing) {

            setFollowers(followers.filter(follower => follower.userId !== userId));
            setEditing(false);
            dispatch(removeFollowingUser(searchedUser.userId));
            dispatch(removeFollowingPosts(searchedUser.userId));

            const data = {
                followerId: userId,
                followedId:searchedUser.userId,
            }
            await unfollow(data);
        } else {

            setFollowers([...followers, { userId }]);
            setEditing(true);

            const user = {
                name,
                lastname,
                profilePicture,
                username,
                userId: searchedUser.userId,


            }

            dispatch(addFollowingUser(user));
            dispatch(addFollowingPosts(p));

            const data = {
                followerId: userId,
                followedId:searchedUser.userId,
            }
            await fetch_add_follow_followers(data,token );
        }
    };


    return (
        <View style={profile_style.profile_container}>
            {token?
                (
            <View style={{ ...profile_style.header_options_container, flexDirection: 'row-reverse' }}>

                        <TouchableOpacity style={{...profile_style.options_button,borderColor:'rgb(150,148,148)',
                            backgroundColor:isEditing?'#7e7c7c':"#4b6eaf",}}
                                          onPress={handleFollowToggle}>
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
                        <Avatar.Image
                            size={60}
                            source={{
                                uri: profilePicture?.photoUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                            }}
                        />
                    </View>

                    <View style={profile_style.user_profile_username_container}>

                            <Text style={profile_style.name_text}>{name + " " + lastname}</Text>
                            <Text style={profile_style.username_text}>@{username}</Text>

                    </View>
                </View>

                <View style={profile_style.user_profile_bio_container}>

                        <Text style={profile_style.bio_text}>{bio}</Text>

                </View>

                <View style={profile_style.user_profile_follows_followers_container}>
                    <Text style={profile_style.post_text}>
                        <Text style={{ fontWeight: 'bold' }}>{posts}{' '}</Text>Publicaciones
                    </Text>
                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{followers.length || 0}{' '}</Text>Seguidores</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={profile_style.post_text}>
                        <Text><Text style={{ fontWeight: 'bold' }}>{following.length || 0}{' '}</Text>Siguiendo</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ProfileSearchTabView/>
        </View>
    );
}
