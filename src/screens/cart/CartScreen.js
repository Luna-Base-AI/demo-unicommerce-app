import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../components/common/CustomText';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from '../../store/slices/cartSlice';

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch(); // Fix: Get dispatch function using useDispatch hook
    const { items, subtotal, tax, total } = useSelector((state) => state.cart);

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleCheckout = () => {
        // Navigate to checkout screen
        navigation.navigate('Checkout');
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1585928642826-c0a6dc85de4d' }}
                        style={styles.emptyImage}
                    />
                    <CustomText style={styles.emptyText}>Your cart is empty</CustomText>
                    <TouchableOpacity
                        style={styles.shopButton}
                        onPress={() => navigation.navigate('Products')}
                    >
                        <CustomText style={styles.shopButtonText}>Start Shopping</CustomText>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={handleRemoveItem}
                            onUpdateQuantity={handleUpdateQuantity}
                        />
                    ))}
                    <CartSummary subtotal={subtotal} tax={tax} total={total} />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <CustomText style={styles.checkoutText}>Proceed to Checkout</CustomText>
                    <CustomText style={styles.checkoutPrice}>${total.toFixed(2)}</CustomText>
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
    content: {
        padding: SIZES.base * 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 2,
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: SIZES.base * 2,
    },
    emptyText: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base * 2,
    },
    shopButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.base * 3,
        paddingVertical: SIZES.base * 1.5,
        borderRadius: SIZES.base,
    },
    shopButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    footer: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
    },
    checkoutButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
    },
    checkoutText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    checkoutPrice: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
});

export default CartScreen;
