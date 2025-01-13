import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '../../../components/common/CustomText';
import { COLORS, SIZES, FONTS } from '../../../utils/constants/theme';
import { setLanguage } from '../../../store/actions/authActions';

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

const LanguageSettingsScreen = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector(state => state.auth.language);

    const handleLanguageSelect = (languageCode) => {
        dispatch(setLanguage(languageCode));
    };

    const renderLanguageItem = (language) => {
        const isSelected = currentLanguage === language.code;

        return (
            <TouchableOpacity
                key={language.code}
                style={[
                    styles.languageItem,
                    isSelected && styles.selectedLanguageItem
                ]}
                onPress={() => handleLanguageSelect(language.code)}
            >
                <View style={styles.languageInfo}>
                    <CustomText style={styles.languageFlag}>{language.flag}</CustomText>
                    <CustomText style={[
                        styles.languageName,
                        isSelected && styles.selectedLanguageText
                    ]}>
                        {language.name}
                    </CustomText>
                </View>
                {isSelected && (
                    <Ionicons name="checkmark" size={24} color={COLORS.primary} />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>Select Language</CustomText>
                {languages.map(renderLanguageItem)}
            </View>
            <CustomText style={styles.note}>
                Note: Changing the language will restart the app
            </CustomText>
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
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SIZES.base * 2,
        paddingHorizontal: SIZES.base * 2,
        backgroundColor: COLORS.white,
    },
    selectedLanguageItem: {
        backgroundColor: COLORS.light,
    },
    languageInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    languageFlag: {
        fontSize: SIZES.large,
        marginRight: SIZES.base * 2,
    },
    languageName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.medium,
    },
    selectedLanguageText: {
        color: COLORS.primary,
    },
    note: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        textAlign: 'center',
        marginVertical: SIZES.base * 2,
        paddingHorizontal: SIZES.base * 2,
    },
});

export default LanguageSettingsScreen;