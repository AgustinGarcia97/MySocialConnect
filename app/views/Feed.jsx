import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {FlatList, ScrollView, View} from "react-native";

import {Post} from "./Post";
import {InputPost} from "../components/feed_components/post_components/InputPost";
import {feedStyles} from "../assets/styles/feed/feed_style";
import {BottomSheetContent} from "../components/feed_components/post_components/comments_modal/CommentsModal";
import { useDispatch, useSelector } from 'react-redux';
import {closeCommentModal} from "../redux/slices/modalSlice";
import {CreatePostModal} from "./CreatePostModal";
import {TagPeople} from "../components/feed_components/create_post_components/tag_people/TagPeople";
import {AddLocationModal} from "../components/feed_components/create_post_components/add_location/AddLocationModal";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export const Feed = () => {
    const open = useSelector((state) => state.modal.open);
    const postsData = [1,2,3,4,5,6,7,8,9]
    return (
        <View style={feedStyles.feed_layout}>
            <View style={feedStyles.text_container}>
                <InputPost></InputPost>
            </View>
            <View    style={{marginVertical: 20}}>
                <FlatList
                    data={postsData}
                    keyExtractor={(item) =>item}
                    renderItem={({ item }) => (
                        <Post content={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={<View style={{height:10}}/>}
                />
            </View>

            <BottomSheetContent isVisible={open} onDismiss={() => dispatch(closeCommentModal())}/>
            <CreatePostModal ></CreatePostModal>
            <TagPeople/>
            <AddLocationModal/>


        </View>
    );
};


