import { Text, Modal, StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { elevation_5 } from '../../constants/styles'
import { FontFamily } from '../../constants/Fonts'
import { NavigationScreens } from '../../constants/Strings'
import { navigationToReset } from '../../constants/NavigationController'
import { useDispatch } from 'react-redux'
import { removeAuthIDFromRedux } from '../../redux/Authentication/AuthAction'
import { removeUserDataFromRedux } from '../../redux/UserData/UserDataAction'
import { removeAuthID, removeUserDetails } from '../../constants/AsyncStorage'
import { removeStoreDataFromRedux, setStoreDataInRedux } from '../../redux/StoreData/StoreDataAction'
import { removeSelectedStoreDataFromRedux } from '../../redux/SelectedStoreData/SelectedStoreDataAction'
import { removeLocationStoreDataFromRedux } from '../../redux/LocationStoreData/LocationStoreDataAction'
import { removeSelectedStoreLocationDataFromRedux } from '../../redux/SelectedStoreLocationData/SelectedStoreLocationDataAction'

const LogoutModal = ({
    modalVisible,
    setModalVisible,
    navigation,
}) => {

    const dispatch = useDispatch();

    const onLogoutPress = () => {
        setModalVisible(false);
        dispatch(removeAuthIDFromRedux());
        dispatch(removeUserDataFromRedux());
        dispatch(removeStoreDataFromRedux());
        dispatch(removeLocationStoreDataFromRedux());
        dispatch(removeSelectedStoreDataFromRedux());
        dispatch(removeSelectedStoreLocationDataFromRedux());
        removeAuthID();
        removeUserDetails();
        navigationToReset(navigation, NavigationScreens.LoginScreen);
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={[styles.Container, elevation_5]}>
                    <Text style={styles.LogoutText}>
                        Logout
                    </Text>

                    <Text style={styles.LogoutDescText}>
                        {`Are you sure you want to logout?`}
                    </Text>

                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity
                            style={styles.Button}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.ButtonText}>
                                No
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.Button}
                            onPress={onLogoutPress}
                        >
                            <Text style={[styles.ButtonText, { color: COLOR.ACTIVETABBACK }]}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LogoutModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
        paddingHorizontal: ResponsiveSizeWp(40),
    },
    Container: {
        borderRadius: ResponsiveSizeWp(25),
        width: '100%',
        padding: ResponsiveSizeWp(27),
        backgroundColor: COLOR.MODALBACK,
    },
    LogoutText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(25),
        color: COLOR.BLACK,
    },
    LogoutDescText: {
        marginVertical: ResponsiveSizeWp(20),
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(17),
        color: COLOR.BLACK,
    },
    ButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    Button: {
        padding: ResponsiveSizeWp(10),
        marginLeft: ResponsiveSizeWp(10),
    },
    ButtonText: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.GRAY,
    },
})