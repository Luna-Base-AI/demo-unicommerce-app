import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { STUDENT_DEALS } from '../../data/mock';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const StudentDeals = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText style={styles.title}>Student Deals</CustomText>
                <TouchableOpacity style={styles.viewAllButton}>
                    <CustomText style={styles.viewAllText}>View All</CustomText>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {STUDENT_DEALS.map((deal) => (
                    <TouchableOpacity key={deal.id} style={styles.dealCard}>
                        <Image source={{ uri: deal.image }} style={styles.dealImage} />
                        <View style={styles.dealInfo}>
                            <CustomText style={styles.dealName}>{deal.name}</CustomText>
                            <View style={styles.discountContainer}>
                                <CustomText style={styles.discountText}>{deal.discount}</CustomText>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: COLORS.primary,
        marginRight: 4,
        fontFamily: FONTS.medium,
    },
    scrollContent: {
        paddingRight: SIZES.base,
    },
    dealCard: {
        width: 280,
        marginRight: SIZES.medium,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dealImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: SIZES.base,
        borderTopRightRadius: SIZES.base,
    },
    dealInfo: {
        padding: SIZES.base,
    },
    dealName: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        marginBottom: 8,
    },
    discountContainer: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    discountText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.bold,
    },
});

export default StudentDeals;