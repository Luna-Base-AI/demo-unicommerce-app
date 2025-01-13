import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import ProductCard from './ProductCard';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const RelatedProducts = ({ products, onProductPress }) => {
    if (!products || products.length === 0) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText style={styles.title}>Related Products</CustomText>
                <View style={styles.subtitle}>
                    <Ionicons name="information-circle-outline" size={16} color={COLORS.gray} />
                    <CustomText style={styles.subtitleText}>
                        Products you might also like
                    </CustomText>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
            >
                {products.map((product) => (
                    <View key={product.id} style={styles.productWrapper}>
                        <ProductCard
                            product={product}
                            onPress={() => onProductPress(product)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.base * 2,
        marginTop: SIZES.base,
    },
    header: {
        paddingHorizontal: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        marginBottom: SIZES.base / 2,
    },
    subtitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subtitleText: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginLeft: SIZES.base / 2,
    },
    productsContainer: {
        paddingHorizontal: SIZES.base,
    },
    productWrapper: {
        width: 180,
        marginRight: SIZES.base,
    },
});

export default RelatedProducts;
