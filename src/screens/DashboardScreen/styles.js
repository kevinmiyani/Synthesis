import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
        paddingTop: ResponsiveSizeWp(45),
    },
    HeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingHorizontal: ResponsiveSizeWp(15),
        paddingVertical: ResponsiveSizeWp(10),
        justifyContent: 'space-between',
        marginBottom: ResponsiveSizeWp(25),
    },
    SearchIcon: {
        resizeMode: "center",
        alignSelf: "center",
        tintColor: COLOR.WHITE,
    },
    HeaderInnerContainer: {
        paddingVertical: ResponsiveSizeWp(10),
        alignItems: 'center',
        backgroundColor: COLOR.LIGHTGRAY_2,
        paddingHorizontal: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(13),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
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
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        borderRadius: ResponsiveSizeWp(8),
        marginLeft: ResponsiveSizeWp(8),
        marginRight: ResponsiveSizeWp(4),
    },
    ProfileButton: {
        height: ResponsiveSizeWp(50),
        backgroundColor: COLOR.BLACK,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ResponsiveSizeWp(25),
    },
    SearchButton: {
        height: ResponsiveSizeWp(40),
        alignSelf: "center",
        backgroundColor: "#D6D6D6",
        padding: ResponsiveSizeWp(10),
        marginRight: ResponsiveSizeWp(10),
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
    Image: {
        width: ResponsiveSizeWp(20),
        aspectRatio: 1 / 1,
        tintColor: COLOR.BLACK,
    },
    ContentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: ResponsiveSizeWp(130),
        paddingHorizontal: ResponsiveSizeWp(15),
    },
    ContentHeaderStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: "flex-start",
    },
    UserNameContainer: {
        flex: 1,
        marginRight: ResponsiveSizeWp(10),
    },
    WelcomeText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
    },
    UserNameText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(26),
    },
    DateContaienr: {
        backgroundColor: COLOR.BLACK,
        borderRadius: ResponsiveSizeWp(70),
        marginTop: ResponsiveSizeWp(5),
        paddingVertical: ResponsiveSizeWp(6),
        paddingHorizontal: ResponsiveSizeWp(12),
    },
    DateText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(14),
    },
    ButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: ResponsiveSizeWp(5),
        marginTop: ResponsiveSizeWp(5),
    }
})
