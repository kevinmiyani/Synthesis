import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR } from '../constants/Colors';
import { ResponsiveSizeWp } from '../constants/Responsive';
import { FontFamily } from '../constants/Fonts';

const WarningCard = ({
    message,
    buttonText,
    style,
    buttonStyle,
    buttonTextStyle,
    messageTextStyle,
}) => {

    const onAllowPress = () => {
        try {
            Linking.openSettings();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={[styles.Container, style && style]}>
            <View style={styles.InnerContainer}>
                <AntDesign
                    name="warning"
                    size={ResponsiveSizeWp(40)}
                    color={COLOR.WHITE}
                />
                <Text style={[styles.MessageText, messageTextStyle && messageTextStyle]}>
                    {message}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.Button, buttonStyle && buttonStyle]}
                activeOpacity={0.8}
                onPress={onAllowPress}
            >
                <Text style={[styles.ButtonText, buttonTextStyle && buttonTextStyle]}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default WarningCard

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        backgroundColor: COLOR.BLACK,
        padding: ResponsiveSizeWp(20),
        borderRadius: ResponsiveSizeWp(15),
        marginBottom: ResponsiveSizeWp(5),
    },
    InnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    MessageText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(18),
        flex: 1,
        marginLeft: ResponsiveSizeWp(15),
    },
    Button: {
        backgroundColor: COLOR.WHITE,
        padding: ResponsiveSizeWp(5),
        marginTop: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(5),
        alignItems: 'center',
        width: '100%',
    },
    ButtonText: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(11),
    }
})