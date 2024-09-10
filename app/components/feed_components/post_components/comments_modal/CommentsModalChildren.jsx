import {TouchableOpacity, View} from "react-native";
import {IconButton, Text, Avatar, TextInput} from 'react-native-paper'
import {modal_comments} from "../../../../assets/styles/feed/feed_style";
import Icon from 'react-native-vector-icons/Feather';
import {ScrollView,} from 'react-native-gesture-handler'
import {useState} from "react";
export const CommentsModalChildren = () => {
    const [text, setText] = useState("");
    const list_messages = [
       {
            comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
           was_about:'hace 10 minutos',
        },
       {
           comment:'Lorem ipsum dolor sir dapibus diam.',
           was_about:'hace 12 minutos',
       },
       {
           comment:'Lorem ipsum dolor sit amet, co ibus diam.',
           was_about:'hace 20 minutos',


       },
       {
           comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
           was_about:'hace 30 minutos',
       },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
        {
            comment:'Lorem ipsum dolor sit amet, co ibus diam.',
            was_about:'hace 20 minutos',


        },
   ]

    return(
        <View style={modal_comments.modal_container}>
            <View style={modal_comments.title_container}>
                <View style={modal_comments.title_view}>
                    <Text style={{...modal_comments.title}}>Comentarios</Text>
                </View>

                <IconButton
                    icon= {()=> <Icon size={30} name={"send"}/>}
                    size={30}
                    color={'black'}
                    onPress={()=> {alert("enviado")}}
                >

                </IconButton>
            </View>
            <ScrollView>


                {list_messages.map((item, index) => (
                    <View style={modal_comments.comments_container} key={index}>
                        <View style={modal_comments.comment_user_pic}>
                            <Avatar.Image
                                size={35}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                                style={{flex:1,justifyContent:'center',backgroundColor:'transparent'}} />
                        </View>
                        <View style={modal_comments.comment_add_comment}>
                            <Text>{item.comment}</Text>
                        </View>
                        <View style={modal_comments.comment_release_time}>
                            <Text>{item.was_about}</Text>
                        </View>
                    </View>
                ))}

            </ScrollView>
            <View style={{
                marginBottom:30,
                flexDirection:'row',
                justifyContent:'start',
                width:'100%',
                borderWidth:0.2,
                borderColor:'gray',
                margin:5,


            }}>
                <TextInput
                    value={text}
                    onChangeText={text => setText(text)}
                    multiline={true}
                    numberOfLines={4}
                    outlineStyle={{ borderWidth: 0.1 }}
                    contentStyle={{marginTop:10}}
                    selectionColor='black'
                    mode="outlined"
                    style={{width:'85%'}}
                />
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',width:'15%'}}>
                    <TouchableOpacity onPress={()=> {alert("comentado!")}}>
                        <Icon name="send" size={24} color="white" style={{backgroundColor:'blue',margin: 5,padding:5,borderRadius:50,width:'100%'}} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}


