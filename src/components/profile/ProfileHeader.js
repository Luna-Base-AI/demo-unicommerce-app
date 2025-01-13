import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const defaultAvatar = require('../../assets/profile/default-avatar.png');

const ProfileHeader = ({ user, onEditPhoto }) => {
    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                <Image
                    source={user?.profilePicture ? { uri: user.profilePicture } : defaultAvatar}
                    style={styles.photo}
                    defaultSource={defaultAvatar}
                />
                <TouchableOpacity style={styles.editButton} onPress={onEditPhoto}>
                    <Ionicons name="camera" size={20} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <CustomText style={styles.name}>{user?.fullName || 'User Name'}</CustomText>
                <CustomText style={styles.email}>{user?.email || 'user@university.edu'}</CustomText>
                <CustomText style={styles.studentId}>Student ID: {user?.studentId || 'N/A'}</CustomText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: SIZES.base * 2,
        backgroundColor: COLORS.white,
    },
    photoContainer: {
        position: 'relative',
        marginBottom: SIZES.base * 2,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.light,
    },
    editButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: COLORS.primary,
        padding: SIZES.base,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    infoContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: SIZES.large,
        fontFamily: FONTS.bold,
        color: COLORS.dark,
        marginBottom: SIZES.base,
    },
    email: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base / 2,
    },
    studentId: {
        fontSize: SIZES.font,
        color: COLORS.gray,
    },
});

export default ProfileHeader;
