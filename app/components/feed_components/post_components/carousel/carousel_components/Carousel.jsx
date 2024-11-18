import {FlatList, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import * as React from "react";
import {SlideItem} from "./SlideItem";

export const Carousel = ({item}) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const onScroll = React.useCallback((event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.floor(contentOffsetX / 300);
        setCurrentIndex(index);
    }, []);

    return(
        <View style={styles.container}>
            <FlatList
                data={item.photoList}
                renderItem={({item}) => (
                    <SlideItem item={item ? item : {imageUrl: ""}} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToAlignment="center"
                onScroll={onScroll}
            />

            {item.photoList.length > 0 && (
                <View style={styles.paginator}>
                    {item.photoList.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                            onPress={() => setCurrentIndex(index)}
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginator: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',

    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        backgroundColor: 'white',
    },
});
