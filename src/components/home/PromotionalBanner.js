import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, FlatList } from 'react-native';
import { PROMOTIONAL_BANNERS } from '../../data/mock';
import { COLORS, SIZES } from '../../utils/constants/theme';

const { width } = Dimensions.get('window');

const PromotionalBanner = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === PROMOTIONAL_BANNERS.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }) => (
        <Image
            source={{ uri: item.image }}
            style={styles.bannerImage}
            resizeMode="cover"
        />
    );

    const renderDots = () => (
        <View style={styles.pagination}>
            {PROMOTIONAL_BANNERS.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        { backgroundColor: index === activeIndex ? COLORS.primary : COLORS.gray }
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={PROMOTIONAL_BANNERS}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(
                        event.nativeEvent.contentOffset.x / width
                    );
                    setActiveIndex(newIndex);
                }}
            />
            {renderDots()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: COLORS.white,
    },
    bannerImage: {
        width: width,
        height: 180,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});

export default PromotionalBanner;
