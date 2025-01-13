import React from 'react';
import { FlatList, StyleSheet, RefreshControl, View } from 'react-native';
import SearchBar from '../../components/home/SearchBar';
import Categories from '../../components/home/Categories';
import PromotionalBanner from '../../components/home/PromotionalBanner';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import StudentDeals from '../../components/home/StudentDeals';
import { COLORS, SIZES } from '../../utils/constants/theme';

const HomeScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // Add your refresh logic here
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    // Define sections for the home screen
    const sections = [
        { id: 'banner', type: 'banner' },
        { id: 'categories', type: 'categories' },
        { id: 'featured', type: 'featured' },
        { id: 'deals', type: 'deals' },
    ];

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'banner':
                return <PromotionalBanner />;
            case 'categories':
                return <Categories />;
            case 'featured':
                return <FeaturedProducts />;
            case 'deals':
                return <StudentDeals />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <SearchBar />
            </View>
            <FlatList
                data={sections}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                contentContainerStyle={styles.contentContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    searchBarContainer: {
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
        elevation: 1,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    separator: {
        height: SIZES.base,
    },
});

export default HomeScreen;