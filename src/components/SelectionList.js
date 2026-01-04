import { StyleSheet } from 'react-native'
import React, { memo, } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { COLOR } from '../constants/Colors';
import { ResponsiveSizeWp } from '../constants/Responsive';
import { FontFamily } from '../constants/Fonts';

const TextInputHeight = ResponsiveSizeWp(50);

const SelectionList = ({
    data = [],
    placeholder,
    selected,
    onSelect = () => { },
    style,
    disabled,
    search = true,
    valueField = 'id',
    labelField = 'name',
}) => {

    return (
        <Dropdown
            style={[
                styles.Container,
                style && style,
            ]}
            selectedTextStyle={[
                { color: disabled ? COLOR.BLACK_40 : COLOR.BLACK, fontSize: ResponsiveSizeWp(15), fontFamily: FontFamily.SemiBold, },
            ]}
            containerStyle={[
                styles.dropdownStyles,
            ]}
            itemTextStyle={[
                styles.dropdownTextStyles,
            ]}
            itemContainerStyle={[
                styles.dropdownItemStyles,
            ]}
            iconStyle={{
                height: ResponsiveSizeWp(25),
                tintColor: disabled ? COLOR.BLACK_40 : COLOR.BLACK,
            }}
            placeholderStyle={{
                fontSize: ResponsiveSizeWp(15),
                fontFamily: FontFamily.SemiBold,
                color: COLOR.BLACK,
            }}
            inputSearchStyle={styles.inputStyles}
            search={search}
            searchPlaceholder={'Search'}
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            value={selected}
            onChange={onSelect}
            dropdownPosition='auto'
            maxHeight={ResponsiveSizeWp(200)}
            activeColor={COLOR.WHITE}
            disable={disabled}
            showsVerticalScrollIndicator={true}
        />
    )
}

export default memo(SelectionList)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        height: TextInputHeight,
        backgroundColor: COLOR.WHITE,
        borderWidth: ResponsiveSizeWp(1),
        borderRadius: ResponsiveSizeWp(10),
        borderColor: COLOR.LIGHTGRAYBORDER,
        paddingHorizontal: ResponsiveSizeWp(15),
        fontFamily: FontFamily.SemiBold,
    },

    dropdownStyles: {
        paddingHorizontal: 0,
        fontFamily: FontFamily.SemiBold,
        paddingVertical: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(10),
        borderColor: COLOR.LIGHTGRAYBORDER,
        marginTop: ResponsiveSizeWp(5),
    },
    dropdownTextStyles: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(15),
        fontFamily: FontFamily.SemiBold,
    },
    dropdownItemStyles: {
        marginHorizontal: ResponsiveSizeWp(7),
        fontFamily: FontFamily.SemiBold,
        height: ResponsiveSizeWp(55)
    },
})