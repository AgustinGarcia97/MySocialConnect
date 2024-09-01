import {StyleSheet} from "react-native";

export const feedStyles = StyleSheet.create({
    feed_layout: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        height:'100%',
        alignItems: 'center',
        width: '100%',

    },
    text_container: {
        width:"90%",
        padding:10,
    },

    input_text:{

    },

})

export const post_style = StyleSheet.create({
    container: {
        height:700,
        width:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        margin:5,
        marginBottom:5,
        elevation: 0,
        borderWidth: 0,
    },
    title_container:{
        width:'100%',
        borderWidth: 0,
    },
    text_container: {
        width:"90%",
        padding:10,
    },
    post_title: {
        width:"100%",
    },
    photo_container:{
        borderWidth: 0,
        height:100,
        backgroundColor: '#e7b6b6',
    },
    post_photo:{
        width:'100%',
        height:'100%',
        borderRadius: 0,

    },
    social_container:{

        width:'100%',
        bottom:500,

        flexDirection: 'row',
        padding:5,
        justifyContent: 'center',
        alignItems: 'center',



    },
    icon_container:{

        height:40,
        width:'17%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',




    },
    comment_container:{
        width:'15%',
        backgroundColor:'blue'
    }


})


