import { Text, Modal, StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { elevation_5 } from '../../constants/styles'
import { FontFamily } from '../../constants/Fonts'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'
import SelectionList from '../SelectionList'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux'
import { reducers } from '../../redux/helper'
import { ErrorToast } from '../../constants/ToastMessage'

const ReportIssueModal = ({
    itemCode,
    itemName,
    modalVisible,
    setModalVisible,
    onSubmit = () => { }
}) => {

    const issueList = useSelector((state) => state[reducers.IssueListDataReducer]);
    const userData = useSelector((state) => state[reducers.UserDataReducer]);
    const userName = userData?.Name;
    const userId = userData?.UserId;

    const [notes, setNotes] = useState('');
    const [selectedIssue, setSelectedIssue] = useState('');

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <KeyboardAvoidingView
                style={styles.ViewWrapper}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >

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
                    <View>
                        <ScrollView
                            contentContainerStyle={styles.ContentContainer}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                        >
                            <View style={styles.HeaderContainer}>
                                <Text style={styles.TitleText} numberOfLines={1}>Report an Issue</Text>
                                <TouchableOpacity
                                    style={styles.BackButton}
                                    onPress={() => { setModalVisible(false) }}
                                >
                                    <Ionicons
                                        name="close"
                                        size={ResponsiveSizeWp(30)}
                                        color={COLOR.BLACK}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.WhiteView, { marginTop: ResponsiveSizeWp(10), }]}>
                                <Text style={styles.ProductTitle}>FOR PRODUCT</Text>
                                <Text style={styles.ItemName}>{itemName}</Text>
                            </View>

                            <SelectionList
                                selected={selectedIssue}
                                onSelect={(data) => { setSelectedIssue(data?.ReportIssueOptionID) }}
                                placeholder={'Select An Issue'}
                                valueField={'ReportIssueOptionID'}
                                labelField={'ReportIssueOptions'}
                                search={false}
                                data={issueList}
                            />

                            <Text style={styles.FieldTitleText} numberOfLines={1}>Additional Notes</Text>

                            <TextInput
                                style={[styles.WhiteView, styles.InputView]}
                                value={notes}
                                onChangeText={setNotes}
                                keyboardType='default'
                                maxLength={300}
                                multiline
                            />

                            <TouchableOpacity
                                style={styles.SubmitButton}
                                onPress={() => {
                                    if (!selectedIssue) {
                                        ErrorToast('', 'Select An Issue');
                                        return;
                                    }
                                    onSubmit({
                                        ItemCode: itemCode,
                                        ItemName: itemName,
                                        ReportedOptionID: selectedIssue,
                                        AdditionalNotes: notes,
                                        UserName: userName,
                                        UserId: userId
                                    })
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.SubmitButtonText} numberOfLines={1}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default ReportIssueModal

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
        fontSize: ResponsiveSizeWp(25),
        flex: 1,
    },
    SubmitButton: {
        backgroundColor: COLOR.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
        padding: ResponsiveSizeWp(15),
        borderRadius: ResponsiveSizeWp(40),
    },
    SubmitButtonText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(16),
    },
    FieldTitleText: {
        fontFamily: FontFamily.Bold,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(17),
        marginBottom: -ResponsiveSizeWp(12),
    },
    WhiteView: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.LIGHTGRAYBORDER,
        padding: ResponsiveSizeWp(15),
    },
    InputView: {
        height: ResponsiveSizeWp(150),
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(15),
        textAlignVertical: 'top',
    },
    ItemName: {
        fontFamily: FontFamily.Medium,
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(20),
        marginTop: ResponsiveSizeWp(10),
    },
    ProductTitle: {
        backgroundColor: COLOR.BLACK,
        paddingVertical: ResponsiveSizeWp(5),
        paddingHorizontal: ResponsiveSizeWp(15),
        color: COLOR.WHITE,
        fontFamily: FontFamily.Bold,
        fontSize: ResponsiveSizeWp(12),
        borderRadius: ResponsiveSizeWp(12),
        overflow: 'hidden',
        position: 'absolute',
        top: -ResponsiveSizeWp(11),
        left: ResponsiveSizeWp(20),
    },
})