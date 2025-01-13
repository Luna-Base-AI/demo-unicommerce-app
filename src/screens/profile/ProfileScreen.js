import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileMenuItem from '../../components/profile/ProfileMenuItem';
import { COLORS } from '../../utils/constants/theme';
import { logout } from '../../store/actions/authActions';

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const [orders] = useState(5); // Mock order count

    const handleEditPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Please allow access to your photo library to change profile picture.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Handle profile picture update
            console.log('Selected image:', result.uri);
        }
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => dispatch(logout()),
                    style: 'destructive',
                },
            ],
        );
    };

    return (
        <ScrollView style={styles.container}>
            <ProfileHeader
                user={user}
                onEditPhoto={handleEditPhoto}
            />
            <View style={styles.menuSection}>
                <ProfileMenuItem
                    icon="person-outline"
                    title="Edit Profile"
                    onPress={() => navigation.navigate('EditProfile')}
                />
                <ProfileMenuItem
                    icon="cart-outline"
                    title="Order History"
                    onPress={() => navigation.navigate('OrderHistory')}
                    showBadge
                    badgeCount={orders}
                />
                <ProfileMenuItem
                    icon="location-outline"
                    title="Shipping Addresses"
                    onPress={() => navigation.navigate('ShippingAddresses')}
                />
                <ProfileMenuItem
                    icon="shield-checkmark-outline"
                    title="Security Settings"
                    onPress={() => navigation.navigate('SecuritySettings')}
                />
                <ProfileMenuItem
                    icon="notifications-outline"
                    title="Notifications"
                    onPress={() => navigation.navigate('NotificationSettings')}
                />
                <ProfileMenuItem
                    icon="language-outline"
                    title="Language"
                    onPress={() => navigation.navigate('LanguageSettings')}
                />
                <ProfileMenuItem
                    icon="log-out-outline"
                    title="Logout"
                    onPress={handleLogout}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
    },
    menuSection: {
        marginTop: 20,
        backgroundColor: COLORS.white,
    },
});

export default ProfileScreen;
