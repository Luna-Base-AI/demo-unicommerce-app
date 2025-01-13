import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SIZES.base * 4) / 2;

const ProductCard = ({ product, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.info}>
                <CustomText style={styles.name} numberOfLines={2}>
                    {product.name}
                </CustomText>
                <View style={styles.priceContainer}>
                    <CustomText style={styles.price}>${product.price}</CustomText>
                    {product.studentPrice && (
                        <CustomText style={styles.studentPrice}>
                            ${product.studentPrice}
                        </CustomText>
                    )}
                </View>
                <View style={styles.categoryContainer}>
                    <CustomText style={styles.category}>{product.category}</CustomText>
                </View>
            </View>
            <TouchableOpacity style={styles.wishlistButton}>
                <Ionicons name="heart-outline" size={20} color={COLORS.dark} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        marginBottom: SIZES.base * 2,
        marginHorizontal: SIZES.base,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: CARD_WIDTH,
        borderTopLeftRadius: SIZES.base,
        borderTopRightRadius: SIZES.base,
    },
    info: {
        padding: SIZES.base,
    },
    name: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base / 2,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base / 2,
    },
    price: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginRight: SIZES.base,
    },
    studentPrice: {
        fontSize: SIZES.medium,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    categoryContainer: {
        backgroundColor: COLORS.light,
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.base / 2,
        borderRadius: SIZES.base * 2,
        alignSelf: 'flex-start',
    },
    category: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    wishlistButton: {
        position: 'absolute',
        top: SIZES.base,
        right: SIZES.base,
        backgroundColor: COLORS.white,
        padding: SIZES.base / 2,
        borderRadius: SIZES.base * 2,
    },
});

export default ProductCard;
