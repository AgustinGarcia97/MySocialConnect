import {TouchableOpacity, View} from "react-native";



import {post_style} from "../../../assets/styles/feed/feed_style";
import {IconButton, Text} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import {useState} from "react";
import {BottomSheetView} from "@gorhom/bottom-sheet";
import {BottomSheetContent} from "./comments_modal/CommentsModal";
import {useDispatch} from "react-redux";
import {closeCommentModal, openCommentModal} from "../../../redux/slices/modalSlice";

export const Comments = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);
    const dispatch = useDispatch();
    const pressButton = () => {
        dispatch(openCommentModal());

    }

    return(
        <>

            <TouchableOpacity style={post_style.icon_container} onPress={ ()=>pressButton()} >

                <Icon
                    name="comment-o"
                    size={25}
                    style={{margin:0,width:'40%'}}
                />
                <Text>
                    {100}
                </Text>
            </TouchableOpacity>

        </>
    );
}
