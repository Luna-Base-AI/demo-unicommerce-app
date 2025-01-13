import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const OrderSummarySection = ({ cart, promoCode }) => {
    const discount = promoCode ? cart.subtotal * 0.1 : 0; // Example 10% discount

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Order Summary</CustomText>
            <View style={styles.row}>
                <CustomText style={styles.label}>Subtotal</CustomText>
                <CustomText style={styles.value}>${cart.subtotal.toFixed(2)}</CustomText>
            </View>
            {discount > 0 && (
                <View style={styles.row}>
                    <CustomText style={styles.label}>Discount</CustomText>
                    <CustomText style={[styles.value, styles.discount]}>
                        -${discount.toFixed(2)}
                    </CustomText>
                </View>
            )}
            <View style={styles.row}>
                <CustomText style={styles.label}>Shipping</CustomText>
                <CustomText style={styles.value}>$5.99</CustomText>
            </View>
            <View style={styles.row}>
                <CustomText style={styles.label}>Tax</CustomText>
                <CustomText style={styles.value}>${cart.tax.toFixed(2)}</CustomText>
            </View>
            <View style={[styles.row, styles.totalRow]}>
                <CustomText style={styles.totalLabel}>Total</CustomText>
                <CustomText style={styles.totalValue}>
                    ${(cart.total - discount + 5.99).toFixed(2)}
                </CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base * 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.base,
    },
    label: {
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    value: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    discount: {
        color: COLORS.success,
    },
    totalRow: {
        marginTop: SIZES.base,
        paddingTop: SIZES.base * 2,
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
    },
    totalLabel: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
    totalValue: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
    },
});

export default OrderSummarySection;
