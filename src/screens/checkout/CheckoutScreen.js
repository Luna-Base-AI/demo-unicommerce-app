import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';
import AddressSection from '../../components/checkout/AddressSection';
import PaymentSection from '../../components/checkout/PaymentSection';
import OrderSummarySection from '../../components/checkout/OrderSummarySection';
import PromoCodeSection from '../../components/checkout/PromoCodeSection';
import ShippingSection from '../../components/checkout/ShippingSection';

const CheckoutScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [promoCode, setPromoCode] = useState('');

    const handlePlaceOrder = () => {
        if (!selectedAddress || !selectedPayment || !selectedShipping) {
            // Show error toast
            return;
        }

        // Process order
        // Navigate to order confirmation
        navigation.navigate('OrderConfirmation');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <AddressSection
                    selectedAddress={selectedAddress}
                    onSelectAddress={setSelectedAddress}
                />
                <PaymentSection
                    selectedPayment={selectedPayment}
                    onSelectPayment={setSelectedPayment}
                />
                <ShippingSection
                    selectedShipping={selectedShipping}
                    onSelectShipping={setSelectedShipping}
                />
                <PromoCodeSection
                    promoCode={promoCode}
                    onApplyPromoCode={setPromoCode}
                />
                <OrderSummarySection cart={cart} promoCode={promoCode} />
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.placeOrderButton}
                    onPress={handlePlaceOrder}
                >
                    <CustomText style={styles.placeOrderText}>Place Order</CustomText>
                    <CustomText style={styles.totalAmount}>
                        ${cart.total.toFixed(2)}
                    </CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    footer: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
    },
    placeOrderButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
    },
    placeOrderText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    totalAmount: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
});

export default CheckoutScreen;
