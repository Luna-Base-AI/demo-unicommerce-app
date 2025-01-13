import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const CartSummary = ({ subtotal, tax, total }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <CustomText style={styles.label}>Subtotal</CustomText>
                <CustomText style={styles.value}>${subtotal.toFixed(2)}</CustomText>
            </View>
            <View style={styles.row}>
                <CustomText style={styles.label}>Tax (8%)</CustomText>
                <CustomText style={styles.value}>${tax.toFixed(2)}</CustomText>
            </View>
            <View style={[styles.row, styles.totalRow]}>
                <CustomText style={styles.totalLabel}>Total</CustomText>
                <CustomText style={styles.totalValue}>${total.toFixed(2)}</CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
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
    totalRow: {
        marginTop: SIZES.base,
        paddingTop: SIZES.base,
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

export default CartSummary;
