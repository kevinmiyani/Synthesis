import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR } from '../../constants/Colors'
import { FontFamily } from '../../constants/Fonts'

const DashboardButton = ({
    text,
    onPress,
    icon,
    color,
    colors = [COLOR.TRANSPARANT, COLOR.TRANSPARANT],
    iconStyle,
    upcoming,
    disabled,
}) => {
    return (
        <LinearGradient
            colors={colors}
            style={[styles.Container, { backgroundColor: color }, disabled && { backgroundColor: COLOR.LIGHTGRAYBORDER }]}
            useAngle
            angle={135}
        >
            <TouchableOpacity
                style={styles.Button}
                onPress={onPress}
                activeOpacity={1}
                disabled={disabled}
            >
                <Image
                    style={[styles.Icon, iconStyle && iconStyle]}
                    source={icon}
                />
                <Text style={styles.TextStyle}>{text}</Text>
            </TouchableOpacity>
            {
                upcoming &&
                <View style={[styles.UpcomingContainer,]}>
                    <Text style={styles.UpcomingText}>Upcoming</Text>
                </View>
            }
        </LinearGradient>
    )
}

export default DashboardButton

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(18),
    },
    Button: {
        padding: ResponsiveSizeWp(15),
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        borderRadius: ResponsiveSizeWp(18),
    },
    IconCotainer: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(50),
        width: ResponsiveSizeWp(35),
        aspectRatio: 1 / 1,
        padding: ResponsiveSizeWp(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icon: {
        marginTop: ResponsiveSizeWp(10),
        height: '36%',
        resizeMode: 'contain',
        alignSelf: "center",
        tintColor: COLOR.WHITE,
    },
    TextStyle: {
        fontSize: ResponsiveSizeWp(13),
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        alignSelf: "center"
    },
    UpcomingContainer: {
        position: 'absolute',
        zIndex: 100,
        backgroundColor: COLOR.WHITE_20,
        right: ResponsiveSizeWp(3),
        top: ResponsiveSizeWp(3),
        paddingHorizontal: ResponsiveSizeWp(4),
        paddingVertical: ResponsiveSizeWp(2),
        borderBottomLeftRadius: ResponsiveSizeWp(5),
        borderTopRightRadius: ResponsiveSizeWp(15),
    },
    UpcomingText: {
        color: COLOR.WHITE_80,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(9),
    },
})