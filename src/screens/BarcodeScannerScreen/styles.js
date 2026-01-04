import { Dimensions, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { FontFamily } from '../../constants/Fonts';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    barcodeTextView: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLOR.BLACK,
        padding: ResponsiveSizeWp(10),
    },
    barcodeText: {
        fontSize: ResponsiveSizeWp(18),
        color: 'black',
        fontFamily: FontFamily.Medium,
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: ResponsiveSizeWp(100),
        backgroundColor: COLOR.BLACK,
    },
    TitleText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(23),
        fontFamily: FontFamily.Bold,
    },
    BarcodeScannerMainContainer: {
        height: width * 0.63,
        aspectRatio: 1 / 0.65,
        marginVertical: ResponsiveSizeWp(20),
        borderRadius: ResponsiveSizeWp(25),
        alignItems: 'center',
        padding: ResponsiveSizeWp(8),
        justifyContent: 'center',
    },
    WhiteStripStyle: {
        position: 'absolute',
        backgroundColor: COLOR.BLACK,
        height: '110%',
        width: '80%',
    },
    BarcodeScannerWhiteBoxStyle: {
        position: 'absolute',
        backgroundColor: COLOR.BLACK,
        height: '100%',
        width: '100%',
        borderRadius: ResponsiveSizeWp(16),
    },
    BarcodeScannerLineStyle: {
        position: 'absolute',
        backgroundColor: COLOR.ACTIVETABBACK,
        width: (width * 0.95) - ResponsiveSizeWp(35),
        height: ResponsiveSizeWp(4),
        borderRadius: ResponsiveSizeWp(20),
        zIndex: 100,
        top: ResponsiveSizeWp(30),
    },
    BackButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: ResponsiveSizeWp(5),
    },
    BackButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
    },
    ScanningText: {
        fontSize: ResponsiveSizeWp(16),
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
    },
    HeaderContainer: {
        position: 'absolute',
        flexDirection: 'row',
        marginTop: ResponsiveSizeWp(65),
        alignItems: 'center',
        width: '100%',
        paddingLeft: ResponsiveSizeWp(15),
        paddingRight: ResponsiveSizeWp(30),
        justifyContent: 'space-between',
    },
})