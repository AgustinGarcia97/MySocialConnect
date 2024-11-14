import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { feedStyles } from "../../../assets/styles/feed/feed_style";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { InputPost } from "../post_components/InputPost";
import { Post } from "../../../views/Post";
import { BottomSheetContent } from "../post_components/comments_modal/CommentsModal";
import { closeCommentModal } from "../../../redux/slices/modalSlice";
import * as React from "react";
import { fetch_posts } from "../../../api/fetch_post";
import {TaggedPeople} from "../post_components/tagged_people/TaggedPeople";
import store from "../../../redux/store";

export const GeneralPost = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.open);
    const state = store.getState();
    const postsRedux =  state.posts.posts;
    const [posts, setPosts] = useState(postsRedux);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (loading) return;

        setLoading(true);
        const newPosts = await fetch_posts(dispatch, page, 3);


        const uniquePosts = newPosts.filter(
            (newPost) => !posts.some((post) => post.postId === newPost.postId)
        );

        setPosts((prevPosts) => [...prevPosts, ...uniquePosts]);

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const loadMore = () => {
        if (!loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const updatePosts = (postId) => {
        setPosts(posts.filter((post) => post.postId !== postId));
    }

    const renderPostsList = () => (
        posts && posts.length > 0 ? (
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => item?.postId ? <Post item={item} updatePosts={updatePosts} /> : null}
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
            <View style={{ marginVertical:5,flex:1 }}>
                {renderPostsList()}
            </View>
            <BottomSheetContent isVisible={open} onDismiss={() => dispatch(closeCommentModal())} />
            <TaggedPeople/>
        </View>
    );
};
