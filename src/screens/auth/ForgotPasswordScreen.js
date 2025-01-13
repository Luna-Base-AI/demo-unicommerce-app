import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../../components/common/CustomText';
import { COLORS } from '../../utils/constants/theme';

const ForgotPasswordScreen = () => {
    return (
        <View style={styles.container}>
            <CustomText>Forgot Password Screen</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
});

export default ForgotPasswordScreen;