import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import CustomText from '../../components/common/CustomText';
import { COLORS, SIZES } from '../../utils/constants/theme';
import authService from '../../services/auth/authService';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setError('');
            const user = await authService.login(email, password);
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.formContainer}>
                    <CustomText style={styles.title}>Welcome Back</CustomText>

                    {error ? (
                        <CustomText style={styles.error}>{error}</CustomText>
                    ) : null}

                    <TextInput
                        style={styles.input}
                        placeholder="University Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={styles.forgotPassword}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <CustomText style={styles.forgotPasswordText}>
                            Forgot Password?
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <CustomText style={styles.loginButtonText}>
                            Login
                        </CustomText>
                    </TouchableOpacity>

                    <View style={styles.registerContainer}>
                        <CustomText>Don't have an account? </CustomText>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Register')}
                        >
                            <CustomText style={styles.registerText}>
                                Register
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    formContainer: {
        padding: SIZES.extraLarge,
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontWeight: 'bold',
        marginBottom: SIZES.extraLarge,
        textAlign: 'center',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: SIZES.base,
        paddingHorizontal: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    error: {
        color: COLORS.danger,
        marginBottom: SIZES.medium,
        textAlign: 'center',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SIZES.large,
    },
    forgotPasswordText: {
        color: COLORS.primary,
    },
    loginButton: {
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.large,
    },
    loginButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default LoginScreen;