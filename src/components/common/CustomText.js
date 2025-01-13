import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

const CustomText = ({ style, children, ...props }) => {
    return (
        <Text style={[styles.text, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
        fontSize: 14,
        color: '#000000',
    },
});

export default CustomText;
