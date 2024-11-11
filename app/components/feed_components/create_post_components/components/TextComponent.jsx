import {View,StyleSheet} from "react-native";
import {TextInput} from "react-native-paper";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addDescription, addTitle} from "../../../../redux/slices/postSlice";

export const TextComponent = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleTextChange = (inputText) => {
        setText(inputText);
        dispatch(addDescription(inputText));
    }



    return(
        <View style={styles.container}>
            <TextInput
                style={styles.textBlock}
                label="Que esta pasando?"
                placeholderTextColor="#888"
                multiline={true}
                numberOfLines={4}
                value={text}
                onChangeText={handleTextChange}
                textAlignVertical="top"

            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width:'100%',
        backgroundColor: '#D9D7CE',
        borderRadius: 8,
        borderWidth: 0,
    },
    textBlock: {
        height: 120,
        backgroundColor:'rgba(255,255,255,0.43)',
        width:'90%',
        marginHorizontal:20,
        borderRadius: 8,
        borderWidth: 0,

        fontSize: 16,
    },
});
