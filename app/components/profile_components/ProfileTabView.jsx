import * as React from 'react';
import {View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { useState } from 'react';
import {LikedPostsComponent} from "./LikedPostsComponent";
import {UserPostsComponent} from "./UserPostsComponent";
import {TaggedView} from "./TaggedView";


const renderTabBar = (props) => {
    return (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#1487d9' }}
            style={{ backgroundColor: '#fcf9f9', }}
            labelStyle={{ fontSize: 12, fontWeight:'500', color:"#3aa2f3", }}

        />


    )
}


export const ProfileTabView = ({flag}) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Publicaciones' },
        { key: 'second', title: 'Me gusta' },
        { key: 'third', title: 'Etiquetado' },
    ]);

    return (
        <View style={{height:600}}>


        <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({
                first:  UserPostsComponent,
                second: LikedPostsComponent,
                third: TaggedView,
            })}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width }}
            style={styles.container}
            renderTabBar={renderTabBar}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:200,
        backgroundColor: '#fff',

    },
    scene: {
        flex: 1,
    },
});


