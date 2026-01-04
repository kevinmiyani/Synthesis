import {
    View,
    StatusBar,
    Text,
    Image,
    ImageBackground,
} from 'react-native'
import React from 'react'
import useScreenHooks from './SplashScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { AppLogo, SplashBackground } from '../../constants/Assets';

const SplashScreen = (props) => {

    const {
        navigation,
    } = useScreenHooks(props);

    return (
        <ImageBackground
            style={styles.Container}
            source={SplashBackground}
            imageStyle={{ opacity: 0.9 }}
            resizeMode='cover'
        >
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />
            <Image
                source={AppLogo}
                style={styles.AppLogo}
                resizeMode='contain'
            />
        </ImageBackground>
    )
}

export default SplashScreen