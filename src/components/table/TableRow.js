import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'

const TableRow = ({
    timePeriod,
    avgPrice,
    comPrice,
    unitSold,
}) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.LeftText} numberOfLines={1}>
                {timePeriod}
            </Text>
            <Text style={styles.RightText} numberOfLines={1}>
                {typeof (unitSold) == 'number' ? parseFloat(unitSold.toFixed(0)).toLocaleString() : '0'}
            </Text>
            <Text style={styles.CenterText} numberOfLines={1}>
                $ {typeof (avgPrice) == 'number' ? parseFloat(avgPrice.toFixed(2)).toLocaleString() : '0.0'}
            </Text>
            <Text style={styles.CenterText} numberOfLines={1}>
                $ {(typeof (avgPrice) == 'number' && typeof (comPrice) == 'number') ? parseFloat(comPrice.toFixed(2)).toLocaleString() : '0.0'}
            </Text>

        </View>
    )
}

export default TableRow

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        borderRadius: ResponsiveSizeWp(20),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ResponsiveSizeWp(10),
    },
    LeftText: {
        flex: 1.2,
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
        paddingHorizontal: ResponsiveSizeWp(10),
        fontSize: ResponsiveSizeWp(12),
    },
    CenterText: {
        flex: 1,
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        paddingHorizontal: ResponsiveSizeWp(10),
        fontSize: ResponsiveSizeWp(12),
        textAlign: 'center',
    },
    RightText: {
        flex: 1.2,
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        paddingHorizontal: ResponsiveSizeWp(10),
        fontSize: ResponsiveSizeWp(12),
        textAlign: 'center',
    }
})