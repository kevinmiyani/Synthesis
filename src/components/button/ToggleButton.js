
import { Animated, StyleSheet, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';

const ToggleButton = ({
    width,
    value,
    onPress,
}) => {

    const Time = useRef(new Animated.Value(value ? 0 : 1)).current;

    const startAnimation = () => {
        Animated.timing(Time, {
            toValue: value ? 1 : 0,
            duration: 250,
            useNativeDriver: false,
        }).start();
    }

    useEffect(() => { startAnimation() }, [value])

    return (
        <View style={[
            { width: width, }
        ]}>
            <TouchableOpacity
                style={[styles.Button, {
                    borderColor: COLOR.LIGHTGRAYBORDER,
                    borderWidth: ResponsiveSizeWp(1),
                }]}
                activeOpacity={1}
                onPress={() => onPress(value)}
            >
                {/* Main Circle */}
                <Animated.View
                    style={[
                        styles.Circle, {
                            width: (width * 0.5) - ResponsiveSizeWp(3),
                            backgroundColor: Time.interpolate({
                                inputRange: [0, 1],
                                outputRange: [COLOR.RED, COLOR.GREEN]
                            }),
                            transform: [{
                                translateX: Time.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [ResponsiveSizeWp(0.5), (width * 0.5)]
                                })
                            }]
                        },
                    ]} >

                </Animated.View>

            </TouchableOpacity>
        </View>
    )
}

export default ToggleButton

const styles = StyleSheet.create({

    Button: {
        aspectRatio: 2 / 1,
        justifyContent: 'center',
        borderRadius: ResponsiveSizeWp(300),
        zIndex: -10,
    },
    Circle: {
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(200),
        zIndex: 100,
    },
})