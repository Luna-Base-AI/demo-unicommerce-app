import React from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../../utils/constants/theme';

const mockOrders = [
    {
        id: '1',
        orderNumber: 'ORD-2023-001',
        date: '2023-10-15',
        status: 'Delivered',
        total: 999.99,
        items: [
            { name: 'MacBook Air', quantity: 1, price: 999.99 }
        ]
    },
    // Add more mock orders as needed
];

const OrderHistoryScreen = ({ navigation }) => {
    const renderOrderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetails', { order: item })}
        >
            <View style={styles.orderHeader}>
                <CustomText style={styles.orderNumber}>{item.orderNumber}</CustomText>
                <CustomText style={styles.orderDate}>{item.date}</CustomText>
            </View>

            <View style={styles.orderInfo}>
                <View style={styles.statusContainer}>
                    <CustomText style={styles.statusLabel}>Status:</CustomText>
                    <CustomText style={[
                        styles.statusValue,
                        { color: item.status === 'Delivered' ? COLORS.success : COLORS.primary }
                    ]}>
                        {item.status}
                    </CustomText>
                </View>

                <View style={styles.totalContainer}>
                    <CustomText style={styles.totalLabel}>Total:</CustomText>
                    <CustomText style={styles.totalValue}>${item.total.toFixed(2)}</CustomText>
                </View>
            </View>

            <View style={styles.itemsContainer}>
                {item.items.map((product, index) => (
                    <CustomText key={index} style={styles.itemText}>
                        {product.quantity}x {product.name}
                    </CustomText>
                ))}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="document-text-outline" size={20} color={COLORS.primary} />
                    <CustomText style={styles.actionButtonText}>View Details</CustomText>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {mockOrders.length > 0 ? (
                <FlatList
                    data={mockOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="receipt-outline" size={64} color={COLORS.gray} />
                    <CustomText style={styles.emptyText}>No orders yet</CustomText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContainer: {
        padding: SIZES.base * 2,
    },
    orderCard: {
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
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.base,
    },
    orderNumber: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.primary,
    },
    orderDate: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    orderInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.base * 2,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginRight: SIZES.base,
    },
    statusValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginRight: SIZES.base,
    },
    totalValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.bold,
        color: COLORS.dark,
    },
    itemsContainer: {
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
        paddingTop: SIZES.base,
        marginBottom: SIZES.base,
    },
    itemText: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginBottom: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: COLORS.light,
        paddingTop: SIZES.base,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base,
    },
    actionButtonText: {
        color: COLORS.primary,
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.base * 2,
    },
    emptyText: {
        fontSize: SIZES.large,
        color: COLORS.gray,
        marginTop: SIZES.base * 2,
    },
});

export default OrderHistoryScreen;
