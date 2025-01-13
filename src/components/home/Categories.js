import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../common/CustomText';
import { CATEGORIES } from '../../data/mock';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const Categories = () => {
    const navigation = useNavigation();

    const handleCategoryPress = (category) => {
        navigation.navigate('Products', {
            category: category.name,
            subCategories: category.subCategories
        });
    };

    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>Categories</CustomText>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            >
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryItem}
                        onPress={() => handleCategoryPress(category)}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name={category.icon} size={24} color={COLORS.primary} />
                        </View>
                        <CustomText style={styles.categoryName}>{category.name}</CustomText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base,
        backgroundColor: COLORS.white,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        marginBottom: SIZES.base,
    },
    categoriesContainer: {
        paddingVertical: SIZES.base,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: SIZES.large,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    categoryName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
});

export default Categories;
