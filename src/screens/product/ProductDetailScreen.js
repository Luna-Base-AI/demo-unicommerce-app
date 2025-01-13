import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Share,
    StatusBar,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import CustomText from '../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductSpecifications from '../../components/product/ProductSpecifications';
import ProductReviews from '../../components/product/ProductReviews';
import ProductWarranty from '../../components/product/ProductWarranty';
import RelatedProducts from '../../components/product/RelatedProducts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const [selectedTab, setSelectedTab] = useState('description');

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (!product.inStock) {
            Toast.show({
                type: 'error',
                text1: 'Out of Stock',
                text2: 'This product is currently unavailable',
                position: 'top',
                visibilityTime: 2000,
            });
            return;
        }

        dispatch(addToCart({
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                studentPrice: product.studentPrice,
                image: product.image,
                inStock: product.inStock,
                quantity: product.quantity,
            },
            quantity: 1
        }));

        Toast.show({
            type: 'success',
            text1: 'Added to Cart',
            text2: 'Tap to view cart',
            position: 'top',
            visibilityTime: 2000,
            onPress: () => navigation.navigate('Cart'),
        });
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out ${product.name} on UniCommerce!`,
                url: product.image,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderHeader = () => (
        <View style={[styles.header, { marginTop: StatusBar.currentHeight || 0 }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Ionicons name="arrow-back" size={24} color={COLORS.dark} />
            </TouchableOpacity>
            <View style={styles.headerActions}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={handleShare}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="share-outline" size={24} color={COLORS.dark} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.headerButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="heart-outline" size={24} color={COLORS.dark} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderProductInfo = () => (
        <View style={styles.productInfo}>
            <CustomText style={styles.productName}>{product.name}</CustomText>
            <View style={styles.priceContainer}>
                <CustomText style={styles.price}>${product.price}</CustomText>
                {product.studentPrice && (
                    <CustomText style={styles.studentPrice}>
                        ${product.studentPrice}
                    </CustomText>
                )}
            </View>
            <View style={styles.stockInfo}>
                <CustomText style={[
                    styles.stockStatus,
                    !product.inStock && styles.outOfStock
                ]}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </CustomText>
                {product.inStock && product.quantity < 5 && (
                    <CustomText style={styles.lowStock}>
                        Only {product.quantity} left in stock!
                    </CustomText>
                )}
            </View>
        </View>
    );

    const renderTabs = () => (
        <View style={styles.tabs}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    selectedTab === 'description' && styles.activeTab,
                ]}
                onPress={() => setSelectedTab('description')}
            >
                <CustomText
                    style={[
                        styles.tabText,
                        selectedTab === 'description' && styles.activeTabText,
                    ]}
                >
                    Description
                </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    selectedTab === 'specifications' && styles.activeTab,
                ]}
                onPress={() => setSelectedTab('specifications')}
            >
                <CustomText
                    style={[
                        styles.tabText,
                        selectedTab === 'specifications' && styles.activeTabText,
                    ]}
                >
                    Specifications
                </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    selectedTab === 'reviews' && styles.activeTab,
                ]}
                onPress={() => setSelectedTab('reviews')}
            >
                <CustomText
                    style={[
                        styles.tabText,
                        selectedTab === 'reviews' && styles.activeTabText,
                    ]}
                >
                    Reviews
                </CustomText>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <View style={styles.container}>
                {renderHeader()}
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <ProductImageGallery images={product.images} />
                    {renderProductInfo()}
                    {renderTabs()}

                    {selectedTab === 'description' && (
                        <View style={styles.tabContent}>
                            <CustomText style={styles.description}>
                                {product.description}
                            </CustomText>
                        </View>
                    )}

                    {selectedTab === 'specifications' && (
                        <ProductSpecifications specifications={product.specs} />
                    )}

                    {selectedTab === 'reviews' && (
                        <ProductReviews reviews={product.reviews} />
                    )}

                    <ProductWarranty warranty={product.warranty} />
                    <RelatedProducts
                        products={product.relatedProducts}
                        onProductPress={(product) =>
                            navigation.push('ProductDetail', { product })
                        }
                    />
                    <View style={styles.bottomSpacing} />
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.addToCartButton,
                            !product.inStock && styles.disabledButton
                        ]}
                        onPress={handleAddToCart}
                        disabled={!product.inStock}
                    >
                        <Ionicons name="cart-outline" size={20} color={COLORS.white} />
                        <CustomText style={styles.addToCartText}>
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
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
    backButton: {
        padding: SIZES.base,
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerButton: {
        marginLeft: SIZES.base * 2,
        padding: SIZES.base,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    productInfo: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
    },
    productName: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.bold,
        marginBottom: SIZES.base,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    price: {
        fontSize: SIZES.large,
        color: COLORS.gray,
        textDecorationLine: 'line-through',
        marginRight: SIZES.base,
    },
    studentPrice: {
        fontSize: SIZES.extraLarge,
        color: COLORS.primary,
        fontFamily: FONTS.bold,
    },
    stockInfo: {
        marginTop: SIZES.base,
    },
    stockStatus: {
        fontSize: SIZES.font,
        color: COLORS.success,
        fontFamily: FONTS.medium,
    },
    outOfStock: {
        color: COLORS.danger,
    },
    lowStock: {
        fontSize: SIZES.small,
        color: COLORS.warning,
        marginTop: SIZES.base / 2,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        marginTop: SIZES.base,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    tab: {
        flex: 1,
        paddingVertical: SIZES.base * 1.5,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    activeTabText: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
    },
    tabContent: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
    },
    description: {
        fontSize: SIZES.font,
        lineHeight: SIZES.font * 1.5,
        color: COLORS.dark,
    },
    bottomSpacing: {
        height: SIZES.base * 2,
    },
    footer: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
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
    disabledButton: {
        backgroundColor: COLORS.gray,
        opacity: 0.7,
    }
});

export default ProductDetailScreen;
