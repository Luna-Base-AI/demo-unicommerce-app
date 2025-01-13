import React from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from './CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const CustomToast = ({
    type = 'success',
    text1,
    text2,
    onAction,
    actionText,
    props
}) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'checkmark-circle';
            case 'error':
                return 'alert-circle';
            case 'info':
                return 'information-circle';
            default:
                return 'checkmark-circle';
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return COLORS.success;
            case 'error':
                return COLORS.danger;
            case 'info':
                return COLORS.info;
            default:
                return COLORS.success;
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: getBackgroundColor() },
                props.style
            ]}
        >
            <View style={styles.iconContainer}>
                <Ionicons
                    name={getIcon()}
                    size={24}
                    color={COLORS.white}
                />
            </View>
            <View style={styles.contentContainer}>
                <CustomText style={styles.title} numberOfLines={1}>
                    {text1}
                </CustomText>
                {text2 && (
                    <CustomText style={styles.message} numberOfLines={2}>
                        {text2}
                    </CustomText>
                )}
            </View>
            {actionText && (
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={onAction}
                >
                    <CustomText style={styles.actionText}>
                        {actionText}
                    </CustomText>
                </TouchableOpacity>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base * 1.5,
        paddingHorizontal: SIZES.base * 2,
        borderRadius: SIZES.base,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: Platform.OS === 'ios' ? 40 : 10,
    },
    iconContainer: {
        marginRight: SIZES.base * 1.5,
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.bold,
        marginBottom: 2,
    },
    message: {
        color: COLORS.white,
        fontSize: SIZES.small,
        opacity: 0.9,
    },
    actionButton: {
        paddingLeft: SIZES.base * 2,
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    },
    actionText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        fontFamily: FONTS.bold,
    },
});

export default CustomToast;
