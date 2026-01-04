import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../constants/Responsive'
import { COLOR } from '../constants/Colors'
import { elevation_2 } from '../constants/styles'
import { FontFamily } from '../constants/Fonts'
import { NavigationScreens } from '../constants/Strings'
import { BarcodeIcon } from '../constants/Assets'

const Searchcard = ({
    data,
    navigation,
    screen,
}) => {

    const onCardPress = () => navigation.navigate(NavigationScreens.ProductScannerScreen, {
        perItemCode: data?.ItemCode,
        perItemName: data?.ItemName,
        perDept: data?.DepartmentName,
        perParent: screen,
    })

    return (
        <TouchableOpacity
            style={[styles.Container, elevation_2]}
            activeOpacity={1}
            onPress={onCardPress}
        >
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image
                    style={{
                        width: ResponsiveSizeWp(25),
                        aspectRatio: 1 / 1,
                        tintColor: COLOR.BLACK,
                        marginRight: 10
                    }}
                    source={BarcodeIcon}
                    resizeMode='contain'
                />
                <Text style={styles.UPCCODeText} numberOfLines={1}>
                    {data?.ItemCode}
                </Text>

            </View>

            <Text style={styles.ProductNameText} numberOfLines={2}>
                {data?.ItemName}
            </Text>

            <Text style={styles.DeptNameText} numberOfLines={2}>
                {data?.DepartmentName}
            </Text>

        </TouchableOpacity>
    )
}

export default Searchcard

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignSelf: "center",
        padding: ResponsiveSizeWp(20),
        // borderWidth: ResponsiveSizeWp(1),
        marginBottom: ResponsiveSizeWp(12),
        borderRadius: ResponsiveSizeWp(13),
        borderColor: COLOR.LIGHTGRAYBORDER,
        backgroundColor: COLOR.WHITE,
        flexDirection: "column",
        // borderStyle: 'dashed',
    },
    UPCCODeText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(20),
        textTransform: 'uppercase',
        flex: 1,
    },
    ProductNameText: {
        fontFamily: FontFamily.Regular,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(16),
        marginTop: ResponsiveSizeWp(5),
        textTransform: 'uppercase',
    },
    SellsValue: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(23),
    },
    DeptContainer: {
        backgroundColor: COLOR.BLACK_60,
        // position: 'absolute',
        // right: ResponsiveSizeWp(10),
        // top: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(20),
        paddingHorizontal: ResponsiveSizeWp(12),
        paddingVertical: ResponsiveSizeWp(4),
        // borderWidth: 1,
        // borderColor: COLOR.BLACK_20,
    },
    DeptNameText: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK_40,
        fontSize: ResponsiveSizeWp(13),
        textTransform: 'uppercase',
        marginTop: ResponsiveSizeWp(5),
    }
})