import { useEffect, useRef, useState } from "react";
import { NavigationScreens } from "../../constants/Strings";
import { navigationToNavigate, navigationToReset, } from "../../constants/NavigationController";
import { useDispatch, useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { format } from "date-fns";
import { requestLocationPermission } from "../../constants/Helper";
import { removeAuthIDFromRedux } from "../../redux/Authentication/AuthAction";
import { removeUserDataFromRedux } from "../../redux/UserData/UserDataAction";
import { getBiometricsDetails, removeAuthID, removeUserDetails, storeBiometricsDetails } from "../../constants/AsyncStorage";
import Geolocation from 'react-native-geolocation-service';
import DeviceInfo from "react-native-device-info";
import { AppState, Linking, Platform } from "react-native";
import { removeStoreDataFromRedux } from "../../redux/StoreData/StoreDataAction";
import { removeSelectedStoreDataFromRedux } from "../../redux/SelectedStoreData/SelectedStoreDataAction";
import { getAppUpdateVersionAPI } from "../../api/utils";
import { removeSelectedStoreLocationDataFromRedux, setSelectedStoreLocationDataInRedux } from "../../redux/SelectedStoreLocationData/SelectedStoreLocationDataAction";
import { removeLocationStoreDataFromRedux } from "../../redux/LocationStoreData/LocationStoreDataAction";
import { useIsFocused } from "@react-navigation/native";
import { calculateDistance } from "../../constants/DistanceCalculator";
import ReactNativeBiometrics from 'react-native-biometrics';
import { useLocation } from "../../context/LocationContext";

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

const useScreenHooks = (props) => {

    // Variables
    const watchIdRef = useRef(null);
    const navigation = props.navigation;
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const locationStoreList = useSelector(state => state[reducers.LocationStoreDataReducer]);
    const seletedStore = useSelector(state => state[reducers.SelectedStoreDataReducer]);
    const selectedLocationStore = useSelector(state => state[reducers.SelectedStoreLocationDataReducer]);
    const dispatch = useDispatch();
    const date = format(new Date(), 'EEEE, d MMM').toString();
    const currentVersion = DeviceInfo.getVersion();
    const isFocused = useIsFocused();
    const { setLocation, setLocationAccess } = useLocation();

    // UseStates
    const [locationModalVisible, setLocationModalVisibility] = useState(false);
    const [logoutModalVisible, setLogoutModalVisibility] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [appUpdateModalVisible, setAppUpdateModalVisible] = useState(false);
    const [versionData, setVersionData] = useState(undefined);
    const [countdown, setCountdown] = useState(5);
    const [biometricsData, setBiometricsData] = useState(null);
    const [biometricsModalVisible, setBiometricsModalVisibility] = useState(false);
    const [optionModalVisible, setOptionModalVisibility] = useState(false);
    const [isLocationAccess, setIsLocationAccess] = useState(true);
    const [isAppActive, setIsAppActive] = useState(true);

    // UseEffects
    useEffect(() => {
        if (watchIdRef.current != null) {
            Geolocation?.clearWatch(watchIdRef.current);
            Geolocation?.stopObserving();
        }
        if (authToken && authToken !== '' && userData && isFocused && isAppActive) {
            handleUserLocation();
        } else {
            if (watchIdRef.current != null) {
                Geolocation?.clearWatch(watchIdRef.current);
                Geolocation?.stopObserving();
                watchIdRef.current = null;
                // console.log("Stopping location updates.");
            }
        }
        return () => {
            if (watchIdRef.current != null) {
                Geolocation?.clearWatch(watchIdRef.current);
                Geolocation?.stopObserving();
            }
        };
    }, [authToken, userData, locationStoreList, isFocused, isAppActive]);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            setIsAppActive(nextAppState == 'active');
        });

        // console.log(`${Platform.OS} App Current Version : ${currentVersion}`);
        setTimeout(() => {
            getBiometricsData();
        }, 100);
        getUpdates();

        return () => {
            subscription.remove();
        };
    }, [])

    useEffect(() => {
        let timer;
        if (modalVisible && countdown > 0) {
            // console.log("Starting countdown:", countdown);
            timer = setInterval(() => {
                setCountdown((prevCount) => {
                    // console.log("Countdown tick:", prevCount - 1);
                    return prevCount - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer) {
                // console.log("Clearing countdown timer");
                clearInterval(timer);
            }
        };
    }, [modalVisible, countdown]);

    useEffect(() => {
        if (modalVisible && countdown === 0) {
            // console.log("Countdown reached zero, calling handleLogout");
            handleLogout();
        }
    }, [countdown, modalVisible]);

    // Methods
    const onScannerButtonPress = () => navigation.navigate(NavigationScreens.ProductScannerScreen, { perIsScanner: true });

    const onProfilePress = () => setOptionModalVisibility(true);
    const onSearchPress = () => navigationToNavigate(navigation, NavigationScreens.SearchScreen);
    const onScanHistoryPress = () => navigationToNavigate(navigation, NavigationScreens.ScanHistoryScreen);

    const handleLogout = () => {
        setModalVisible(false);
        dispatch(removeAuthIDFromRedux());
        dispatch(removeStoreDataFromRedux());
        dispatch(removeSelectedStoreDataFromRedux());
        dispatch(removeLocationStoreDataFromRedux());
        dispatch(removeSelectedStoreLocationDataFromRedux());
        dispatch(removeUserDataFromRedux());
        removeAuthID();
        removeUserDetails();
        navigationToReset(navigation, NavigationScreens.LoginScreen);
    };

    const handleUserLocation = async () => {
        const granted = await requestLocationPermission();
        setIsLocationAccess(granted);
        setLocationAccess(granted);
        if (granted) {
            userData && userData?.UserRightsforStoreAccess != 1 && locationStoreList != null && getLiveLocation();
            userData && userData?.UserRightsforStoreAccess != 2 && getCurrentLocation();
        }
    };

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    lat: latitude,
                    lng: longitude
                })
                // console.log("Current Location : ", latitude, longitude);
            },
            (error) => {
                console.log("Current Location error:", error.code, error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 2000,
                maximumAge: 1000,
            }
        );
    }

    const getLiveLocation = async () => {
        const id = Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // console.log("Live Location : ", latitude, longitude);

                let isInRadius = false;
                var lessDistanceStore = selectedLocationStore;
                var lessDistance = null;

                const allDone = locationStoreList?.map((store, i) => {
                    const distance = calculateDistance(latitude, longitude, store.Latitude, store.Longitude);
                    const withinRadius = distance <= store.Radius;
                    if (distance < lessDistance || lessDistance == null) {
                        lessDistance = distance;
                        lessDistanceStore?.StoreId != store?.StoreId && (lessDistanceStore = store);
                    }
                    if (withinRadius == true && isInRadius == false) {
                        isInRadius = true;
                    }
                    // console.log(`Store Id : ${store.StoreId}, Within Radius : ${withinRadius}`);
                    // console.log(`Store Id : ${store.StoreId}, Distance : ${distance}`);
                })

                return Promise.all(allDone).then(() => {
                    isInRadius == false && setModalVisible(true);
                    (!selectedLocationStore || lessDistanceStore?.StoreId != selectedLocationStore?.StoreId) && dispatch(setSelectedStoreLocationDataInRedux(lessDistanceStore))
                })
            },
            (error) => {
                console.log("Live Location error:", error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 1000,
            }
        );
        watchIdRef.current = id;
    }

    const getUpdates = async () => {
        try {
            const res = await getAppUpdateVersionAPI(authToken, {
                VersionNumber: currentVersion,
                Type: Platform.OS,
            });
            if (res?.status == 200) {
                const data = res.data;
                if (data?.Type) {
                    setVersionData(data);
                    setAppUpdateModalVisible(true);
                } else {
                    setAppUpdateModalVisible(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onRemindMePress = () => {
        setAppUpdateModalVisible(false);
    }

    const onUpdatePress = () => {
        try {
            Linking.openURL(versionData?.Url);
        } catch (error) {
            console.log(error);
        }
    }

    const getBiometricsData = async () => {
        const data = await getBiometricsDetails();
        if (data) {
            setBiometricsModalVisibility(!data?.blocked && data?.available && !data?.biometricsEnabled);
            setBiometricsData(data);
        }
    }

    const onEnableBiometricsPress = async () => {
        await rnBiometrics.simplePrompt({ promptMessage: `Enable ${biometricsData?.bioType}` })
            .then(async (resultObject) => {
                const { success } = resultObject;
                if (success) {
                    const data = {
                        ...biometricsData,
                        biometricsEnabled: true,
                    };
                    await storeBiometricsDetails(data);
                    setBiometricsData(data);
                    setBiometricsModalVisibility(false);
                }
            }).catch(console.log)
    }

    const onNotNowPress = async () => {
        const data = {
            ...biometricsData,
            blocked: true,
            biometricsEnabled: false,
        }
        await storeBiometricsDetails(data);
        setBiometricsData(data);
        setBiometricsModalVisibility(false);
    }

    const onAllowLocationPress = () => {
        try {
            Linking.openSettings();
        } catch (error) {
            console.log(error);
        }
    }

    return {
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
    };
}

export default useScreenHooks