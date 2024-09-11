import {StyleSheet} from "react-native";

export const profile_style =  StyleSheet.create({
    profile_container: {
        height:'auto',
    },
    header_options_container: {
        height: 50,
        backgroundColor: '#ab1562',
    },
    user_info_container: {
        height: 175,
        backgroundColor: '#81ef1b',
        flexDirection: 'column',
    },
    profile_pic_name_container:{
        flexDirection: 'row',
        height:'40%',
    },
    user_profile_pic_container:{
        width:'25%',
        height:'100%',
        backgroundColor: '#b2673c',
        marginRight:5,
    },
    user_profile_username_container:{
        width:'70%',
        height:'100%',
        backgroundColor: '#b2673c',
    },
    user_profile_bio_container:{
        backgroundColor:'#b19fda',
        height:'40%'
    },
    user_profile_follows_followers_container: {
        backgroundColor:'#b19fda',
        margin:5,
        padding:3,
    },
    user_profile_post_options_container:{
        backgroundColor:'#f1ca0b',
        height:45,
    },
    user_profile_post:{
        backgroundColor:"#1ec0c0",
        height:500,



    }

})
