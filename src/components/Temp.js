import {
    Animated,
} from 'react-native'
import React, { useRef } from 'react'
import Icon from 'react-native-vector-icons/Octicons';

const Temp = () => {

    const animatedValue = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [
            {
                rotate: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                }),
            },
        ],
    };

    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    return (
        <AnimatedIcon
            name="home"
            size={60}
            color="#FFF"
            style={animatedStyle}
            onPress={startAnimation}
        />
    )
}

export default Temp