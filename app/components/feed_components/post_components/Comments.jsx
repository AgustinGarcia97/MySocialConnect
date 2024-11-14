import {TouchableOpacity, View} from "react-native";



import {post_style} from "../../../assets/styles/feed/feed_style";
import {IconButton, Text} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import {useState} from "react";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {BottomSheetContent} from "./comments_modal/CommentsModal";
import {useDispatch, useSelector} from "react-redux";
import {closeCommentModal, openCommentModal} from "../../../redux/slices/modalSlice";
import {setActualPost} from "../../../redux/slices/postSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Comments = ({item}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);



    const pressButton = (item) => {
        dispatch(setActualPost(item));
        dispatch(openCommentModal());


    }

    return(
        token? (
            <>

                <TouchableOpacity style={post_style.icon_container} onPress={ ()=>pressButton(item)} >

                    <Icon
                        name="comment-o"
                        size={27}
                        style={{marginBottom:2}}
                    />

                </TouchableOpacity>

            </>
            ) : (

            <TouchableOpacity style={post_style.icon_container} onPress={ ()=>alert("Debes iniciar sesion para ingresar a los comentarios")} >

                <Icon
                    name="comment-o"
                    size={27}
                    style={{marginBottom:2}}
                />

            </TouchableOpacity>
                )

    );
}
