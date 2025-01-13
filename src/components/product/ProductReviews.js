import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const ProductReviews = ({ reviews = [] }) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Ionicons
                key={index}
                name={index < rating ? 'star' : 'star-outline'}
                size={16}
                color={COLORS.warning}
            />
        ));
    };

    const renderReviewItem = (item) => (
        <View key={item.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewUser}>
                    <CustomText style={styles.userName}>{item.userName}</CustomText>
                    {item.verifiedPurchase && (
                        <View style={styles.verifiedBadge}>
                            <CustomText style={styles.verifiedText}>Verified Purchase</CustomText>
                        </View>
                    )}
                </View>
                <CustomText style={styles.reviewDate}>{item.date}</CustomText>
            </View>
            <View style={styles.ratingContainer}>
                {renderStars(item.rating)}
            </View>
            <CustomText style={styles.reviewText}>{item.text}</CustomText>
        </View>
    );

    const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length || 0;

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <View style={styles.averageRating}>
                    <CustomText style={styles.ratingNumber}>
                        {averageRating.toFixed(1)}
                    </CustomText>
                    <View style={styles.starsContainer}>
                        {renderStars(averageRating)}
                    </View>
                    <CustomText style={styles.totalReviews}>
                        {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </CustomText>
                </View>
            </View>
            <ScrollView
                style={styles.reviewsContainer}
                contentContainerStyle={styles.reviewsList}
            >
                {reviews.map(renderReviewItem)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex: 1,
    },
    summary: {
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    averageRating: {
        alignItems: 'center',
    },
    ratingNumber: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        color: COLORS.dark,
    },
    starsContainer: {
        flexDirection: 'row',
        marginVertical: SIZES.base,
    },
    totalReviews: {
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    reviewsContainer: {
        flex: 1,
    },
    reviewsList: {
        padding: SIZES.base * 2,
    },
    reviewItem: {
        marginBottom: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.light,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    reviewUser: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginRight: SIZES.base,
    },
    verifiedBadge: {
        backgroundColor: COLORS.success,
        paddingHorizontal: SIZES.base,
        paddingVertical: 2,
        borderRadius: SIZES.base * 2,
    },
    verifiedText: {
        fontSize: SIZES.small,
        color: COLORS.white,
    },
    reviewDate: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: SIZES.base,
    },
    reviewText: {
        fontSize: SIZES.font,
        lineHeight: SIZES.font * 1.5,
        color: COLORS.dark,
    },
});

export default ProductReviews;