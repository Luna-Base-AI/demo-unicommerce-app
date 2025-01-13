import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import CustomText from '../components/common/CustomText'; // Add this import
import HomeScreen from '../screens/home/HomeScreen';
import ProductCatalogScreen from '../screens/product/ProductCatalogScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { COLORS, FONTS, SIZES } from '../utils/constants/theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const cartItems = useSelector(state => state.cart.items);
    const cartItemCount = cartItems.length;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: COLORS.white,
                    elevation: 2,
                    shadowColor: COLORS.black,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    height: Platform.OS === 'ios' ? 96 : 64,
                },
                headerTitleStyle: {
                    fontFamily: FONTS.bold,
                    fontSize: SIZES.large,
                    color: COLORS.text,
                },
                headerTitleAlign: 'center',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Products':
                            iconName = focused ? 'grid' : 'grid-outline';
                            break;
                        case 'Cart':
                            iconName = focused ? 'cart' : 'cart-outline';
                            return (
                                <View>
                                    <Ionicons name={iconName} size={size} color={color} />
                                    {cartItemCount > 0 && (
                                        <View style={styles.badge}>
                                            <CustomText style={styles.badgeText}>
                                                {cartItemCount}
                                            </CustomText>
                                        </View>
                                    )}
                                </View>
                            );
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'square-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarLabelStyle: {
                    fontFamily: FONTS.medium,
                    fontSize: 12,
                    marginBottom: Platform.OS === 'ios' ? 0 : 4,
                },
                tabBarStyle: {
                    backgroundColor: COLORS.white,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.light,
                    height: Platform.OS === 'ios' ? 88 : 64,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
                },
                headerTitleContainerStyle: {
                    paddingHorizontal: SIZES.base,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'UniCommerce',
                }}
            />
            <Tab.Screen
                name="Products"
                component={ProductCatalogScreen}
                options={{
                    title: 'Products',
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    title: 'Cart',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: COLORS.danger,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: COLORS.white,
        fontSize: 12,
        fontFamily: FONTS.bold,
        paddingHorizontal: 4,
    },
});

export default TabNavigator;
