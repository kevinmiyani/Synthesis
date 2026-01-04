import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import React from 'react'
import useScreenHooks from './DashboardScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import FloatingScannerButton from '../../components/button/FloatingScannerButton';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import LocationSelectionModal from '../../components/modal/LocationSelectionModal';
import LogoutModal from '../../components/modal/LogoutModal';
import { AddItemIcon, BBestSellersIcon, BSlowMoversIcon, BWatchlistIcon, FaceIDIcon, GeneratePOIcon, LocationIcon, LogoutIcon, ManageStockIcon, PredictionsIcon, SearchIcon, TouchIDIcon } from '../../constants/Assets';
import DashboardButton from '../../components/button/DashboardButton';
import { navigationToNavigate } from '../../constants/NavigationController';
import { NavigationScreens } from '../../constants/Strings';
import DarkView from '../../components/modal/DarkView';
import AppUpdateModal from '../../components/modal/AppUpdateModal';
import { FontFamily } from '../../constants/Fonts';
import { elevation_2 } from '../../constants/styles';
import BiometricsModal from '../../components/modal/BiometricsModal';
import OptionMenuModal from '../../components/modal/OptionMenuModal';
import OptionMenuButton from '../../components/button/OptionMenuButton';
import { BioType } from '../../constants/Helper';
import ToggleButton from '../../components/button/ToggleButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WarningCard from '../../components/WarningCard';

const DashboardScreen = (props) => {

    const {
        navigation,
        userData,
        selectedLocationStore,
        date,
        biometricsData,
        isLocationAccess,
        modalVisible,
        versionData,
        countdown,

        locationModalVisible, setLocationModalVisibility,
        logoutModalVisible, setLogoutModalVisibility,
        appUpdateModalVisible, setAppUpdateModalVisible,
        biometricsModalVisible, setBiometricsModalVisibility,
        optionModalVisible, setOptionModalVisibility,

        onScannerButtonPress,
        onSearchPress,
        onProfilePress,
        handleLogout,
        onRemindMePress,
        onUpdatePress,
        onEnableBiometricsPress,
        onNotNowPress,
        onScanHistoryPress,
        onAllowLocationPress,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />
            <View style={styles.HeaderContainer}>
                <View style={{ flex: 1, marginRight: ResponsiveSizeWp(10), }}>
                    {
                        Object.keys(selectedLocationStore)?.length > 0 &&
                        <View style={{ flexDirection: 'row', marginBottom: ResponsiveSizeWp(15), }}>
                            <TouchableOpacity
                                style={[styles.HeaderInnerContainer, { alignItems: 'center', flexDirection: 'row' }]}
                                disabled
                            >
                                <Image
                                    style={styles.Image}
                                    source={LocationIcon}
                                    resizeMode='contain'
                                />

                                <Text style={styles.HeaderCenterText} numberOfLines={1}>
                                    {selectedLocationStore && selectedLocationStore?.StoreNickName}
                                </Text>

                            </TouchableOpacity>
                        </View>
                    }
                    <View style={[styles.ContentHeaderStyle]}>
                        <View style={styles.UserNameContainer}>
                            <Text style={[styles.WelcomeText]} numberOfLines={1}>
                                Welcome
                            </Text>
                            <Text style={[styles.UserNameText]} numberOfLines={1}>
                                {userData?.Name}
                            </Text>
                            <View style={{ flexDirection: 'row', marginTop: ResponsiveSizeWp(5), }}>
                                <View style={styles.DateContaienr}>
                                    <Text style={[styles.DateText]} numberOfLines={1}>
                                        {date}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: 'center', }}>
                    <TouchableOpacity
                        style={styles.SearchButton}
                        onPress={onSearchPress}
                        disabled={isLocationAccess != true}
                    >
                        <Image
                            style={{
                                height: '100%',
                                aspectRatio: 1 / 1,
                                resizeMode: "contain",
                                tintColor: COLOR.BLACK,
                            }}
                            source={SearchIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.SearchButton, { padding: 0, }]}
                        onPress={onScanHistoryPress}
                        disabled={isLocationAccess != true}
                    >
                        <MaterialIcons
                            name="history"
                            size={ResponsiveSizeWp(28)}
                            color={COLOR.BLACK}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ProfileButton} onPress={onProfilePress}>
                        <Text style={styles.ProfileText} numberOfLines={1}>
                            {userData?.Name?.split(' ')?.length > 0 && userData?.Name?.split(' ')[0]?.charAt(0)}
                            {userData?.Name?.split(' ')?.length > 1 && userData?.Name?.split(' ')[1]?.charAt(0)}
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.ContentContainer}>

                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                    {
                        isLocationAccess != true &&
                        <WarningCard
                            message={'Location tracking is required to use this app.'}
                            buttonText={'ALLOW LOCATION TRACKING'}
                        />
                    }

                    <View style={styles.ButtonsContainer}>
                        <DashboardButton
                            text={'Add Item'}
                            icon={AddItemIcon}
                            color={COLOR.ACTIVETABBACK}
                            upcoming
                            disabled={isLocationAccess != true}
                        // onPress={() => navigationToNavigate(navigation, NavigationScreens.AddItemsScreen)}
                        />
                        <DashboardButton
                            text={'Manage Stock'}
                            icon={ManageStockIcon}
                            color={COLOR.ACTIVETABBACK}
                            // onPress={() => navigationToNavigate(navigation, NavigationScreens.ManageStockScreen)}
                            iconStyle={{
                                height: '50%',
                                marginTop: ResponsiveSizeWp(5),
                                right: ResponsiveSizeWp(3)
                            }}
                            upcoming
                            disabled={isLocationAccess != true}
                        />
                        <DashboardButton
                            text={'Generate PO'}
                            icon={GeneratePOIcon}
                            color={COLOR.ACTIVETABBACK}
                            upcoming
                            disabled={isLocationAccess != true}
                        // onPress={() => navigationToNavigate(navigation, NavigationScreens.GeneratePOScreen)}
                        />
                    </View>

                    <View style={styles.ButtonsContainer}>
                        <DashboardButton
                            text={'Watchlist'}
                            icon={BWatchlistIcon}
                            color={COLOR.ACTIVETABBACK}
                            onPress={() => navigationToNavigate(navigation, NavigationScreens.WatchlistScreen)}
                            disabled={isLocationAccess != true}
                        />

                        <DashboardButton
                            text={'Best Sellers'}
                            icon={BBestSellersIcon}
                            color={COLOR.ACTIVETABBACK}
                            onPress={() => navigationToNavigate(navigation, NavigationScreens.BestSellersScreen)}
                            disabled={isLocationAccess != true}
                        />

                        <DashboardButton
                            text={'Slow Movers'}
                            icon={BSlowMoversIcon}
                            color={COLOR.ACTIVETABBACK}
                            onPress={() => navigationToNavigate(navigation, NavigationScreens.SlowMoversScreen)}
                            disabled={isLocationAccess != true}
                        />
                    </View>

                </View>

            </View>

            <FloatingScannerButton
                bottom={ResponsiveSizeWp(20)}
                onPress={onScannerButtonPress}
                disabled={isLocationAccess != true}
            />

            <LocationSelectionModal
                modalVisible={locationModalVisible}
                setModalVisible={setLocationModalVisibility}
            />

            <LogoutModal
                modalVisible={logoutModalVisible}
                setModalVisible={setLogoutModalVisibility}
                navigation={navigation}
            />

            <AppUpdateModal
                title={versionData?.MessageTitle}
                desc={versionData?.Message}
                modalVisible={appUpdateModalVisible && !modalVisible}
                setModalVisible={setAppUpdateModalVisible}
                onRemindMePress={onRemindMePress}
                onUpdatePress={onUpdatePress}
                isForceUpdate={versionData?.ForceUpdate == 1}
            />

            <OptionMenuModal
                modalVisible={optionModalVisible}
                setModalVisible={setOptionModalVisibility}
            >
                {
                    biometricsData?.bioType &&
                    <OptionMenuButton
                        icon={biometricsData?.bioType == BioType.FaceID ? FaceIDIcon : TouchIDIcon}
                        text={`Enable ${biometricsData?.bioType}`}
                        disabled
                    >
                        <ToggleButton
                            value={biometricsData?.biometricsEnabled || false}
                            width={ResponsiveSizeWp(50)}
                            onPress={(value) => {
                                value ? onNotNowPress() : onEnableBiometricsPress();
                            }}
                        />
                    </OptionMenuButton>
                }

                <OptionMenuButton
                    icon={LogoutIcon}
                    onPress={() => {
                        setOptionModalVisibility(false);
                        setLogoutModalVisibility(true);
                    }}
                    text={'Logout'}
                />
            </OptionMenuModal>

            {
                biometricsModalVisible && !modalVisible &&
                <BiometricsModal
                    type={biometricsData?.bioType}
                    onEnablePress={onEnableBiometricsPress}
                    onNotNowPress={onNotNowPress}
                />
            }

            {
                modalVisible &&
                <View style={styless.centeredView}>
                    <View style={styless.modalView}>
                        <Text style={styless.modalText}>
                            You are not within radius of any of the allowed store.
                        </Text>
                        <Text style={styless.modalText}>
                            You will be logged out in {countdown} seconds.
                        </Text>
                        <TouchableOpacity
                            style={styless.logoutButton}
                            onPress={handleLogout}
                        >
                            <Text style={[styless.logoutButtonText, elevation_2]}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {(locationModalVisible || appUpdateModalVisible || modalVisible || optionModalVisible) && <DarkView />}
        </View>
    )
}

export default DashboardScreen

const styless = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
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
        marginBottom: ResponsiveSizeWp(10),
        textAlign: 'center',
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(15),
    },
    logoutButton: {
        backgroundColor: COLOR.ACTIVETABBACK,
        borderRadius: ResponsiveSizeWp(20),
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(40),
        marginTop: ResponsiveSizeWp(20),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE,
    },
    logoutButtonText: {
        textAlign: 'center',
        fontFamily: FontFamily.Bold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(14),
    },
});