import {
    View,
    StatusBar,
    Text,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import useScreenHooks from './PredictionsScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Entypo from 'react-native-vector-icons/Entypo';

const PredictionsScreen = (props) => {

    const {
        navigation,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>

            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            <View style={styles.HeaderContainer}>
                <TouchableOpacity
                    style={styles.BackButton}
                    onPress={() => navigation.pop(1)}
                >
                    <Entypo
                        name="chevron-left"
                        size={ResponsiveSizeWp(35)}
                        color={COLOR.BLACK}
                    />
                </TouchableOpacity>
                <Text style={styles.TitleText}>
                    Predictions
                </Text>
            </View>

            <View style={styles.EmptyContainer}>

                <Text style={styles.EmptyText}>Coming Soon</Text>

            </View>
        </View>
    )
}

export default PredictionsScreen