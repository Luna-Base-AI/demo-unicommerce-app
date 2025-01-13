import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const OrderConfirmationScreen = ({ route, navigation }) => {
    const { orderId } = route.params || { orderId: 'ORD123456' };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
                </View>
                <CustomText style={styles.title}>Order Confirmed!</CustomText>
                <CustomText style={styles.orderId}>Order ID: {orderId}</CustomText>
                <CustomText style={styles.message}>
                    Thank you for your purchase. We'll send you a confirmation email with your order details.
                </CustomText>
                <View style={styles.infoContainer}>
                    <CustomText style={styles.infoTitle}>Estimated Delivery</CustomText>
                    <CustomText style={styles.infoText}>3-5 Business Days</CustomText>
                </View>
                <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => {
                        // Navigate to order tracking
                    }}
                >
                    <CustomText style={styles.trackButtonText}>Track Order</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <CustomText style={styles.continueButtonText}>Continue Shopping</CustomText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        padding: SIZES.base * 2,
        alignItems: 'center',
    },
    iconContainer: {
        marginVertical: SIZES.base * 4,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        marginBottom: SIZES.base,
    },
    orderId: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base * 2,
    },
    message: {
        fontSize: SIZES.font,
        textAlign: 'center',
        marginBottom: SIZES.base * 3,
        color: COLORS.gray,
    },
    infoContainer: {
        alignItems: 'center',
        marginBottom: SIZES.base * 3,
    },
    infoTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base,
    },
    infoText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.primary,
    },
    trackButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.base * 2,
        paddingHorizontal: SIZES.base * 4,
        borderRadius: SIZES.base,
        marginBottom: SIZES.base * 2,
        width: '100%',
    },
    trackButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
    continueButton: {
        paddingVertical: SIZES.base * 2,
        paddingHorizontal: SIZES.base * 4,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.primary,
        width: '100%',
    },
    continueButtonText: {
        color: COLORS.primary,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
});

export default OrderConfirmationScreen;
