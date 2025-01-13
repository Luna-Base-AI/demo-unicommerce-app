import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const AddressSection = ({ selectedAddress, onSelectAddress }) => {
    const [addresses, setAddresses] = useState([
        {
            id: '1',
            name: 'Home',
            street: '123 University Ave',
            city: 'College Town',
            state: 'CA',
            zip: '12345',
            isDefault: true,
        },
    ]);

    const handleAddAddress = () => {
        // Navigate to add address screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText style={styles.title}>Delivery Address</CustomText>
                <TouchableOpacity onPress={handleAddAddress}>
                    <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            {addresses.map((address) => (
                <TouchableOpacity
                    key={address.id}
                    style={[
                        styles.addressCard,
                        selectedAddress?.id === address.id && styles.selectedCard,
                    ]}
                    onPress={() => onSelectAddress(address)}
                >
                    <View style={styles.addressHeader}>
                        <CustomText style={styles.addressName}>{address.name}</CustomText>
                        {address.isDefault && (
                            <View style={styles.defaultBadge}>
                                <CustomText style={styles.defaultText}>Default</CustomText>
                            </View>
                        )}
                    </View>
                    <CustomText style={styles.addressText}>
                        {address.street}
                    </CustomText>
                    <CustomText style={styles.addressText}>
                        {`${address.city}, ${address.state} ${address.zip}`}
                    </CustomText>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        marginBottom: SIZES.base,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base * 2,
    },
    title: {
        fontSize: SIZES.large,
        fontFamily: FONTS.medium,
    },
    addressCard: {
        borderWidth: 1,
        borderColor: COLORS.light,
        borderRadius: SIZES.base,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.light,
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    addressName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    defaultBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.base,
        paddingVertical: SIZES.base / 2,
        borderRadius: SIZES.base / 2,
    },
    defaultText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        fontFamily: FONTS.medium,
    },
    addressText: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base / 2,
    },
});

export default AddressSection;
