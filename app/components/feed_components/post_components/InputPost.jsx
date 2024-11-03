import { TextInput } from 'react-native-paper';
import React from "react";
import {feedStyles} from "../../../assets/styles/feed/feed_style";
import {TouchableOpacity} from "react-native";
import {openPostModal, closePostModal, openCommentModal} from '../../../redux/slices/modalSlice';
import {useDispatch} from "react-redux";


export const InputPost = () => {
    const [text, setText] = React.useState("");
    const dispatch = useDispatch();


    const pressButton = () => {
        dispatch(openPostModal());
    }

    return(

        <TouchableOpacity onPress={ ()=>pressButton()} >
            <TextInput
                value={text}
                onChangeText={text => setText(text)}
                multiline={true}
                outlineStyle={{ borderWidth: 0.1 }}
                contentStyle={{marginTop:17}}
                selectionColor='black'
                mode="outlined"
                placeholder='Que esta pasando'

            />

        </TouchableOpacity>


    )
}
