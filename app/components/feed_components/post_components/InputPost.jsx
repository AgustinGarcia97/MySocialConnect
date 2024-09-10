import { TextInput } from 'react-native-paper';
import React from "react";
import {feedStyles} from "../../../assets/styles/feed/feed_style";
export const InputPost = () => {
    const [text, setText] = React.useState("");
    return(
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

    )
}
