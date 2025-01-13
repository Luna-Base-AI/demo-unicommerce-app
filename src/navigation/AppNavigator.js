import React, { useEffect } from 'react';
import { Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import OrderConfirmationScreen from '../screens/checkout/OrderConfirmationScreen';
import EditProfileScreen from '../screens/profile/settings/EditProfileScreen';
import OrderHistoryScreen from '../screens/profile/settings/OrderHistoryScreen';
import ShippingAddressesScreen from '../screens/profile/settings/ShippingAddressesScreen';
import SecuritySettingsScreen from '../screens/profile/settings/SecuritySettingsScreen';
import NotificationSettingsScreen from '../screens/profile/settings/NotificationSettingsScreen';
import LanguageSettingsScreen from '../screens/profile/settings/LanguageSettingsScreen';
import authService from '../services/auth/authService';
import { COLORS, SIZES, FONTS } from '../utils/constants/theme';
import CustomText from '../components/common/CustomText';

const Stack = createNativeStackNavigator();

const CustomHeader = ({ navigation, title, showBack = true }) => (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                {showBack && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
                    </TouchableOpacity>
                )}
            </View>
            <CustomText style={styles.headerTitle}>{title}</CustomText>
            <View style={styles.headerRight} />
        </View>
    </SafeAreaView>
);

const AppNavigator = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const user = await authService.checkSession();
            if (user) {
                dispatch({ type: 'AUTH_SUCCESS', payload: user });
            }
        } catch (error) {
            console.error('Session check error:', error);
        }
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            ) : (
                <>
                    <Stack.Screen name="Main" component={TabNavigator} />
                    <Stack.Screen
                        name="ProductDetail"
                        component={ProductDetailScreen}
                    />
                    <Stack.Screen
                        name="Wishlist"
                        component={WishlistScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="My Wishlist"
                                />
                            )
                        })}
                    />
                    {/* Profile Settings Screens */}
                    <Stack.Screen
                        name="EditProfile"
                        component={EditProfileScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Edit Profile"
                                />
                            )
                        })}
                    />
                    <Stack.Screen
                        name="OrderHistory"
                        component={OrderHistoryScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Order History"
                                />
                            )
                        })}
                    />
                    <Stack.Screen
                        name="ShippingAddresses"
                        component={ShippingAddressesScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Shipping Addresses"
                                />
                            )
                        })}
                    />
                    <Stack.Screen
                        name="SecuritySettings"
                        component={SecuritySettingsScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Security Settings"
                                />
                            )
                        })}
                    />
                    <Stack.Screen
                        name="NotificationSettings"
                        component={NotificationSettingsScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Notifications"
                                />
                            )
                        })}
                    />
                    <Stack.Screen
                        name="LanguageSettings"
                        component={LanguageSettingsScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Language"
                                />
                            )
                        })}
                    />
                    {/* Other existing screens */}
                    <Stack.Screen
                        name="Checkout"
                        component={CheckoutScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Checkout"
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="OrderConfirmation"
                        component={OrderConfirmationScreen}
                        options={({ navigation }) => ({
                            headerShown: true,
                            header: () => (
                                <CustomHeader
                                    navigation={navigation}
                                    title="Order Confirmation"
                                    showBack={false}
                                />
                            ),
                        })}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
        height: Platform.OS === 'ios' ? 44 : 56,
        paddingHorizontal: SIZES.base * 2,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    headerLeft: {
        width: 40,
        justifyContent: 'center',
    },
    backButton: {
        padding: SIZES.base,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.text,
        flex: 1,
        textAlign: 'center',
    },
    headerRight: {
        width: 40,
    },
});

export default AppNavigator;
