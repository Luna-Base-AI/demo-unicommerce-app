import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const PaymentSection = ({ selectedPayment, onSelectPayment }) => {
    const [paymentMethods] = useState([
        {
            id: '1',
            type: 'credit_card',
            name: 'Credit/Debit Card',
            icon: 'card-outline',
        },
        {
            id: '2',
            type: 'apple_pay',
            name: 'Apple Pay',
            icon: 'logo-apple',
        },
        {
            id: '3',
            type: 'google_pay',
            name: 'Google Pay',
            icon: 'logo-google',
        },
    ]);

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Payment Method</CustomText>
            {paymentMethods.map((method) => (
                <TouchableOpacity
                    key={method.id}
                    style={[
                        styles.methodCard,
                        selectedPayment?.id === method.id && styles.selectedCard,
                    ]}
                    onPress={() => onSelectPayment(method)}
                >
                    <Ionicons name={method.icon} size={24} color={COLORS.primary} />
                    <CustomText style={styles.methodName}>{method.name}</CustomText>
                    <View style={styles.radioButton}>
                        {selectedPayment?.id === method.id && (
                            <View style={styles.radioButtonSelected} />
                        )}
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
    methodCard: {
        flexDirection: 'row',
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
    methodName: {
        flex: 1,
        marginLeft: SIZES.base * 2,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
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

export default PaymentSection;
