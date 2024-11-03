import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
} from 'react-native';
import React from 'react';

let {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) => {
    const translateYImage = new Animated.Value(0);

    Animated.timing(translateYImage, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,

    }).start();

    return (
        <View style={styles.container}>
            <Animated.Image
                source={{uri: item.img}}
                resizeMode="contain"

                style={[
                    styles.image,
                    {
                        transform: [
                            {
                                translateY: translateYImage,
                            },
                        ],
                    },
                ]}
            />

        </View>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
        maxHeight: 400,
        maxWidth: '100%',


    },
    image: {
        flex: 1,
        width: '100%',
        objectFit: 'cover',

    },

});
