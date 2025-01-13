import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../../utils/constants/theme'

const SecuritySettingsScreen = ({ navigation }) => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [biometricEnabled, setBiometricEnabled] = useState(false);
    const lastLogin = new Date().toLocaleString(); // In real app, get from user data

    const renderSettingItem = (icon, title, subtitle, value, onValueChange, type = 'switch') => (
        <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
                <Ionicons name={icon} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.settingContent}>
                <CustomText style={styles.settingTitle}>{title}</CustomText>
                <CustomText style={styles.settingSubtitle}>{subtitle}</CustomText>
            </View>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    trackColor={{ false: COLORS.light, true: COLORS.primary }}
                    thumbColor={COLORS.white}
                />
            ) : (
                <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
            )}
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>Security Options</CustomText>
                {renderSettingItem(
                    'lock-closed-outline',
                    'Change Password',
                    'Update your password regularly',
                    null,
                    () => navigation.navigate('ChangePassword'),
                    'button'
                )}
                {renderSettingItem(
                    'shield-checkmark-outline',
                    'Two-Factor Authentication',
                    'Add an extra layer of security',
                    twoFactorEnabled,
                    setTwoFactorEnabled
                )}
                {renderSettingItem(
                    'finger-print-outline',
                    'Biometric Login',
                    'Use fingerprint or face recognition',
                    biometricEnabled,
                    setBiometricEnabled
                )}
            </View>

            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>Session Information</CustomText>
                <View style={styles.infoItem}>
                    <CustomText style={styles.infoLabel}>Last Login:</CustomText>
                    <CustomText style={styles.infoValue}>{lastLogin}</CustomText>
                </View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => {/* Implement logout */ }}
                >
                    <Ionicons name="log-out-outline" size={24} color={COLORS.danger} />
                    <CustomText style={styles.logoutText}>Log Out of All Devices</CustomText>
                </TouchableOpacity>
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
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base,
    },
    infoLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
    infoValue: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base * 2,
        marginTop: SIZES.base,
    },
    logoutText: {
        color: COLORS.danger,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        marginLeft: SIZES.base,
    },
});

export default SecuritySettingsScreen;