import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../../utils/constants/theme';

const mockAddresses = [
    {
        id: '1',
        name: 'Campus Residence',
        address: 'Room 123, Building A',
        city: 'University City',
        state: 'State',
        zipCode: '12345',
        isDefault: true,
        type: 'campus'
    },
    // Add more mock addresses as needed
];

const ShippingAddressesScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState(mockAddresses);

    const handleSetDefault = (id) => {
        setAddresses(addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const renderAddress = (address) => (
        <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
                <View style={styles.addressTypeContainer}>
                    <Ionicons
                        name={address.type === 'campus' ? 'school' : 'home'}
                        size={20}
                        color={COLORS.primary}
                    />
                    <CustomText style={styles.addressName}>{address.name}</CustomText>
                </View>
                {address.isDefault && (
                    <View style={styles.defaultBadge}>
                        <CustomText style={styles.defaultText}>Default</CustomText>
                    </View>
                )}
            </View>

            <CustomText style={styles.addressText}>{address.address}</CustomText>
            <CustomText style={styles.addressText}>
                {address.city}, {address.state} {address.zipCode}
            </CustomText>

            <View style={styles.actionButtons}>
                {!address.isDefault && (
                    <TouchableOpacity
                        style={styles.setDefaultButton}
                        onPress={() => handleSetDefault(address.id)}
                    >
                        <CustomText style={styles.setDefaultText}>Set as Default</CustomText>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditAddress', { address })}
                >
                    <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {addresses.map(renderAddress)}
            </ScrollView>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddAddress')}
            >
                <Ionicons name="add" size={24} color={COLORS.white} />
                <CustomText style={styles.addButtonText}>Add New Address</CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SIZES.base * 2,
    },
    addressCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.base,
        padding: SIZES.base * 2,
        marginBottom: SIZES.base * 2,
        ...Platform.select({
            ios: {
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    addressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.base,
    },
    addressTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginLeft: SIZES.base,
    },
    defaultBadge: {
        backgroundColor: COLORS.success,
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
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: SIZES.base,
    },
    setDefaultButton: {
        marginRight: SIZES.base * 2,
    },
    setDefaultText: {
        color: COLORS.primary,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    editButton: {
        padding: SIZES.base,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.base * 2,
        margin: SIZES.base * 2,
        borderRadius: SIZES.base,
    },
    addButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginLeft: SIZES.base,
    },
});

export default ShippingAddressesScreen;