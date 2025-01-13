import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../../utils/constants/theme';

const NotificationSettingsScreen = () => {
    const [settings, setSettings] = useState({
        orderUpdates: true,
        promotions: true,
        priceAlerts: false,
        newProducts: true,
        studentDeals: true,
        emailNotifications: true,
        pushNotifications: true,
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const renderSettingItem = (icon, title, subtitle, settingKey) => (
        <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
                <Ionicons name={icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.settingContent}>
                <CustomText style={styles.settingTitle}>{title}</CustomText>
                <CustomText style={styles.settingSubtitle}>{subtitle}</CustomText>
            </View>
            <Switch
                value={settings[settingKey]}
                onValueChange={(value) => updateSetting(settingKey, value)}
                trackColor={{ false: COLORS.light, true: COLORS.primary }}
                thumbColor={COLORS.white}
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>Notification Types</CustomText>
                {renderSettingItem(
                    'cart-outline',
                    'Order Updates',
                    'Get notified about your order status',
                    'orderUpdates'
                )}
                {renderSettingItem(
                    'pricetag-outline',
                    'Promotions',
                    'Receive special offers and promotions',
                    'promotions'
                )}
                {renderSettingItem(
                    'trending-down-outline',
                    'Price Alerts',
                    'Get notified when prices drop',
                    'priceAlerts'
                )}
                {renderSettingItem(
                    'cube-outline',
                    'New Products',
                    'Be the first to know about new products',
                    'newProducts'
                )}
                {renderSettingItem(
                    'school-outline',
                    'Student Deals',
                    'Special offers for students',
                    'studentDeals'
                )}
            </View>

            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>Notification Channels</CustomText>
                {renderSettingItem(
                    'mail-outline',
                    'Email Notifications',
                    'Receive notifications via email',
                    'emailNotifications'
                )}
                {renderSettingItem(
                    'phone-portrait-outline',
                    'Push Notifications',
                    'Receive notifications on your device',
                    'pushNotifications'
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    section: {
        backgroundColor: COLORS.white,
        marginVertical: SIZES.base,
        paddingVertical: SIZES.base * 2,
    },
    sectionTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.gray,
        marginBottom: SIZES.base,
        paddingHorizontal: SIZES.base * 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.base * 2,
        paddingHorizontal: SIZES.base * 2,
        backgroundColor: COLORS.white,
    },
    settingIcon: {
        width: 40,
        alignItems: 'center',
    },
    settingContent: {
        flex: 1,
        marginLeft: SIZES.base * 2,
    },
    settingTitle: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginBottom: 4,
    },
    settingSubtitle: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
});

export default NotificationSettingsScreen;