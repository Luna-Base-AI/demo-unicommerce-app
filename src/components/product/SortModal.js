import React from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const sortOptions = [
    { id: 'popularity', label: 'Most Popular' },
    { id: 'priceLowToHigh', label: 'Price: Low to High' },
    { id: 'priceHighToLow', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' },
    { id: 'rating', label: 'Customer Rating' },
];

const SortModal = ({ visible, onClose, sortBy, onSort }) => {
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
                        <CustomText style={styles.title}>Sort By</CustomText>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.dark} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionsContainer}>
                        {sortOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={[
                                    styles.option,
                                    sortBy === option.id && styles.selectedOption,
                                ]}
                                onPress={() => onSort(option.id)}
                            >
                                <CustomText
                                    style={[
                                        styles.optionText,
                                        sortBy === option.id && styles.selectedOptionText,
                                    ]}
                                >
                                    {option.label}
                                </CustomText>
                                {sortBy === option.id && (
                                    <Ionicons
                                        name="checkmark"
                                        size={20}
                                        color={COLORS.primary}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
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
    optionsContainer: {
        padding: SIZES.base * 2,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZES.base * 1.5,
    },
    selectedOption: {
        backgroundColor: COLORS.light,
        borderRadius: SIZES.base,
        paddingHorizontal: SIZES.base * 1.5,
    },
    optionText: {
        fontSize: SIZES.font,
        color: COLORS.dark,
    },
    selectedOptionText: {
        color: COLORS.primary,
        fontFamily: FONTS.medium,
    },
});

export default SortModal;
