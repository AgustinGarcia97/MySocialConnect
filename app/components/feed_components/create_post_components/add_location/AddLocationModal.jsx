import React, { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeLocationModal } from "../../../../redux/slices/modalSlice";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {View, Text, ImageBackground, Button, TouchableOpacity} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import 'react-native-get-random-values';
import {addLocation} from "../../../../redux/slices/postSlice";


export const AddLocationModal = () => {
    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['30%', '60%'], []);
    const dispatch = useDispatch();
    const [direction, setDirection] = useState("");
    const [geo_lat, setLat] = useState("");
    const [geo_long, setLong] = useState("");


    const open = useSelector((state) => state.modal.openLocationModal);


    const handlerLocation = (location) => {
        dispatch(addLocation({location:location}));
    }

    const handlerRemoveLocation = () => {

        setDirection("");
    }


    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            dispatch(closeLocationModal());
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
                backgroundStyle={{ backgroundColor: '#475A7E' }}
                style={{ flex: 1 }}
            >
                {/*#D9D7CE*/}
                <View style={{ backgroundColor: '#D9D7CE', width: '100%', height: '100%' }}>
                    <View style={{
                        height:80,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'rgba(255,255,255,0.3)',
                        marginBottom:20,
                    }}>
                        <Text style={{fontSize:20, fontWeight:'bold',}}>BUSCAR UBICACION</Text>
                    </View>


                    <GooglePlacesAutocomplete
                        placeholder={direction==="" ? "Ingresa una ubicación": direction}
                        onPress={(data, details = null) => {
                            setDirection(data.description);
                            if (details) {
                                const { lat, lng } = details.geometry.location;
                                setLat(lat);
                                setLong(lng);
                            }
                        }}
                        query={{
                            key: "AIzaSyAWz9jhuzDo5jrLPPWW5a9ro-BmRPPHBso",
                            language: "es",
                            components: "country:ar",
                            input: direction
                        }}
                        textInputProps={{
                            placeholderTextColor: "#000",
                            style: {
                                fontWeight:"300",
                                marginLeft:10,
                                fontSize:20,
                                color:'#000'
                            }
                        }}
                        styles={{
                            textInputContainer: {
                                backgroundColor: "#fff",
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 5,
                                fontWeight: "200",
                                height:60,
                            },
                            description : {color : 'black'},
                        }}

                        currentLocation={false}
                        fetchDetails={true}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={200}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'center',marginVertical:30,width:'100%',alignItems:'center',gap:10}}>
                        <TouchableOpacity style={{width:'48%',}} onPress={handlerRemoveLocation} >
                            <View style={{
                                backgroundColor:"#562727",
                                height:50,
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:30,}} >
                                <Text style={{fontSize:17, fontWeight:'bold', color:'#fff'}}>ELIMINAR UBICACION</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:'48%'}} onPress={() => {handlerLocation(direction)}}>
                            <View style={{backgroundColor:"#475A7E",height:50,justifyContent:'center',alignItems:'center',borderRadius:30,}} >
                                <Text style={{fontSize:17, fontWeight:'bold', color:'#fff'}}>ELEGIR UBICACION</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}
