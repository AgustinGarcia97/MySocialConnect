import {StyleSheet} from "react-native";

const background = 'rgb(93,87,160)';
const linear_background = 'linear-gradient(180deg, rgba(93,87,160,1) 35%, rgba(35,33,62,1) 100%)'



export const feedStyles = StyleSheet.create({
    feed_layout: {
        flexDirection: 'column',

        height:'100%',
        alignItems: 'center',

        width: '100%',

    },
    text_container: {
        width:"90%",
        padding:10,
        height:100,
        marginVertical:10,
        justifyContent:'center',
    },

    input_text:{

    },

})

export const post_style = StyleSheet.create({
    container: {
        height:"auto",
        width:'99%',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom:15,
        elevation: 0,
        borderWidth: 0,
        backgroundColor: '#ffffff',
        marginVertical:30,
        justifyContent:'center',


    },
    title_container:{
        width:'100%',
        borderWidth: 0,
        padding:10,

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
        justifyContent: 'center',
        alignItems:'center',

    },
    post_photo:{
        width:'100%',
        height:'100%',
        borderRadius: 0,
        justifyContent: 'center',
        alignItems:'center',

    },
    social_container:{
        width:'100%',
        top:82,
        height:200,
        marginLeft:11,
        flexDirection: 'row',

        justifyContent: 'center',
        alignItems: 'center',

    },
    icon_container:{
        height:30,

        width:40,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        cursor:'pointer',

    },
    comment_container:{
        width:'15%',
        backgroundColor:'blue',


    }


})

export const modal_comments = StyleSheet.create({
    modal_container: {

        height:"100%",
        padding:10,

        flexDirection:'column',
        justifyContent:'flex-end',



    },
    title_container: {
        height:35,
        flexDirection:'row',
        justifyContent:'start',
        alignItems:'center',
    },
    title_view:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize:18,
        fontWeight: 'bold',
        marginLeft:40,
    },
    comments_container:{
        flexWrap:'wrap',
        height:'auto',
        width:'100%',

        flexDirection:'row'

    },
    comment_user_pic:{
        width:'10%',
        backgroundColor:'#fff',
    },
    comment_add_comment: {
        backgroundColor: '#fff',
        width:'85%',
        padding:5,
        height:"auto",
        margin:3,
    },
    comment_release_time:{
        margin:4,

    },

});



