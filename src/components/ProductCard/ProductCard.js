import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR } from '../../constants/Colors'
import { elevation_5 } from '../../constants/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontFamily } from '../../constants/Fonts'
import Unit from './Unit'
import { BarcodeIcon } from '../../constants/Assets'

const ProductCard = ({
    data,
    onPress,
    onWatchPress,
}) => {
    return (
        <TouchableOpacity
            style={[styles.Container, elevation_5]}
            onPress={() => { onPress(data) }}
            activeOpacity={1}
        >
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    style={styles.Image}
                    source={BarcodeIcon}
                    resizeMode='contain'
                />
                <Text style={styles.UPCCODeText} numberOfLines={1}>
                    {data?.ItemCode}
                </Text>
                <TouchableOpacity
                    style={styles.WatchListButton}
                    onPress={() => { onWatchPress(data?.ItemCode) }}
                >
                    <MaterialCommunityIcons
                        name={'bookmark-minus'}
                        size={ResponsiveSizeWp(22)}
                        color={COLOR.BLACK}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.DeptNameText} numberOfLines={2}>
                {data?.DepartmentName}
            </Text>

            <Text style={styles.ProductNameText} numberOfLines={2}>
                {data?.ItemName}
            </Text>

            <Unit
                title={'Units Sold'}
                yValue={data?.YesterdayQty}
                wValue={data?.LastWeekQty}
                mValue={data?.Last30DaysQty}
                yAvg={data?.YesterdayAvgPrice}
                wAvg={data?.LastWeekAvgPrice}
                mAvg={data?.Last30DaysAvgPrice}
                style={{ marginBottom: 0 }}
            />

        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        padding: ResponsiveSizeWp(20),
        // borderWidth: ResponsiveSizeWp(1),
        marginBottom: ResponsiveSizeWp(11),
        borderRadius: ResponsiveSizeWp(14),
        borderColor: COLOR.LIGHTGRAYBORDER,
        backgroundColor: COLOR.WHITE,
        // borderStyle: 'dashed',
    },
    Image: {
        width: ResponsiveSizeWp(25),
        aspectRatio: 1 / 1,
        tintColor: COLOR.BLACK,
    },
    UPCCODeText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(19),
        marginLeft: ResponsiveSizeWp(7),
        flex: 1,
    },
    WatchListButton: {
        width: ResponsiveSizeWp(40),
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.LIGHTGRAY,
        borderRadius: ResponsiveSizeWp(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProductNameText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(18),
        textTransform: 'uppercase',
        marginBottom: ResponsiveSizeWp(15),
        marginTop: ResponsiveSizeWp(5),
    },
    UnitSoldValue: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(23),
    },
    DeptNameText: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK_40,
        fontSize: ResponsiveSizeWp(13),
        textTransform: 'uppercase',
        marginTop: ResponsiveSizeWp(5),
    }
})