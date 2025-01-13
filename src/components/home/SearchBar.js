import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../utils/constants/theme';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (onSearch) onSearch(text);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={COLORS.gray} />
                <TextInput
                    style={styles.input}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    placeholderTextColor={COLORS.gray}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base,
        backgroundColor: COLORS.white,
        width: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.light,
        borderRadius: SIZES.base,
        paddingHorizontal: SIZES.base,
        height: 44, // Fixed height for better touch target
    },
    input: {
        flex: 1,
        paddingHorizontal: SIZES.base,
        fontSize: SIZES.font,
        height: '100%',
    },
});

export default SearchBar;
