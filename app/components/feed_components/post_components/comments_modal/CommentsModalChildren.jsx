import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {addComment, setActualPost, updateCommentLikes} from "../../../../redux/slices/postSlice";
import {fetch_post, fetchCreateComment, fetchLikeComment} from "../../../../api/fetch_post";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Text, Avatar, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import {modal_comments} from "../../../../assets/styles/feed/feed_style";
import {useFocusEffect} from "@react-navigation/native";

export const CommentsModalChildren = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user.userId);
    const [post, setPost] = useState(null);
    const [commentsPosts, setCommentsPosts] = useState([]);


    useEffect(() => {
        const fetchActualPost = async () => {
            try{
                const p = await fetch_post(dispatch);
                dispatch(setActualPost(p));
                setPost(p);
                setCommentsPosts(p.comments);
                alert(1);
            } catch(error){
                console.log(error);
            }
        }
        fetchActualPost();
        }, [post])

    const handleLikeComment = async (commentId) => {
        const userId = userData.userId;
        const likeData = { commentId, userId };
        const data = await fetchLikeComment(likeData);
        if (data) {
            console.log("Data:", data);
            dispatch(updateCommentLikes(data));
        }

    };

    const handleSendComment = async () => {
        if (text.trim()) {
            const newComment = {
                comment: text,
                userId: userData.userId,
                createdAt: new Date().toISOString(),
                postId: post.postId
            };

            // Realiza la solicitud para crear el comentario
            const comment = await fetchCreateComment(dispatch, newComment);
            // Aquí actualizas el estado de comentarios
            setCommentsPosts((prevComments) => [
                ...prevComments,
                {
                    commentId: comment.commentId,
                    comment: comment.comment,
                    user: userData.name,
                    likes: comment.likes? comment.likes : [],
                    createdAt: comment.createdAt
                }
            ]);
            dispatch(addComment(comment)); // Actualiza Redux

            // Limpia el campo de texto
            setText("");
        }
    };

    return (
        <View style={modal_comments.modal_container}>
            <View style={modal_comments.title_container}>
                <View style={modal_comments.title_view}>
                    <Text style={{ ...modal_comments.title }}>Comentarios</Text>
                </View>
                <IconButton
                    icon={() => <Icon size={30} name={"send"} />}
                    size={30}
                    color={'black'}
                    onPress={handleSendComment}
                />
            </View>
            <ScrollView>
                {commentsPosts.length > 0 ? (
                    commentsPosts.map((item, index) => (
                        <View style={modal_comments.comments_container} key={index}>
                            <View style={modal_comments.comment_user_pic}>
                                <Avatar.Image
                                    size={35}
                                    source={{
                                        uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                                    }}
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            </View>
                            <View style={{ ...modal_comments.comment_add_comment, flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between' }}>
                                <Text>{item.comment}</Text>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => handleLikeComment(item.commentId)}>
                                        <Icon name="heart" size={20} color={item.likes && item.likes.includes(userId) ? "red" : "gray"} />
                                    </TouchableOpacity>
                                    <Text>{item.likes.length} likes</Text>
                                </View>
                            </View>
                            <View style={modal_comments.comment_release_time}>
                                <Text>{item.createdAt}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20 }}>No hay comentarios</Text>
                    </View>
                )}
            </ScrollView>
            <View style={{
                marginBottom: 30,
                flexDirection: 'row',
                justifyContent: 'start',
                width: '100%',
                borderWidth: 0.2,
                borderColor: 'gray',
                margin: 5,
            }}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    multiline={true}
                    numberOfLines={4}
                    outlineStyle={{ borderWidth: 0.1 }}
                    contentStyle={{ marginTop: 10 }}
                    selectionColor='black'
                    mode="outlined"
                    style={{ width: '85%' }}
                />
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '15%' }}>
                    <TouchableOpacity onPress={handleSendComment}>
                        <Icon name="send" size={24} color="white" style={{ backgroundColor: 'blue', margin: 5, padding: 5, borderRadius: 50, width: '100%' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
