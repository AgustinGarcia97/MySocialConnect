import { Dimensions, StyleSheet, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GeneralPost } from "../components/feed_components/tabs/GeneralPost";
import { FollowedPost } from "../components/feed_components/tabs/FollowedPost";
import { fetch_posts } from "../api/fetch_post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getToken } from "../api/token/manage_token";
import { useIsFocused } from "@react-navigation/native";

const renderTabBar = (props) => {
    return (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#1e325b' }}
            style={{ backgroundColor: '#fcf9f9' }}
            labelStyle={{ fontSize: 12, fontWeight: '500', color: "#3aa2f3" }}
        />
    );
};

export const Feed = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'General' },
        { key: 'second', title: 'Seguidos' },
    ]);
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        if (isFocused) {
            fetch_posts(dispatch);
        }
    }, [dispatch, isFocused]);

    return (
        token ? (
            <TabView
                navigationState={{ index, routes }}
                renderScene={SceneMap({
                    first: GeneralPost,
                    second: FollowedPost,
                })}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={renderTabBar}
            />
        ) : (
            <GeneralPost /> // Mostrar solo los posts generales si no hay token
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        flex: 1,
    },
});
