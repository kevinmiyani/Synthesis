import { ScrollView, StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors';
import { FontFamily } from '../constants/Fonts';
import { ResponsiveSizeWp } from '../constants/Responsive';
import { elevation_2 } from '../constants/styles';

const StoreMenuStrip = ({
    onTabPress,
    selected,
    data,
}) => {
    return (
        <ScrollView
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {
                data?.map((tab, i) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.Button,
                                tab?.StoreId == selected?.StoreId && { backgroundColor: COLOR.ACTIVETABBACK, borderWidth: 1, borderColor: COLOR.WHITE, },
                                tab?.StoreId == selected?.StoreId && elevation_2,
                            ]}
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
                                    tab?.StoreId == selected?.StoreId && {
                                        color: COLOR.WHITE,
                                        fontFamily: FontFamily.Bold,
                                    }]}
                            >
                                {tab?.StoreNickName}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}

export default StoreMenuStrip

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        flexGrow: 0,
        marginTop: ResponsiveSizeWp(7),
    },
    ContentContainer: {
        paddingVertical: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(15),
    },
    Button: {
        paddingVertical: ResponsiveSizeWp(7),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ResponsiveSizeWp(30),
        paddingHorizontal: ResponsiveSizeWp(10),
    },
    ButtonText: {
        color: COLOR.GRAY,
        fontSize: ResponsiveSizeWp(14),
        fontFamily: FontFamily.Regular,
    },
})