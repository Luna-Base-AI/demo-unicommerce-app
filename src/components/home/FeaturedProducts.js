import React from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../common/CustomText';
import { FEATURED_PRODUCTS } from '../../data/mock';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - (SIZES.base * 4)) / 2;

const FeaturedProducts = () => {
    const navigation = useNavigation();

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <CustomText style={styles.productName} numberOfLines={2}>{item.name}</CustomText>
                <View style={styles.priceContainer}>
                    <CustomText style={styles.originalPrice}>${item.price}</CustomText>
                    {item.studentPrice && (
                        <CustomText style={styles.studentPrice}>${item.studentPrice}</CustomText>
                    )}
                </View>
                <View style={styles.categoryContainer}>
                    <CustomText style={styles.categoryText}>{item.category}</CustomText>
                </View>
            </View>
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => {/* Add to cart logic */ }}
            >
                <Ionicons name="cart-outline" size={20} color={COLORS.white} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText style={styles.title}>Featured Products</CustomText>
                <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => navigation.navigate('Products')}
                >
                    <CustomText style={styles.viewAllText}>View All</CustomText>
                    <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.productsGrid}>
                {FEATURED_PRODUCTS.slice(0, 4).map((item) => (
                    <View key={item.id} style={styles.productCard}>
                        {renderProduct({ item })}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewAllText: {
        color: COLORS.primary,
        marginRight: 4,
        fontFamily: FONTS.medium,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: SIZES.base,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: COLUMN_WIDTH,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: SIZES.base,
    },
    productImage: {
        width: '100%',
        height: COLUMN_WIDTH,
        borderTopLeftRadius: SIZES.base,
        borderTopRightRadius: SIZES.base,
    },
    productInfo: {
        padding: SIZES.base,
    },
    productName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    originalPrice: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    studentPrice: {
        fontSize: SIZES.medium,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    categoryContainer: {
        backgroundColor: COLORS.light,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    categoryText: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    addToCartButton: {
        position: 'absolute',
        right: SIZES.base,
        bottom: SIZES.base,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FeaturedProducts;