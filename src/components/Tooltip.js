import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ResponsiveSizeWp } from '../constants/Responsive'
import { COLOR } from '../constants/Colors'
import { FontFamily } from '../constants/Fonts'

const Tooltip = ({
    text,
    setVisible,
    style,
}) => {
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 2000);
    }, [])
    return (
        <View style={[styles.Container, style && style]}>
            <Text style={styles.Text}>{text}</Text>
        </View>
    )
}

export default Tooltip

const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: ResponsiveSizeWp(10),
        backgroundColor: COLOR.BLACK,
        borderRadius: ResponsiveSizeWp(30),
        position: 'absolute',
        alignSelf: 'center',
        paddingVertical: ResponsiveSizeWp(2),
        bottom: '110%',
        left: '50%',
        transform: [{ translateX: -ResponsiveSizeWp(30) }],
    },
    Text: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(10),
    }
})