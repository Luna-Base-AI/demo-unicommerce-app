import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../../utils/constants/theme';

const EditProfileScreen = () => {
    const user = useSelector(state => state.auth.user);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        studentId: user?.studentId || '',
        university: user?.university || '',
        program: user?.program || '',
        phone: user?.phone || '',
    });

    const handleSave = () => {
        // Implement save functionality
        console.log('Save profile:', formData);
    };

    const renderInput = (label, value, key, keyboardType = 'default') => (
        <View style={styles.inputContainer}>
            <CustomText style={styles.label}>{label}</CustomText>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => setFormData({ ...formData, [key]: text })}
                keyboardType={keyboardType}
                placeholderTextColor={COLORS.gray}
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.avatarContainer}>
                    {user?.profilePicture ? (
                        <Image
                            source={{ uri: user.profilePicture }}
                            style={styles.avatar}
                        />
                    ) : (
                        <View style={styles.avatarPlaceholder}>
                            <Ionicons name="person" size={40} color={COLORS.gray} />
                        </View>
                    )}
                    <View style={styles.editIconContainer}>
                        <Ionicons name="camera" size={20} color={COLORS.white} />
                    </View>
                </TouchableOpacity>

                {renderInput('Full Name', formData.fullName, 'fullName')}
                {renderInput('Email', formData.email, 'email', 'email-address')}
                {renderInput('Student ID', formData.studentId, 'studentId')}
                {renderInput('University', formData.university, 'university')}
                {renderInput('Program/Major', formData.program, 'program')}
                {renderInput('Phone', formData.phone, 'phone', 'phone-pad')}

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <CustomText style={styles.saveButtonText}>Save Changes</CustomText>
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
    content: {
        padding: SIZES.base * 2,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: SIZES.base * 3,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIconContainer: {
        position: 'absolute',
        right: '30%',
        bottom: 0,
        backgroundColor: COLORS.primary,
        padding: SIZES.base,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    inputContainer: {
        marginBottom: SIZES.base * 2,
    },
    label: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        marginBottom: SIZES.base,
    },
    input: {
        backgroundColor: COLORS.white,
        paddingHorizontal: SIZES.base * 2,
        paddingVertical: SIZES.base * 1.5,
        borderRadius: SIZES.base,
        borderWidth: 1,
        borderColor: COLORS.light,
        fontSize: SIZES.font,
        color: COLORS.dark,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        marginTop: SIZES.base * 2,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
        textAlign: 'center',
    },
});

export default EditProfileScreen;