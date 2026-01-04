import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.BLACK,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    AppLogo: {
        width: '40%',
        aspectRatio: 1 / 1,
    }
})