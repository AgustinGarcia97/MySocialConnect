import {Text, TouchableOpacity, View} from "react-native";
import {modal_comments} from "../../../../assets/styles/feed/feed_style";
import Icon from "react-native-vector-icons/Ionicons";
import {Avatar, IconButton, TextInput} from "react-native-paper";
import {addComment, updateCommentLikes} from "../../../../redux/slices/postSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {dislike, fetch_comments, fetchCreateComment, fetchLikeComment} from "../../../../api/fetch_post";
import StyleSheet from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {store} from "../../../../redux/store";


export const CommentsModalChildren = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const id = useSelector((state) => state.user.userId);
    const postId = useSelector(state => state.posts.actualPost.postId);
    const state = store.getState();
    const actualPostComments = useSelector(state => state.posts.actualPost.comments)||[];
    const [comments, setComments] = useState(actualPostComments);
    const actualPost = useSelector((state) => state.posts.actualPost);

    const [tokenValue, setTokenValue] = useState(null);



    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                setTokenValue(token);
                console.log("Token recuperado:", token);
            } catch (error) {
                console.error("Error al recuperar el token:", error);
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const updatedComments = await fetch_comments(dispatch, postId, tokenValue);
            setComments((prevComments) => {
                const allComments = [...actualPost.comments, ...updatedComments];
                return allComments.filter(
                    (comment, index, self) =>
                        index === self.findIndex((c) => c.commentId === comment.commentId)
                );
            });


        };
        fetchComments();
    }, [postId]);

    const hasUserLiked = (comment, userId) => {


        const like = comment.likes.find(like => like.user.userId === userId);

        return like ? like.likeId : null;
    };

    const handleLikeComment = async (commentId) => {




        const userId = id;
        const likeData = { commentId, userId };
        const comment = comments.find(c => c.commentId === commentId);

        if (comment) {
            const likeId = hasUserLiked(comment, userId);

            if (likeId) {

                const data = await dislike(likeId, comment.commentId);
                dispatch(updateCommentLikes(data));
            } else {
                const data = await fetchLikeComment(likeData);
                dispatch(updateCommentLikes(data));

            }
        }
    };

    const handleSendComment = async () => {
        if (!tokenValue) {
            alert("Inicia sesión para comentar.");
            return;
        }
        if (text.trim()) {
            const newComment = {
                comment: text,
                userId: userData.userId,
                createdAt: new Date().toISOString(),
                postId: postId
            };
            const comment = await fetchCreateComment(dispatch, newComment);
            if (comment) {
                setComments((prevComments) => {
                    const isDuplicate = prevComments.some((existingComment) => existingComment.commentId === comment.commentId);
                    if (!isDuplicate) {
                        dispatch(addComment(comment));
                        return [...prevComments, comment];
                    }
                    return prevComments;
                });
                setText("");
            }
        }
    };

    return (
        <View style={modal_comments.modal_container}>
            <View style={modal_comments.title_container}>
                <View style={modal_comments.title_view}>
                    <Text style={{ ...modal_comments.title }}>Comentarios</Text>
                </View>

            </View>

                <FlatList
                    data={comments || []}
                    renderItem={({ item }) => (
                        <CommentItem
                            item={item}

                            handleLikeComment={handleLikeComment}
                        />
                    )}
                    keyExtractor={(item, index) =>  item.commentId.toString()}
                />



            <View style={{ marginBottom: 30, flexDirection: 'row', justifyContent: 'start', width: '100%',alignItems:'center',gap:5 }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    multiline={true}
                    numberOfLines={4}
                    mode="outlined"
                    style={{ width: '85%' }}
                />
                {tokenValue? (
                    <TouchableOpacity onPress={handleSendComment} style={{marginVertical:20}}>
                        <Icon name="send" size={24} color="white" style={{ backgroundColor: 'blue', padding: 5, borderRadius: 50 }} />
                    </TouchableOpacity>
                ): (
                    <Icon name="send" size={24} color="white" style={{ backgroundColor: 'blue', padding: 5, borderRadius: 50 }} />
                    )}

            </View>
        </View>
    );
};

const CommentItem = ({ item, handleLikeComment }) => {
    const [liked, setLiked] = useState(item.likes ? item.likes.length : 0);
    const [isLiked, setIsLiked] = useState(item.likes?.some(like => like.user?.userId === userId) || false);
    const userId = useSelector((state) => state.user.userId);


    useEffect(() => {
        setLiked(item.likes ? item.likes.length : 0);
        setIsLiked(item.likes?.some(like => like.user?.userId === userId) || false);
    }, [item.likes, userId]);

    const handleLikeToggle = () => {
        handleLikeComment(item.commentId);


        setLiked((prevLiked) => {
            const newLiked = isLiked ? prevLiked - 1 : prevLiked + 1;
            setIsLiked(!isLiked);
            return newLiked;
        });
    };

    return (
        <View style={{ flexDirection: 'row', marginBottom: 5, padding: 5 ,marginTop:20}}>

            <View style={{ flex: 1, flexDirection: 'row',width:'80%' }}>

                <View style={{ flex: 2, flexDirection:'column',gap:5, }}>
                    <View style={{flexDirection:'row',marginRight:20,}}>

                        <Text> <Text style={{fontWeight:'bold',marginLeft:10,fontSize:15}}>{"@"+item.user.nickname}</Text> {" "+item.comment}</Text>
                    </View>

                    <Text>{item.createdAt}</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleLikeToggle}>
                        <Icon
                            name="heart"
                            size={20}
                            color={isLiked ? "red" : (liked > 0 && item.likes?.some(like => like.user?.userId === userId) ? "red" : "gray")}
                        />
                    </TouchableOpacity>
                    <Text>{liked} likes</Text>

                </View>

            </View>

        </View>

    );
};


export default CommentItem;
