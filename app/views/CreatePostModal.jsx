import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {CommentsModalChildren} from "../components/feed_components/post_components/comments_modal/CommentsModalChildren";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {closeCommentModal, closePostModal} from "../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import SelectPhoto from "../components/feed_components/create_post_components/components/SelectPhoto";
import {UserData} from "../components/feed_components/create_post_components/components/UserData";
import {TextComponent} from "../components/feed_components/create_post_components/components/TextComponent";
import {Options} from "../components/feed_components/create_post_components/components/Options";
import {addPosts, createPost, removeLocation, removeTagged} from "../redux/slices/postSlice";
import {fetchCreatePost} from "../api/fetch_post";
import {TaggedPeople} from "../components/feed_components/post_components/tagged_people/TaggedPeople";
import {AddLocationModal} from "../components/feed_components/create_post_components/add_location/AddLocationModal";
import {TagPeople} from "../components/feed_components/create_post_components/tag_people/TagPeople";
import {addPostsToUserList} from "../redux/slices/userSlice";
export const  CreatePostModal =  props => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => [ '90%','100%'], []);
    const dispatch = useDispatch();
    const title = useSelector((store) => { return store.posts.title});
    const description = useSelector((store) => { return store.posts.description});
    const name = useSelector((store) => { return store.posts.name});
    const lastname = useSelector((store) => { return store.posts.lastname} );
    const photos = useSelector((store) => { return store.posts.photos});
    const location = useSelector((store) => { return store.posts.location});
    const userId = useSelector((store) => { return store.user.userId});
    const tagged = useSelector((store) => { return store.posts.taggedPeople;});
    const open = useSelector((state) => state.modal.openPostModal);
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            dispatch(removeTagged());
            dispatch(removeLocation());
            dispatch(closePostModal());

        }
    }, [dispatch]);

    useEffect(() => {
        if (open) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [open]);


    const handleCreatePost = async (dispatch) => {


        const data = {
            title:"",
            description,
            photos,
            location,
            userId,
            tagged,
        }
        dispatch(addPostsToUserList(data));
        await fetchCreatePost(data,dispatch);
        dispatch(removeTagged());
        dispatch(closePostModal());


    }

    return(
        <BottomSheetModalProvider >
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                backgroundStyle={{backgroundColor:'#475A7E'}}
            >

                <View style={{backgroundColor:'#D9D7CE',width:'100%'}}>
                    <UserData/>
                    <TextComponent/>
                    <SelectPhoto></SelectPhoto>
                    <Options></Options>
                    <View
                        style={{
                            height:60,
                            alignItems:"center",
                            marginVertical:19,
                            width:'100%',


                        }}
                    >
                        <TouchableOpacity style={{
                            width:'90%',
                            backgroundColor:'#475a7e',
                            height:50,
                            justifyContent:'center',
                            alignItems: 'center'
                        }}
                        onPress={() => handleCreatePost(dispatch)}

                        >
                            <View style={{}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>PUBLICAR</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TagPeople/>
                <TaggedPeople />
                <AddLocationModal/>
            </BottomSheetModal>
        </BottomSheetModalProvider>

    )
}
