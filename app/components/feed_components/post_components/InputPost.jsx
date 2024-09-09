import { TextInput } from 'react-native-paper';
import React from "react";
import {feedStyles} from "../../../assets/styles/feed/feed_style";
export const InputPost = () => {
    const [text, setText] = React.useState("");
    return(
        <TextInput

            style={feedStyles.input_text}
            onChangeText={text => setText(text)}
            placeholder="Que esta pasando"
        />
    )
}
