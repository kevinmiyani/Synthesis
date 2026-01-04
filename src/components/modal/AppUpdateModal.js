import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_2 } from '../../constants/styles';
import { WMLogo } from '../../constants/Assets';

const AppUpdateModal = ({
    title,
    desc,
    modalVisible,
    onUpdatePress,
    onRemindMePress,
    isForceUpdate,
}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image
                        style={{
                            height: ResponsiveSizeWp(90),
                            aspectRatio: 1 / 1,
                            borderRadius: ResponsiveSizeWp(50),
                            marginBottom: ResponsiveSizeWp(25),
                        }}
                        source={WMLogo}
                    />
                    <Text style={styles.headerText}>
                        {title}
                    </Text>
                    <Text style={styles.modalText}>
                        {desc}
                    </Text>
                    {
                        !isForceUpdate &&
                        <TouchableOpacity
                            style={[styles.logoutButton, elevation_2, { backgroundColor: COLOR.BLACK }]}
                            onPress={onRemindMePress}
                        >
                            <Text style={[styles.logoutButtonText,]}>Remind Me Later</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity
                        style={[styles.logoutButton, elevation_2]}
                        onPress={onUpdatePress}
                    >
                        <Text style={[styles.logoutButtonText,]}>Update Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(30),
        paddingTop: ResponsiveSizeWp(40),
        alignItems: 'center',
        width: '85%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: ResponsiveSizeWp(20),
        textAlign: 'center',
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(15),
    },
    headerText: {
        marginBottom: ResponsiveSizeWp(10),
        textAlign: 'center',
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
    },
    logoutButton: {
        width: '100%',
        backgroundColor: COLOR.ACTIVETABBACK,
        borderRadius: ResponsiveSizeWp(20),
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(40),
        marginTop: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE,
    },
    logoutButtonText: {
        textAlign: 'center',
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(13),
    },
});

export default AppUpdateModal;