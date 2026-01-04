import { Animated, Dimensions, Image, PanResponder, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useRef } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR } from '../../constants/Colors'
import { elevation_2 } from '../../constants/styles'
import { ScannerIcon } from '../../constants/Assets'

const { width } = Dimensions.get('window');

const FloatingDraggableScannerButton = ({
    onPress,
    bottom = ResponsiveSizeWp(15),
}) => {

    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const lastPosition = useRef({ x: width / 2 + 10, y: 0 });

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            position.setValue({ x: lastPosition.current.x + gestureState.dx, y: 0 });
        },
        onPanResponderRelease: (_, gestureState) => {
            const { dx } = gestureState;
            const halfScreenWidth = width / 2;

            if (dx + lastPosition.current.x > halfScreenWidth - ResponsiveSizeWp(20)) {
                Animated.spring(position, {
                    toValue: { x: width - ResponsiveSizeWp(100), y: lastPosition.current.y },
                    useNativeDriver: true,
                    duration: 200,
                }).start(() => {
                    lastPosition.current = { x: width - ResponsiveSizeWp(80), y: lastPosition.current.y };
                });
            } else {
                Animated.spring(position, {
                    toValue: { x: 0, y: lastPosition.current.y },
                    useNativeDriver: true,
                    duration: 200,
                }).start(() => {
                    lastPosition.current = { x: 0, y: lastPosition.current.y };
                });
            }
        }
    });

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.Container, {
                bottom: bottom,
                transform: [...position.getTranslateTransform()],
            }, elevation_2,]}
        >
            <TouchableOpacity
                onPress={onPress}
                style={styles.ButtonStyle}
            >
                <Image
                    source={ScannerIcon}
                    style={styles.ScannerIcon}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default FloatingDraggableScannerButton

const styles = StyleSheet.create({
    Container: {
        height: ResponsiveSizeWp(70),
        aspectRatio: 1 / 1,
        position: 'absolute',
        backgroundColor: COLOR.ACTIVETABBACK,
        borderRadius: ResponsiveSizeWp(40),
        borderColor: COLOR.WHITE,
        borderWidth: ResponsiveSizeWp(2),
        justifyContent: 'center',
        alignItems: 'center',
        left: ResponsiveSizeWp(15),
    },
    ButtonStyle: {
        width: ResponsiveSizeWp(70),
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ScannerIcon: {
        height: ResponsiveSizeWp(35),
        aspectRatio: 1 / 1,
        resizeMode: 'contain',
    }
})