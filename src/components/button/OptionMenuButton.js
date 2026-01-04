import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

const OptionMenuButton = ({
    icon,
    text,
    children,
    onPress,
    disabled,
}) => {
    return (
        <TouchableOpacity
            style={styles.Container}
            disabled={disabled}
            onPress={onPress}
        >
            {
                icon &&
                <Image
                    style={styles.IconStyle}
                    source={icon}
                />
            }
            <Text style={[styles.TextStyle, Platform.OS == 'android' && { bottom: ResponsiveSizeWp(1.2) }]}>{text}</Text>
            {children && children}
        </TouchableOpacity>
    )
}

export default OptionMenuButton

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: ResponsiveSizeWp(10),
        paddingVertical: ResponsiveSizeWp(10),
        gap: ResponsiveSizeWp(10),
    },
    TextStyle: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        flex: 1,
        color: COLOR.WHITE,
    },
    IconStyle: {
        width: ResponsiveSizeWp(25),
        aspectRatio: 1 / 1,
        tintColor: COLOR.WHITE,
    },
})