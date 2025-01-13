import React, { useState } from 'react';
import {
    Modal,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const FilterModal = ({ visible, onClose, filters, onApply }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleApply = () => {
        onApply(localFilters);
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
                        <CustomText style={styles.title}>Filters</CustomText>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color={COLORS.dark} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.filtersContainer}>
                        {/* Add filter options here */}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.button, styles.resetButton]}
                            onPress={() => setLocalFilters(filters)}
                        >
                            <CustomText style={styles.resetButtonText}>Reset</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.applyButton]}
                            onPress={handleApply}
                        >
                            <CustomText style={styles.applyButtonText}>Apply</CustomText>
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
        maxHeight: '80%',
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
    filtersContainer: {
        padding: SIZES.base * 2,
    },
    footer: {
        flexDirection: 'row',
        padding: SIZES.base * 2,
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
    },
    button: {
        flex: 1,
        padding: SIZES.base * 1.5,
        borderRadius: SIZES.base,
        alignItems: 'center',
    },
    resetButton: {
        backgroundColor: COLORS.light,
        marginRight: SIZES.base,
    },
    applyButton: {
        backgroundColor: COLORS.primary,
        marginLeft: SIZES.base,
    },
    resetButtonText: {
        color: COLORS.dark,
        fontFamily: FONTS.medium,
    },
    applyButtonText: {
        color: COLORS.white,
        fontFamily: FONTS.medium,
    },
});

export default FilterModal;
