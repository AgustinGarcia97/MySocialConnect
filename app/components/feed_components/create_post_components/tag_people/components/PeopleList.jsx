import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import { Avatar } from "react-native-paper";
import {useDispatch} from "react-redux";
import {addTag} from "../../../../../redux/slices/createPostSlice";

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const PeopleList = () => {
    const dispatch = useDispatch();

    const handlerSelectPeople = (data) => {

        dispatch(addTag({userId:'id'}));

    }



    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={handlerSelectPeople}>
            <View style={styles.userBlock}>
                <Avatar.Image
                    size={50}
                    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                />
                <Text style={styles.userName}>User {item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.contentContainer}

        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        boxSizing:'content-box',
        paddingVertical: 20,
        alignItems: 'center',



    },
    userBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
        marginHorizontal:20,
        width: 350,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        elevation: 2,
    },
    userName: {
        fontSize: 17,
        fontWeight: 'bold',
    },
});
