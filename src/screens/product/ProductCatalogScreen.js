import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';
import ProductCard from '../../components/product/ProductCard';
import FilterModal from '../../components/product/FilterModal';
import SortModal from '../../components/product/SortModal';
import QuickViewModal from '../../components/product/QuickViewModal';
import { FEATURED_PRODUCTS } from '../../data/mock/products';

const ITEMS_PER_PAGE = 20;

const ProductCatalogScreen = ({ route, navigation }) => {
    // Route params
    const category = route.params?.category;
    const subCategories = route.params?.subCategories;

    // State management
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Modal states
    const [filterVisible, setFilterVisible] = useState(false);
    const [sortVisible, setSortVisible] = useState(false);
    const [quickViewVisible, setQuickViewVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter and sort states
    const [filters, setFilters] = useState({
        priceRange: [0, 5000],
        brands: [],
        category: category || '',
        subCategory: '',
        specifications: {
            ram: [],
            storage: [],
            processor: [],
            screenSize: [],
            camera: [],
            color: [],
        },
    });
    const [sortBy, setSortBy] = useState('popularity');

    // Initial load
    useEffect(() => {
        loadInitialProducts();
    }, []);

    // Handle category changes
    useEffect(() => {
        if (category) {
            setFilters(prev => ({
                ...prev,
                category: category,
                subCategories: subCategories || [],
            }));
            applyFilters();
        }
    }, [category, subCategories]);

    const loadInitialProducts = async () => {
        try {
            setLoading(true);
            // Simulate API call
            const response = await new Promise(resolve =>
                setTimeout(() => resolve(FEATURED_PRODUCTS), 1000)
            );
            setProducts(response);
            setFilteredProducts(response);
            setDisplayedProducts(response.slice(0, ITEMS_PER_PAGE));
            setHasError(false);
        } catch (error) {
            setHasError(true);
            Alert.alert('Error', 'Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        setPage(1);
        await loadInitialProducts();
        setRefreshing(false);
    };

    const handleLoadMore = async () => {
        if (loading || !hasMore) return;

        try {
            setLoading(true);
            const startIndex = page * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const newProducts = filteredProducts.slice(startIndex, endIndex);

            if (newProducts.length > 0) {
                setDisplayedProducts(prev => [...prev, ...newProducts]);
                setPage(prev => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load more products.');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...products];

        // Category filter
        if (filters.category) {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Price range filter
        filtered = filtered.filter(
            product =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]
        );

        // Brand filter
        if (filters.brands.length > 0) {
            filtered = filtered.filter(product =>
                filters.brands.includes(product.brand)
            );
        }

        // Specifications filter
        Object.entries(filters.specifications).forEach(([key, values]) => {
            if (values.length > 0) {
                filtered = filtered.filter(product =>
                    values.includes(product.specs?.[key])
                );
            }
        });

        setFilteredProducts(filtered);
        setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
        setPage(1);
        setHasMore(true);
    };

    const applySorting = (sortType) => {
        let sorted = [...filteredProducts];

        switch (sortType) {
            case 'priceLowToHigh':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'priceHighToLow':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'rating':
                sorted.sort((a, b) => b.rating - a.rating);
                break;
            default:
                sorted.sort((a, b) => b.popularity - a.popularity);
        }

        setFilteredProducts(sorted);
        setDisplayedProducts(sorted.slice(0, ITEMS_PER_PAGE));
        setPage(1);
    };

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setQuickViewVisible(true);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <CustomText style={styles.title}>
                {filters.category || 'All Products'}
            </CustomText>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setSortVisible(true)}
                >
                    <Ionicons name="funnel-outline" size={20} color={COLORS.dark} />
                    <CustomText style={styles.actionText}>Sort</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setFilterVisible(true)}
                >
                    <Ionicons name="options-outline" size={20} color={COLORS.dark} />
                    <CustomText style={styles.actionText}>Filter</CustomText>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderProduct = ({ item }) => (
        <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onQuickView={() => handleQuickView(item)}
        />
    );

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={COLORS.gray} />
            <CustomText style={styles.emptyText}>No products found</CustomText>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
                data={displayedProducts}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.productList}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.8}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderEmpty}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
            <FilterModal
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                filters={filters}
                onApply={(newFilters) => {
                    setFilters(newFilters);
                    setFilterVisible(false);
                    applyFilters();
                }}
            />
            <SortModal
                visible={sortVisible}
                onClose={() => setSortVisible(false)}
                sortBy={sortBy}
                onSort={(newSort) => {
                    setSortBy(newSort);
                    setSortVisible(false);
                    applySorting(newSort);
                }}
            />
            <QuickViewModal
                visible={quickViewVisible}
                onClose={() => setQuickViewVisible(false)}
                product={selectedProduct}
                onAddToCart={(product) => {
                    // Implement add to cart logic
                    Alert.alert('Success', 'Product added to cart');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SIZES.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: SIZES.base * 2,
        padding: SIZES.base,
    },
    actionText: {
        marginLeft: SIZES.base / 2,
        fontSize: SIZES.font,
        color: COLORS.dark,
        fontFamily: FONTS.medium,
    },
    productList: {
        padding: SIZES.base,
        paddingBottom: SIZES.base * 4,
    },
    footer: {
        padding: SIZES.base * 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 4,
    },
    emptyText: {
        fontSize: SIZES.medium,
        color: COLORS.gray,
        marginTop: SIZES.base,
        fontFamily: FONTS.medium,
    },
});

export default ProductCatalogScreen;
