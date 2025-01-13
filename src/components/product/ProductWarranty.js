import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const ProductWarranty = ({ warranty }) => {
    if (!warranty) return null;

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Warranty Information</CustomText>

            <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoContent}>
                    <CustomText style={styles.label}>Duration</CustomText>
                    <CustomText style={styles.value}>{warranty.duration}</CustomText>
                </View>
            </View>

            <View style={styles.infoRow}>
                <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoContent}>
                    <CustomText style={styles.label}>Provider</CustomText>
                    <CustomText style={styles.value}>{warranty.provider}</CustomText>
                </View>
            </View>

            <View style={styles.termsContainer}>
                <CustomText style={styles.subTitle}>Terms & Conditions</CustomText>
                {warranty.terms.map((term, index) => (
                    <View key={index} style={styles.termItem}>
                        <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.success} />
                        <CustomText style={styles.termText}>{term}</CustomText>
                    </View>
                ))}
            </View>

            <View style={styles.claimProcess}>
                <CustomText style={styles.subTitle}>Warranty Claim Process</CustomText>
                {warranty.claimProcess.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                        <CustomText style={styles.stepNumber}>{index + 1}</CustomText>
                        <CustomText style={styles.stepText}>{step}</CustomText>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
        marginTop: SIZES.base,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        marginBottom: SIZES.base * 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base * 1.5,
    },
    infoContent: {
        marginLeft: SIZES.base,
        flex: 1,
    },
    label: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    value: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.dark,
    },
    termsContainer: {
        marginTop: SIZES.base * 2,
    },
    subTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base,
    },
    termItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    termText: {
        fontSize: SIZES.font,
        marginLeft: SIZES.base,
        flex: 1,
    },
    claimProcess: {
        marginTop: SIZES.base * 2,
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: SIZES.base,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: COLORS.light,
        textAlign: 'center',
        lineHeight: 24,
        marginRight: SIZES.base,
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
    },
    stepText: {
        fontSize: SIZES.font,
        flex: 1,
    },
});

export default ProductWarranty;
