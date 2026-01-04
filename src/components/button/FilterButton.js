import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { elevation_5 } from '../../constants/styles'
import LinearGradient from 'react-native-linear-gradient';
import Foundation from 'react-native-vector-icons/Foundation';
import DarkView from '../modal/DarkView'
import DepartmentSelectionModal from '../modal/DepartmentSelectionModal'
import { FontFamily } from '../../constants/Fonts'

const FilterButton = ({
    bottom = ResponsiveSizeWp(15),
    style,
    selectedDepts = [],
    onDepartmentSelect,
    numOfFilter,
}) => {

    const [modalVisible, setModalVisibility] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(selectedDepts);

    const onApply = () => {
        setModalVisibility(false);
        onDepartmentSelect(selectedDepartment);
    };

    useEffect(() => { modalVisible && setSelectedDepartment(selectedDepts) }, [modalVisible])

    return (
        <>
            <TouchableOpacity
                style={[styles.Container, { bottom: bottom }, style && style, elevation_5]}
                onPress={() => setModalVisibility(true)}
            >

                <View style={[styles.ButtonStyle,]}>
                    <LinearGradient
                        colors={GRADIENTCOLOR.PRIMARY_100_8O_100}
                        style={[styles.GradientStyle, {
                            backgroundColor: COLOR.WHITE,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}
                        useAngle
                        angle={0}
                    >
                        <Foundation
                            color={COLOR.WHITE}
                            name='filter'
                            size={ResponsiveSizeWp(25)}
                        />
                    </LinearGradient>
                </View>
                {
                    numOfFilter &&
                    <View style={styles.NumOfFilter}>
                        <Text style={styles.NumOfFilterText}>
                            {numOfFilter}
                        </Text>
                    </View>
                }
            </TouchableOpacity>

            {modalVisible && <DarkView />}

            <DepartmentSelectionModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisibility}
                selected={selectedDepartment}
                onSelect={setSelectedDepartment}
                onApply={onApply}
            />
        </>
    )
}

export default FilterButton

const styles = StyleSheet.create({
    Container: {
        width: ResponsiveSizeWp(60),
        aspectRatio: 1 / 1,
        position: 'absolute',
        backgroundColor: COLOR.WHITE,
        alignSelf: 'flex-end',
        borderRadius: ResponsiveSizeWp(90),
        right: ResponsiveSizeWp(15),
    },
    GradientStyle: {
        width: '100%',
        aspectRatio: 1 / 1,
        borderRadius: ResponsiveSizeWp(100),
    },
    ButtonStyle: {
        width: '100%',
        aspectRatio: 1 / 1,
        alignSelf: 'center',
        borderRadius: ResponsiveSizeWp(100),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.WHITE,
        borderColor: COLOR.WHITE,
        borderWidth: ResponsiveSizeWp(2),
    },
    NumOfFilter: {
        backgroundColor: COLOR.WHITE,
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: ResponsiveSizeWp(30),
        padding: ResponsiveSizeWp(2),
        position: 'absolute',
        width: ResponsiveSizeWp(30),
        top: -ResponsiveSizeWp(5),
        right: -ResponsiveSizeWp(5),
    },
    NumOfFilterText: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(13),
        color: COLOR.PRIMARYBACK,
    }
})