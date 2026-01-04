import { Image, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { elevation_5 } from '../../constants/styles'
import { ScannerIcon } from '../../constants/Assets'
import LinearGradient from 'react-native-linear-gradient';

const FloatingScannerButton = ({
    onPress,
    bottom = ResponsiveSizeWp(15),
    style,
    iconStyle,
    disabled,
}) => {
    return (
        <View style={[styles.Container, { bottom: bottom }, style && style, disabled ? { opacity: 0.5, } : elevation_5]}>
            <LinearGradient
                colors={GRADIENTCOLOR.BUTTON}
                style={[styles.GradientStyle]}
                useAngle
                angle={135}
            >
                <TouchableOpacity
                    style={[styles.ButtonStyle,]}
                    onPress={onPress}
                    activeOpacity={1}
                    disabled={disabled}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.BLACK_100_8O_100}
                        style={[styles.GradientStyle, {
                            backgroundColor: COLOR.WHITE,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}
                        useAngle
                        angle={0}
                    >
                        <Image
                            source={ScannerIcon}
                            style={[styles.ScannerIcon, iconStyle && iconStyle]}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default FloatingScannerButton

const styles = StyleSheet.create({
    Container: {
        width: ResponsiveSizeWp(85),
        aspectRatio: 1 / 1,
        position: 'absolute',
        backgroundColor: COLOR.BLACK,
        alignSelf: 'center',
        borderRadius: ResponsiveSizeWp(90),
    },
    GradientStyle: {
        width: '100%',
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(100),
        padding: ResponsiveSizeWp(3),
    },
    ButtonStyle: {
        width: '100%',
        aspectRatio: 1 / 1,
        alignSelf: 'center',
        borderRadius: ResponsiveSizeWp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.BLACK,
    },
    ScannerIcon: {
        height: ResponsiveSizeWp(40),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
    }
})