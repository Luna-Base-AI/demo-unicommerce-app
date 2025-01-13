import React from 'react';
import {
    Modal,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.6;

const QuickViewModal = ({ visible, onClose, product, onAddToCart }) => {
    if (!product) return null;

    const renderSpecifications = () => {
        return Object.entries(product.specs || {}).map(([key, value]) => (
            <View key={key} style={styles.specItem}>
                <CustomText style={styles.specLabel}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                </CustomText>
                <CustomText style={styles.specValue}>{value}</CustomText>
            </View>
        ));
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <CustomText style={styles.title}>Quick View</CustomText>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.dark} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollContainer}>
                        <Image source={{ uri: product.image }} style={styles.image} />
                        <View style={styles.infoContainer}>
                            <CustomText style={styles.productName}>{product.name}</CustomText>
                            <View style={styles.priceContainer}>
                                <CustomText style={styles.price}>${product.price}</CustomText>
                                {product.studentPrice && (
                                    <CustomText style={styles.studentPrice}>
                                        ${product.studentPrice}
                                    </CustomText>
                                )}
                            </View>
                            <View style={styles.brandContainer}>
                                <CustomText style={styles.brandLabel}>Brand:</CustomText>
                                <CustomText style={styles.brandValue}>{product.brand}</CustomText>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <CustomText style={styles.descriptionLabel}>Description:</CustomText>
                                <CustomText style={styles.descriptionText}>
                                    {product.description}
                                </CustomText>
                            </View>
                            <View style={styles.specificationsContainer}>
                                <CustomText style={styles.specificationsLabel}>
                                    Specifications:
                                </CustomText>
                                {renderSpecifications()}
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={() => onAddToCart(product)}
                        >
                            <Ionicons name="cart-outline" size={20} color={COLORS.white} />
                            <CustomText style={styles.addToCartText}>Add to Cart</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: SIZES.base * 2,
        borderTopRightRadius: SIZES.base * 2,
        maxHeight: '90%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
    scrollContainer: {
        maxHeight: '80%',
    },
    image: {
        width: '100%',
        height: IMAGE_HEIGHT,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: SIZES.base * 2,
    },
    productName: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        marginBottom: SIZES.base,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base * 2,
    },
    price: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginRight: SIZES.base,
    },
    studentPrice: {
        fontSize: SIZES.large,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    brandContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    brandLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginRight: SIZES.base,
    },
    brandValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    descriptionContainer: {
        marginBottom: SIZES.base * 2,
    },
    descriptionLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base / 2,
    },
    descriptionText: {
        fontSize: SIZES.font,
        lineHeight: SIZES.font * 1.5,
    },
    specificationsContainer: {
        marginBottom: SIZES.base * 2,
    },
    specificationsLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    specItem: {
        flexDirection: 'row',
        marginBottom: SIZES.base / 2,
    },
    specLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginRight: SIZES.base,
        flex: 1,
    },
    specValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        flex: 2,
    },
    footer: {
        padding: SIZES.base * 2,
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
    },
    addToCartButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 1.5,
        borderRadius: SIZES.base,
    },
    addToCartText: {
        color: COLORS.white,
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
});

export default QuickViewModal;