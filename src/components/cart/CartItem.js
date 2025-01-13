import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.content}>
                <CustomText style={styles.name} numberOfLines={2}>
                    {item.name}
                </CustomText>
                <View style={styles.priceContainer}>
                    <CustomText style={styles.price}>
                        ${(item.studentPrice || item.price).toFixed(2)}
                    </CustomText>
                    {item.studentPrice && (
                        <CustomText style={styles.originalPrice}>
                            ${item.price.toFixed(2)}
                        </CustomText>
                    )}
                </View>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Ionicons
                            name="remove-circle-outline"
                            size={24}
                            color={item.quantity <= 1 ? COLORS.gray : COLORS.primary}
                        />
                    </TouchableOpacity>
                    <CustomText style={styles.quantity}>{item.quantity}</CustomText>
                    <TouchableOpacity
                        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= 5}
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color={item.quantity >= 5 ? COLORS.gray : COLORS.primary}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemove(item.id)}
            >
                <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        marginBottom: SIZES.base,
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
        width: 80,
        height: 80,
        borderRadius: SIZES.base,
    },
    content: {
        flex: 1,
        marginLeft: SIZES.base * 2,
    },
    name: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: SIZES.base,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    price: {
        fontSize: SIZES.font,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
        marginRight: SIZES.base,
    },
    originalPrice: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: SIZES.base * 2,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    removeButton: {
        padding: SIZES.base,
    },
});

export default CartItem;
