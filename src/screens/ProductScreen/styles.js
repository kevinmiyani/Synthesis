import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        paddingTop: ResponsiveSizeWp(45),
        paddingBottom: ResponsiveSizeWp(15),
    },
    HeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsiveSizeWp(15),
    },
    BackButton: {
        marginLeft: -ResponsiveSizeWp(5),
    },
    RightContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Image: {
        width: ResponsiveSizeWp(25),
        aspectRatio: 1 / 1,
        tintColor: COLOR.BLACK,
    },
    UPCCODeText: {
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(20),
        marginLeft: ResponsiveSizeWp(10),
    },
    CenterContainer: {
        flex: 1,
        marginVertical: ResponsiveSizeWp(15),
        // borderWidth: ResponsiveSizeWp(1),
        borderRadius: ResponsiveSizeWp(15),
        borderColor: COLOR.LIGHTGRAYBORDER,
        paddingHorizontal: ResponsiveSizeWp(15),
    },
    ProductNameText: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(20),
        textTransform: 'uppercase',
        paddingHorizontal: ResponsiveSizeWp(15),
    },
    BottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(15),
        marginRight: ResponsiveSizeWp(100),
    },
    WatchListButton: {
        height: ResponsiveSizeWp(40),
        aspectRatio: 1 / 1,
        backgroundColor: COLOR.LIGHTGRAY,
        borderRadius: ResponsiveSizeWp(30),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: ResponsiveSizeWp(5),
    },
    ForecastText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(14),
        textTransform: 'uppercase',
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
    },
    SuppliersText: {
        paddingHorizontal: ResponsiveSizeWp(15),
        color: COLOR.BLUE,
        fontSize: ResponsiveSizeWp(14),
        fontFamily: FontFamily.SemiBold,
        textDecorationLine: 'underline',
    },
    DeptNameText: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK_40,
        fontSize: ResponsiveSizeWp(13),
        textTransform: 'uppercase',
        maxWidth: '90%',
    },
})