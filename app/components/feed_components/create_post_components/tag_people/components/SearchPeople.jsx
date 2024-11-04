import {View,StyleSheet} from "react-native";
import {TextInput} from "react-native-paper";

export const SearchPeople = () => {
    return(
        <View style={{...search_people_style.container}}>
           <TextInput
               right={<TextInput.Icon icon="magnify" color={'#475a7e'}  />}
               style={{...search_people_style.textBlock}}
           ></TextInput>
        </View>
    )
}

const search_people_style = StyleSheet.create({
    container: {
        height:100,
        justifyContent:'center',
        alignItems:'center',
    },
    textBlock: {
        height:40,
        width:'90%',
        borderRadius: 10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    }
})
