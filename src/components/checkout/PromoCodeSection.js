import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const PromoCodeSection = ({ promoCode, onApplyPromoCode }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleApplyCode = () => {
        if (code.trim().length === 0) {
            setError('Please enter a promo code');
            return;
        }

        // Validate promo code
        if (code === 'STUDENT10') {
            onApplyPromoCode(code);
            setError('');
        } else {
            setError('Invalid promo code');
        }
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Promo Code</CustomText>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter promo code"
                    value={code}
                    onChangeText={setCode}
                    autoCapitalize="characters"
                />
                <TouchableOpacity
                    style={[styles.applyButton, !code && styles.disabledButton]}
                    onPress={handleApplyCode}
                    disabled={!code}
                >
                    <CustomText style={styles.applyButtonText}>Apply</CustomText>
                </TouchableOpacity>
            </View>
            {error ? (
                <CustomText style={styles.errorText}>{error}</CustomText>
            ) : null}
            {promoCode ? (
                <View style={styles.appliedContainer}>
                    <CustomText style={styles.appliedText}>
                        Promo code applied: {promoCode}
                    </CustomText>
                    <TouchableOpacity onPress={() => onApplyPromoCode('')}>
                        <CustomText style={styles.removeText}>Remove</CustomText>
                    </TouchableOpacity>
                </View>
            ) : null}
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
    inputContainer: {
        flexDirection: 'row',
        marginBottom: SIZES.base,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.light,
        borderRadius: SIZES.base,
        paddingHorizontal: SIZES.base * 2,
        marginRight: SIZES.base,
        fontSize: SIZES.font,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.base * 2,
        borderRadius: SIZES.base,
    },
    disabledButton: {
        backgroundColor: COLORS.gray,
    },
    applyButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    errorText: {
        color: COLORS.danger,
        fontSize: SIZES.small,
        marginTop: SIZES.base,
    },
    appliedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        marginTop: SIZES.base,
    },
    appliedText: {
        color: COLORS.success,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    removeText: {
        color: COLORS.danger,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
});

export default PromoCodeSection;
