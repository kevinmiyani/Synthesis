import { Animated, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useEffect, useRef, } from 'react'
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { FontFamily } from '../../constants/Fonts';

export default TabButton = ({
    icon,
    label,
    onPress,
    focused,
    buttonSize,
}) => {

    const _animation = useRef(new Animated.Value(focused ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(_animation, {
            toValue: focused ? 1 : 0,
            useNativeDriver: true,
            duration: 250,
        }).start();
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[
                styles.Button,
                { width: buttonSize, },
            ]}
        >
            <Animated.Image
                source={icon}
                style={[styles.Icon, {
                    tintColor: _animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [COLOR.WHITE, COLOR.ACTIVETABBACK],
                    }),
                }]}
            />

            <Animated.Text
                style={[styles.LabelStyle, focused && { color: COLOR.ACTIVETABBACK, }]}
                numberOfLines={1}
            >
                {label}
            </Animated.Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    Button: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    Icon: {
        width: ResponsiveSizeWp(25),
        height: ResponsiveSizeWp(20),
        resizeMode: 'contain',
        tintColor: COLOR.WHITE,
    },
    LabelStyle: {
        fontSize: ResponsiveSizeWp(15),
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        marginTop: ResponsiveSizeWp(7),
    }
})