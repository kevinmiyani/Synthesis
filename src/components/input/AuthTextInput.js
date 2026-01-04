import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { ResponsiveSizeWp } from '../../constants/Responsive';

const AuthTextInput = ({
    value,
    onChangeText,
    isPasswordField,
    keyboardType,
    placeholder,
    maxLength,
    editable = true,
}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={[styles.Container]}>
            <TextInput
                style={[styles.InputTextStyle, editable == false && { color: COLOR.BLACK }]}
                placeholder={placeholder}
                placeholderTextColor={COLOR.GRAY}
                numberOfLines={1}
                keyboardType={keyboardType}
                secureTextEntry={isPasswordField && !passwordVisible}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                editable={editable}
                textContentType={'oneTimeCode'}
                autoCorrect={false}
                spellCheck={false}
            />
            {
                isPasswordField &&
                <TouchableOpacity
                    style={{ padding: ResponsiveSizeWp(12) }}
                    onPress={() => { setPasswordVisible(!passwordVisible) }}
                >
                    <Ionicons
                        name={passwordVisible ? 'eye' : 'eye-off'}
                        size={ResponsiveSizeWp(17)}
                        color={COLOR.ACTIVETABBACK}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

export default AuthTextInput

const styles = StyleSheet.create({
    Container: {
        borderRadius: ResponsiveSizeWp(7),
        height: ResponsiveSizeWp(45),
        marginTop: ResponsiveSizeWp(15),
        alignSelf: 'center',
        flexDirection: 'row',
        borderColor: COLOR.ACTIVETABBACK,
        backgroundColor: COLOR.WHITE,
        width: '100%',
        alignItems: 'center',
    },
    InputTextStyle: {
        flex: 1,
        fontSize: ResponsiveSizeWp(14),
        height: '100%',
        paddingHorizontal: ResponsiveSizeWp(15),
        color: COLOR.BLACK,
        borderRadius: ResponsiveSizeWp(7),
        fontFamily: FontFamily.Regular,
    },
})