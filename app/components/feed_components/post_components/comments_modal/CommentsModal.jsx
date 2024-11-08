import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal } from "../../../../redux/slices/modalSlice";
import {CommentsModalChildren} from "./CommentsModalChildren";

export const BottomSheetContent = () => {
    const open = useSelector((state) => state.modal.open);
    const dispatch = useDispatch();
    const bottomSheetModalRef = useRef(null);


    const snapPoints = useMemo(() => [ '75%','100%'], []);


    const handleSheetChanges = useCallback((index) => {

        if (index === -1) {
            dispatch(closeCommentModal());
        }
    }, [dispatch]);

    useEffect(() => {
        if (open) {
            bottomSheetModalRef.current?.present();
        } else {
            bottomSheetModalRef.current?.dismiss();
        }
    }, [open]);





    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}


            >



                <CommentsModalChildren></CommentsModalChildren>


            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
