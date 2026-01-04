import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { BottomTabHeight, ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
        paddingTop: ResponsiveSizeWp(50),
    },
    HeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: ResponsiveSizeWp(15),
        paddingVertical: ResponsiveSizeWp(10),
    },
    HeaderInnerContainer: {
        paddingVertical: ResponsiveSizeWp(10),
        alignItems: 'center',
        backgroundColor: COLOR.LIGHTGRAY_2,
        paddingHorizontal: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(13),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        paddingVertical: ResponsiveSizeWp(10),
    },
    Image: {
        width: ResponsiveSizeWp(20),
        aspectRatio: 1 / 1,
        tintColor: COLOR.BLACK,
    },
    WelcomeText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(22),
    },
    NameText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(25),
    },
    HeaderCenterText: {
        maxWidth: '70%',
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        overflow: 'hidden',
        borderRadius: ResponsiveSizeWp(8),
        marginLeft: ResponsiveSizeWp(8),
    },
    ProfileButton: {
        height: ResponsiveSizeWp(50),
        backgroundColor: COLOR.BLACK,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ResponsiveSizeWp(25),
    },
    ProfileText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(20),
        textTransform: 'uppercase',
    },
    EmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: (BottomTabHeight) - ResponsiveSizeWp(40),
    },
    EmptyText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(16),
        textAlign: 'center',
        maxWidth: '70%',
        lineHeight: ResponsiveSizeWp(25),
    },
    DataContainer: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
        marginTop: ResponsiveSizeWp(10),
    },
    DataContentContainer: {
        padding: ResponsiveSizeWp(15),
        paddingBottom: ResponsiveSizeWp(10),
    },
    ViewWrapper: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: COLOR.BLACK_30,
    },

    TitleText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(27),
        paddingHorizontal: ResponsiveSizeWp(15),
        marginBottom: ResponsiveSizeWp(7),
        marginTop: ResponsiveSizeWp(5),
    },
    HeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    BackButton: {
        paddingHorizontal: ResponsiveSizeWp(5),
    },
})