import {Text, TouchableOpacity, View} from "react-native";
import {modal_comments} from "../../../../assets/styles/feed/feed_style";
import Icon from "react-native-vector-icons/Ionicons";
import {Avatar, IconButton, TextInput} from "react-native-paper";
import {addComment, updateCommentLikes} from "../../../../redux/slices/postSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {dislike, fetch_comments, fetchCreateComment, fetchLikeComment} from "../../../../api/fetch_post";


import {FlatList} from 'react-native-gesture-handler';


export const CommentsModalChildren = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const userId = useSelector((state) => state.user.userId);
    const postId = useSelector(state => state.posts.actualPost.postId);
    const [comments, setComments] = useState(useSelector((state) => state.posts.actualPost.comments));
    const actualPost = useSelector((state) => state.posts.actualPost);
    const token = useSelector(state => state.user.token);
    const [flag,setFlag] = useState(null);
    let post = useSelector((store) => {
        return store.posts.actualPost
    });

    const [likesStatus, setLikesStatus] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            const updatedComments = await fetch_comments(dispatch, postId, userData.token);
            setComments((prevComments) => {
                const allComments = [...actualPost.comments, ...updatedComments];
                return allComments.filter(
                    (comment, index, self) =>
                        index === self.findIndex((c) => c.commentId === comment.commentId)
                );
            });

            // Inicializa likesStatus con todos los comentarios
            const initialLikesStatus = {};
            updatedComments.forEach(comment => {
                initialLikesStatus[comment.commentId] = !!hasUserLiked(comment, userId);
            });
            setLikesStatus(initialLikesStatus);
        };
        fetchComments();
    }, [postId]);


    const hasUserLiked = (comment, userId) => {
        const like = comment.likes.find(like => like.user.userId === userId);
        return like ? like.likeId : null;
    };


    const handleLikeComment = async (commentId) => {
        const userId = userData.userId;

        const likeData = { commentId, userId };


        const comment = comments.find(c => c.commentId === commentId);  // Encuentra el comentario con el commentId dado

        if (comment) {
            const likeId = hasUserLiked(comment, userId);
            if(likeId){
                const data = dislike(likeId,comment.commentId)
                dispatch(updateCommentLikes(data));
                setLikesStatus(prev => ({ ...prev, [commentId]: false }));
            }
            else{
                const data = await fetchLikeComment(likeData);
                dispatch(updateCommentLikes(data));
                setLikesStatus(prev => ({ ...prev, [commentId]: true }));

            }

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
            const comment = await fetchCreateComment(dispatch, newComment);
            console.log("new comment:",comment)
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


    const renderItem =  ({ item }) => {

        console.log("ITEM: ",JSON.stringify(item));
        const isLiked = likesStatus[item.commentId] !== undefined ? likesStatus[item.commentId] : false;
        console.log("LIKED:",isLiked)
        if (!item || !item.commentId) {
            return <Text>No comment data available</Text>;
        }
        return(
        <View style={modal_comments.comments_container}>
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
                        <Icon name="heart" size={20}  color={likesStatus[item.commentId] ? "red" : "gray"} />
                    </TouchableOpacity>
                    <Text>{item.likes ? item.likes.length + (isLiked ? 1 : 0) : 0} likes</Text>
                </View>
            </View>
            <View style={modal_comments.comment_release_time}>
                <Text>{item.createdAt}</Text>
            </View>
        </View> )}







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

            <View style={{ flex: 1 }}>

                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.commentId.toString() || index.toString()}
                />
            </View>



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
