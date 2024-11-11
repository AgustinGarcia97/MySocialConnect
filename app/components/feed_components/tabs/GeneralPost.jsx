import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { feedStyles } from "../../../assets/styles/feed/feed_style";
import {FlatList, View, Text, ActivityIndicator} from "react-native";
import { InputPost } from "../post_components/InputPost";
import { Post } from "../../../views/Post";
import { BottomSheetContent } from "../post_components/comments_modal/CommentsModal";
import { closeCommentModal } from "../../../redux/slices/modalSlice";
import { CreatePostModal } from "../../../views/CreatePostModal";
import { TagPeople } from "../create_post_components/tag_people/TagPeople";
import { AddLocationModal } from "../create_post_components/add_location/AddLocationModal";
import { TaggedPeople } from "../post_components/tagged_people/TaggedPeople";
import * as React from "react";
import {fetch_posts} from "../../../api/fetch_post";

export const GeneralPost = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.open);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const newPost = await fetch_posts(dispatch,page,5);

        const uniquePosts = newPost.filter(
            (newPost) => !posts.some((post) => post.postId === newPost.postId)
        );

        setTimeout(() => {
            setPosts(prevPosts => [...prevPosts, ...uniquePosts]);
            setLoading(false);
        },1000)
    }

    useEffect(() => {
        fetchData();
    }, []);



    const loadMore = () => {
        if (!loading) {
            setPage(prevPage => prevPage + 1);
        }
    };



    const renderPostsList = () => (
        posts && posts.length > 0 ? (
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => item?.postId ? <Post item={item} /> : null}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={<View style={{ height: 10 }} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

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
