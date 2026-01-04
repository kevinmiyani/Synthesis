import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'
import { BottomTabHeight, ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts'

export const styles = StyleSheet.create({
    BackButton: {
        paddingHorizontal: ResponsiveSizeWp(5),
    },
    Container: {
        flex: 1,
        backgroundColor: COLOR.LIGHTGRAY,
        paddingTop: ResponsiveSizeWp(45),
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
    ContentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingBottom: ResponsiveSizeWp(130),
        paddingHorizontal: ResponsiveSizeWp(15),
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
    },
})
