import {StyleSheet} from "react-native";

export const profile_style =  StyleSheet.create({
    profile_container: {
        height:'auto',
    },
    header_options_container: {
        height: 50,
        backgroundColor: '#f6f5f5',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
    },
    options_button:{
        backgroundColor:'#fff',
        borderWidth: 1,
        marginRight:10,
        borderRadius:5,
        height:33,
        padding:0,
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
    },
    options_button_text:{
        fontSize:15,
        fontWeight:'bold',
        color:'#777575',
        borderColor:'#cccbcb'
    },
    user_info_container: {
        height: "auto",
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    profile_pic_name_container:{
        flexDirection: 'row',
        height:80,
    },
    user_profile_pic_container:{
        width:'20%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    user_profile_username_container:{
        width:'70%',
        height:'100%',
        justifyContent:'center',
    },
    name_text:{
        fontWeight:'bold',
        fontSize:20,
    },
    username_text: {

    },
    user_profile_bio_container:{
        height:'auto',
        justifyContent:'center',
        alignItems:'start',
    },
    bio_text:{
        width:'90%',
        fontSize:14,
        padding:10,
    },
    user_profile_follows_followers_container: {
        margin:5,
        padding:3,
        flexDirection:'row',
    },
    post_text:{
        margin:5,
    },
    user_profile_post_options_container:{
        height:40,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',

    },
    user_profile_post_options:{
        fontSize:16,
        fontWeight:'bold',
        color:"#1487d9",

    },
    user_profile_post_container:{
        backgroundColor:"#fff",
        height:'auto'


    },

    user_post:{
        flex: 1,

    },
    post_img:{
       flex:1,
    },
    imageContainer: {
        padding:1,
        flex: 1,

    },


})
