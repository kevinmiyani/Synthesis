import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors';
import { SellersTabs } from '../constants/Helper';
import { FontFamily } from '../constants/Fonts';
import { ResponsiveSizeWp } from '../constants/Responsive';

const MenuStrip = ({
    tabs = SellersTabs,
    onTabPress,
    selected,
    textSize,
}) => {
    return (
        <View style={styles.Container}>
            {
                tabs.map((tab, i) => {
                    return (
                        <TouchableOpacity
                            style={[styles.Button, tab.key == selected.key && { borderBottomWidth: ResponsiveSizeWp(3), borderColor: COLOR.ACTIVETABBACK, }]}
                            onPress={() => {
                                onTabPress(tab);
                            }}
                            key={i}
                            activeOpacity={1}
                        >
                            <Text
                                numberOfLines={1}
                                style={[
                                    styles.ButtonText,
                                    textSize && { fontSize: textSize || ResponsiveSizeWp(19) },
                                    tab.key == selected.key && {
                                        color: COLOR.ACTIVETABBACK,
                                        fontFamily: FontFamily.Bold,
                                    },]}
                            >
                                {tab?.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default MenuStrip

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: ResponsiveSizeWp(15),
        marginBottom: ResponsiveSizeWp(10),
    },
    Button: {
        flex: 1,
        paddingVertical: ResponsiveSizeWp(8),
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: COLOR.GRAY,
        fontSize: ResponsiveSizeWp(19),
        fontFamily: FontFamily.Regular,
    },
    ActiveTab: {
        height: ResponsiveSizeWp(2),
        backgroundColor: COLOR.ACTIVETABBACK,
        position: 'absolute',
        zIndex: 100,
        bottom: -2,
        marginLeft: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(1),
    },
})