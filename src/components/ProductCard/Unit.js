import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily } from '../../constants/Fonts'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR } from '../../constants/Colors'

const Unit = ({
    title,
    yValue,
    wValue,
    mValue,
    yAvg,
    wAvg,
    mAvg,
    style,
}) => {
    return (
        <View style={[styles.Container, style && style]}>
            <View style={styles.TitleContainer}>
                <Text style={styles.HeaderText} numberOfLines={1}>
                    {title}
                </Text>
            </View>

            <View style={styles.UnitSoldValueContainer}>
                <View style={styles.UnitSoldContainer}>
                    <Text style={styles.UnitSoldTitle} numberOfLines={1}>
                        Yesterday
                    </Text>
                    <Text style={styles.UnitSoldValue} numberOfLines={1}>
                        {parseInt(yValue).toLocaleString()}
                    </Text>
                    <Text style={styles.UnitSoldAvgPrice} numberOfLines={1}>
                        $ {yAvg ? `${parseFloat(yAvg).toFixed(2).toString()}` : '0.0'}
                    </Text>
                </View>
                {/* <View style={styles.VerticalLine} /> */}
                <View style={styles.UnitSoldContainer}>
                    <Text style={styles.UnitSoldTitle} numberOfLines={1}>
                        Last Week
                    </Text>
                    <Text style={styles.UnitSoldValue} numberOfLines={1}>
                        {parseInt(wValue).toLocaleString()}
                    </Text>

                    <Text style={styles.UnitSoldAvgPrice} numberOfLines={1}>
                        $ {wAvg ? `${parseFloat(wAvg).toFixed(2).toString()}` : '0.0'}
                    </Text>
                </View>
                {/* <View style={styles.VerticalLine} /> */}
                <View style={styles.UnitSoldContainer}>
                    <Text style={styles.UnitSoldTitle} numberOfLines={1}>
                        Last Month
                    </Text>
                    <Text style={styles.UnitSoldValue} numberOfLines={1}>
                        {parseInt(mValue).toLocaleString()}
                    </Text>

                    <Text style={styles.UnitSoldAvgPrice} numberOfLines={1}>
                        $ {mAvg ? `${parseFloat(mAvg).toFixed(2).toString()}` : '0.0'}
                    </Text>
                </View>
            </View>

        </View>
    )
}

export default Unit

const styles = StyleSheet.create({
    Container: {
        marginTop: ResponsiveSizeWp(20),
        backgroundColor: COLOR.LIGHTGRAY,
        padding: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(10),
        paddingTop: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAY,
    },
    TitleContainer: {
        flexDirection: 'row',
        position: 'absolute',
        left: ResponsiveSizeWp(15),
        top: -ResponsiveSizeWp(12.5),
        height: ResponsiveSizeWp(25),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ResponsiveSizeWp(7),
        backgroundColor: COLOR.ACTIVETABBACK,
        paddingHorizontal: ResponsiveSizeWp(10),
    },
    HeaderText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(14),
    },
    UnitSoldValueContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: ResponsiveSizeWp(5),
    },
    UnitSoldContainer: {
        flex: 1,
        padding: ResponsiveSizeWp(5),
        alignItems: 'center',
    },
    UnitSoldTitle: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(14),
    },
    UnitSoldValue: {
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(16),
    },
    UnitSoldAvgPrice: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(14),
        marginTop: ResponsiveSizeWp(2),
        backgroundColor: COLOR.GRAY,
        borderRadius: ResponsiveSizeWp(6),
        overflow: 'hidden',
        paddingVertical: ResponsiveSizeWp(3),
        paddingHorizontal: ResponsiveSizeWp(5),
        width: 'auto',
    },
    VerticalLine: {
        height: '100%',
        marginHorizontal: ResponsiveSizeWp(10),
        width: ResponsiveSizeWp(1),
        backgroundColor: COLOR.LIGHTGRAYBORDER,
    }
})