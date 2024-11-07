import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { feedStyles } from "../../../assets/styles/feed/feed_style";
import { FlatList, View, Text } from "react-native";
import { InputPost } from "../post_components/InputPost";
import { Post } from "../../../views/Post";
import { BottomSheetContent } from "../post_components/comments_modal/CommentsModal";
import { closeCommentModal } from "../../../redux/slices/modalSlice";
import { CreatePostModal } from "../../../views/CreatePostModal";
import { TagPeople } from "../create_post_components/tag_people/TagPeople";
import { AddLocationModal } from "../create_post_components/add_location/AddLocationModal";
import { TaggedPeople } from "../post_components/tagged_people/TaggedPeople";
import * as React from "react";

export const GeneralPost = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.open);
    const posts = useSelector((state) => state.posts.posts);


    useEffect(() => {
        if (posts.length > 0) {
            console.log("GENERAL POST:", posts[0].postId);
        }
    }, [posts]);

    const renderPostsList = () => (
        posts && posts.length > 0 ? (
            <FlatList
                data={posts}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={({ item }) => <Post item={item} />}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={<View style={{ height: 10 }} />}
            />
        ) : (
            <Text>No posts available</Text>
        )
    );

    return (
        <View style={feedStyles.feed_layout}>
            <View style={feedStyles.text_container}>
                <InputPost />
            </View>
            <View style={{ marginVertical: 20 }}>
                {renderPostsList()}
            </View>
            <BottomSheetContent isVisible={open} onDismiss={() => dispatch(closeCommentModal())} />
            <CreatePostModal />
            <TagPeople />
            <AddLocationModal />
            <TaggedPeople />
        </View>
    );
};
