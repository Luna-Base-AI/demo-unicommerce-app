import React, { useState, useRef } from 'react';
import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { COLORS, SIZES } from '../../utils/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_WIDTH * 0.8;

const ProductImageGallery = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef(null);

    const handleScroll = (event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        setActiveIndex(Math.round(index));
    };

    const handleThumbnailPress = (index) => {
        setActiveIndex(index);
        // Scroll to the selected image
        scrollViewRef.current?.scrollTo({
            x: index * SCREEN_WIDTH,
            animated: true,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                style={styles.mainImageContainer}
            >
                {images?.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images?.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailContainer}
                contentContainerStyle={styles.thumbnailContent}
            >
                {images?.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleThumbnailPress(index)}
                        style={[
                            styles.thumbnail,
                            index === activeIndex && styles.thumbnailActive,
                        ]}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={{ uri: image }}
                            style={styles.thumbnailImage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        width: SCREEN_WIDTH,
    },
    mainImageContainer: {
        width: SCREEN_WIDTH,
    },
    imageContainer: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.base / 2,
        borderRadius: SIZES.base * 2,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.gray,
        marginHorizontal: 4,
        opacity: 0.5,
    },
    paginationDotActive: {
        backgroundColor: COLORS.white,
        opacity: 1,
    },
    thumbnailContainer: {
        marginTop: SIZES.base,
    },
    thumbnailContent: {
        paddingHorizontal: SIZES.base,
    },
    thumbnail: {
        width: 60,
        height: 60,
        marginRight: SIZES.base,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.light,
        overflow: 'hidden',
    },
    thumbnailActive: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
});

export default ProductImageGallery;