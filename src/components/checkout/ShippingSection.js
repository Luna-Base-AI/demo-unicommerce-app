import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const ShippingSection = ({ selectedShipping, onSelectShipping }) => {
    const [shippingOptions] = useState([
        {
            id: '1',
            name: 'Standard Shipping',
            price: 5.99,
            duration: '3-5 business days',
        },
        {
            id: '2',
            name: 'Express Shipping',
            price: 14.99,
            duration: '1-2 business days',
        },
        {
            id: '3',
            name: 'Same Day Delivery',
            price: 24.99,
            duration: 'Today',
        },
    ]);

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Shipping Method</CustomText>
            {shippingOptions.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    style={[
                        styles.optionCard,
                        selectedShipping?.id === option.id && styles.selectedCard,
                    ]}
                    onPress={() => onSelectShipping(option)}
                >
                    <View style={styles.optionInfo}>
                        <CustomText style={styles.optionName}>{option.name}</CustomText>
                        <CustomText style={styles.duration}>{option.duration}</CustomText>
                    </View>
                    <View style={styles.priceContainer}>
                        <CustomText style={styles.price}>${option.price.toFixed(2)}</CustomText>
                        <View style={styles.radioButton}>
                            {selectedShipping?.id === option.id && (
                                <View style={styles.radioButtonSelected} />
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
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
    optionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderWidth: 1,
        borderColor: COLORS.light,
        borderRadius: SIZES.base,
        marginBottom: SIZES.base,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.light,
    },
    optionInfo: {
        flex: 1,
    },
    optionName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base / 2,
    },
    duration: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginRight: SIZES.base * 2,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
});

export default ShippingSection;
