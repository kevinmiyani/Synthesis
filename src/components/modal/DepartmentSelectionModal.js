import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { useSelector } from 'react-redux';
import { reducers } from '../../redux/helper';
import { elevation_5 } from '../../constants/styles';

const DepartmentSelectionModal = ({
    modalVisible,
    setModalVisible,
    selected,
    onSelect,
    onApply,
}) => {

    const deptList = useSelector(state => state[reducers.DepartmentDataReducer]);

    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>

                <TouchableOpacity
                    style={[{ height: '100%', width: '100%', }]}
                    onPress={() => { setModalVisible(false) }}
                    activeOpacity={1}
                >

                </TouchableOpacity>
                <View style={[styles.Container, { backgroundColor: COLOR.WHITE }]}>
                    <View style={{
                        width: '100%',
                        paddingHorizontal: ResponsiveSizeWp(20),
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: ResponsiveSizeWp(20),
                    }}>
                        <Text style={styles.HeaderStyle}>Departments</Text>
                        <TouchableOpacity
                            style={[styles.DeptCard, {
                                backgroundColor: COLOR.BLACK,
                                borderColor: COLOR.WHITE,
                                paddingVertical: ResponsiveSizeWp(10),
                                paddingHorizontal: ResponsiveSizeWp(30),
                                borderRadius: ResponsiveSizeWp(15),
                            }, elevation_5]}
                            onPress={onApply}
                        >
                            <Text style={{
                                fontFamily: FontFamily.SemiBold,
                                fontSize: ResponsiveSizeWp(13),
                                color: COLOR.WHITE,
                            }}>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingHorizontal: ResponsiveSizeWp(15),
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        {
                            deptList?.map((dept, i) => {
                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.DeptCard,
                                            selected?.some((val) => val?.toLowerCase() == dept?.toLowerCase()) && { backgroundColor: COLOR.ACTIVETABBACK, borderColor: COLOR.ACTIVETABBACK, }
                                        ]}
                                        key={i}
                                        activeOpacity={1}
                                        onPress={() => {
                                            if (selected?.length == deptList?.length - 2) {
                                                onSelect(['ALL'])
                                            } else if (selected?.some((val) => val?.toLowerCase() == dept?.toLowerCase())) {
                                                selected?.length == 1 ? onSelect(['ALL']) : onSelect(selected?.filter((val) => val?.toLowerCase() != dept?.toLowerCase()));
                                            } else {
                                                selected?.includes('ALL') || dept == 'ALL' ? onSelect([dept]) : onSelect([...selected, dept]);
                                            }
                                        }}
                                    >
                                        <Text style={[styles.DeptName, selected?.some((val) => val?.toLowerCase() == dept?.toLowerCase()) && { color: COLOR.WHITE }]}>{dept}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default DepartmentSelectionModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    Container: {
        borderTopLeftRadius: ResponsiveSizeWp(30),
        borderTopRightRadius: ResponsiveSizeWp(30),
        paddingBottom: ResponsiveSizeWp(30),
        paddingTop: ResponsiveSizeWp(40),
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        minHeight: '50%',
        maxHeight: '75%',
        elevation: 5,
        shadowColor: COLOR.GRAY,
        shadowOffset: { height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderColor: COLOR.LIGHTGRAY,
        borderWidth: ResponsiveSizeWp(1),
    },
    HeaderStyle: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(20),
        color: COLOR.BLACK,
        flex: 1,
    },
    DeptCard: {
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
        paddingHorizontal: ResponsiveSizeWp(14),
        paddingVertical: ResponsiveSizeWp(8),
        margin: ResponsiveSizeWp(5),
        flexDirection: 'row',
    },
    DeptName: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(13),
        color: COLOR.BLACK,
    },
})
