import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'

const TableHeader = () => {
    return (
        <View style={styles.Container}>
            <Text style={styles.LeftText} numberOfLines={2}>Time Period</Text>
            <Text style={styles.RightText} numberOfLines={2}>Units Sold</Text>
            <Text style={styles.CenterText} numberOfLines={2}>{'WM\nAvg. Price'}</Text>
            <Text style={styles.CenterText} numberOfLines={2}>Comp. Price</Text>
        </View>
    )
}

export default TableHeader

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        borderRadius: ResponsiveSizeWp(100),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.BLACK,
        marginVertical: ResponsiveSizeWp(10),
    },
    LeftText: {
        flex: 1.2,
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(10),
    },
    CenterText: {
        flex: 1,
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(10),
        textAlign: 'center',
    },
    RightText: {
        flex: 1.2,
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(15),
        fontSize: ResponsiveSizeWp(10),
        textAlign: 'center',
    }
})