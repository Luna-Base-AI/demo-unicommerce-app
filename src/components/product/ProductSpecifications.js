import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../common/CustomText';
import { COLORS, SIZES, FONTS } from '../../utils/constants/theme';

const ProductSpecifications = ({ specifications }) => {
    return (
        <View style={styles.container}>
            {Object.entries(specifications).map(([key, value], index) => (
                <View
                    key={index}
                    style={[
                        styles.specRow,
                        index !== Object.keys(specifications).length - 1 && styles.borderBottom,
                    ]}
                >
                    <CustomText style={styles.specLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </CustomText>
                    <CustomText style={styles.specValue}>{value}</CustomText>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        padding: SIZES.base * 2,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SIZES.base,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    specLabel: {
        fontSize: SIZES.font,
        color: COLORS.gray,
        flex: 1,
    },
    specValue: {
        fontSize: SIZES.font,
        color: COLORS.dark,
        fontFamily: FONTS.medium,
        flex: 2,
        textAlign: 'right',
    },
});

export default ProductSpecifications;
