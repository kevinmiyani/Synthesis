import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp, screenHeight } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        backgroundColor: COLOR.WHITE,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackgroundImage: {
        flex: 1,
        position: 'absolute',
        zIndex: -100,
        height: '100%',
        width: '100%',
    },
    LoginContainer: {
        width: '80%',
        marginTop: ResponsiveSizeWp(100),
        marginVertical: ResponsiveSizeWp(50),
    },
    LogoImage: {
        height: ResponsiveSizeWp(100),
        width: ResponsiveSizeWp(100),
        borderRadius: ResponsiveSizeWp(50),
        alignSelf: 'center',
        position: 'absolute',
        top: -ResponsiveSizeWp(47),
        padding: 2,
        backgroundColor: 'rgba(35,31,32,1)',
    },
    LoginText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        alignSelf: 'center',
        fontSize: ResponsiveSizeWp(30),
        marginBottom: ResponsiveSizeWp(10),
    },
    LoginButton: {
        width: '100%',
        backgroundColor: COLOR.ACTIVETABBACK,
        marginTop: ResponsiveSizeWp(30),
        alignItems: 'center',
        justifyContent: 'center',
        padding: ResponsiveSizeWp(13),
        borderRadius: ResponsiveSizeWp(7),
    },
    LoginButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -10,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLOR.BLACK_40,
    },
    BioButton: {
        width: '80%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: ResponsiveSizeWp(12),
        borderRadius: ResponsiveSizeWp(30),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE_50,
        top: screenHeight - ResponsiveSizeWp(100),
        flexDirection: 'row',
        gap: ResponsiveSizeWp(10),
    },
    BioButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(15),
    },
})