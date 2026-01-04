import { Text, Modal, StyleSheet, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { elevation_5 } from '../../constants/styles'
import { FontFamily } from '../../constants/Fonts'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { reducers } from '../../redux/helper'

const ReportIssueSuccessModal = ({
    modalVisible,
    setModalVisible = () => { }
}) => {

    const userName = useSelector((state) => state[reducers.UserDataReducer])?.Name;

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>

                <TouchableOpacity style={styles.ModalWrapper} onPress={() => { setModalVisible(false) }} />

                <View style={[styles.Container]}>
                    <BlurView
                        style={[styles.absolute]}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                    >
                        <LinearGradient
                            colors={GRADIENTCOLOR.WHITE_70_80}
                            style={{ width: '100%', height: '100%', }}
                            useAngle
                            angle={90}
                        >
                        </LinearGradient>
                    </BlurView>
                    <View style={styles.ContentContainer}>

                        <Text style={styles.TitleText}>{`Thank you ${userName} for your report!`}</Text>

                        <Text style={styles.FieldTitleText}>We value your feedback. Our team will investigate and update the product information if needed.</Text>

                        <TouchableOpacity
                            style={styles.SubmitButton}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.SubmitButtonText} numberOfLines={1}>Contiue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ReportIssueSuccessModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
        paddingHorizontal: ResponsiveSizeWp(20),
    },
    ModalWrapper: {
        zIndex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    HeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'visible',
    },
    Container: {
        borderRadius: ResponsiveSizeWp(20),
        width: '100%',
        zIndex: 10,
        overflow: 'hidden',
    },
    ContentContainer: {
        padding: ResponsiveSizeWp(25),
        gap: ResponsiveSizeWp(20),
    },
    TitleText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(24),
    },
    SubmitButton: {
        backgroundColor: COLOR.ACTIVETABBACK,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: ResponsiveSizeWp(40),
        alignSelf: 'center',
        paddingHorizontal: ResponsiveSizeWp(40),
        paddingVertical: ResponsiveSizeWp(10),
        marginTop: ResponsiveSizeWp(15),
    },
    SubmitButtonText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(16),
    },
    FieldTitleText: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
    },
})