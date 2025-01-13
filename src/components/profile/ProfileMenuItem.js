import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const ProfileMenuItem = ({ icon, title, onPress, showBadge, badgeCount }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={24} color={COLORS.primary} />
            </View>
            <CustomText style={styles.title}>{title}</CustomText>
            <View style={styles.rightContainer}>
                {showBadge && badgeCount > 0 && (
                    <View style={styles.badge}>
                        <CustomText style={styles.badgeText}>{badgeCount}</CustomText>
                    </View>
                )}
                <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    iconContainer: {
        width: 40,
        alignItems: 'center',
    },
    title: {
        flex: 1,
        marginLeft: SIZES.base,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        color: COLORS.dark,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.base,
    },
    badgeText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        fontFamily: FONTS.bold,
        paddingHorizontal: 6,
    },
});

export default ProfileMenuItem;
