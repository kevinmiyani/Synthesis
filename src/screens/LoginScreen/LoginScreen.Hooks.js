import { useEffect, useState } from "react";
import { navigationToReset } from "../../constants/NavigationController";
import { NavigationScreens } from "../../constants/Strings";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";
import { LoginAPI } from "../../api/utils";
import { getBiometricsDetails, removeScanHistoryData, removeStoreListData, storeAuthID, storeBiometricsDetails, storeStoreListData, storeUserDetails } from "../../constants/AsyncStorage";
import { setAuthIDInRedux } from "../../redux/Authentication/AuthAction";
import { setUserDataInRedux } from "../../redux/UserData/UserDataAction";
import { useDispatch } from "react-redux";
import Geolocation from 'react-native-geolocation-service';
import { arrangeStoreData, BioType, requestLocationPermission } from "../../constants/Helper";
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import * as Sentry from "@sentry/react-native";
import { removeRecentScanDataFromRedux } from "../../redux/RecentScanData/RecentScanDataAction";

const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();

    // UseStates
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [currentLocation, setCurrentLoaction] = useState({ lat: 0, lng: 0 });
    const [errorMessage, setErrorMessage] = useState({});
    const [messageModalVisible, setMessageModalVisibility] = useState(false);
    const [biometricsData, setBiometricsData] = useState(null);

    // UseEffects
    useEffect(() => {
        getBiometricsData();
        handleUserLocation();
    }, []);

    // Methods
    const onLogin = async (username, password) => {
        try {
            setLoading(true);

            const formdata = new URLSearchParams({
                'UserName': username?.trim(),
                'Password': password?.trim(),
                'grant_type': 'password',
                'Latitude': currentLocation.lat,
                'Longitude': currentLocation.lng,
            })

            const res = await LoginAPI(formdata);

            setLoading(false);

            if (res && res?.data) {
                const data = res?.data;
                const msg = data?.message?.toString();
                if (data?.responseStatus == '200') {
                    const authToken = data?.Token;
                    const userData = data?.responseData || {};
                    arrangeStoreData(dispatch, userData?.StoreDetails || []);
                    await storeAuthID(authToken);
                    await storeUserDetails(userData);
                    await storeStoreListData(userData?.StoreDetails || []);
                    if (username != biometricsData?.username && password != biometricsData?.password) {
                        await rnBiometrics.isSensorAvailable()
                            .then(async (resultObject) => {
                                const { available, biometryType } = resultObject;
                                let type = '';
                                if (available && biometryType === BiometryTypes.TouchID) {
                                    type = BioType.TouchID;
                                } else if (available && biometryType === BiometryTypes.FaceID) {
                                    type = BioType.FaceID;
                                } else if (available && biometryType === BiometryTypes.Biometrics) {
                                    type = BioType.Fingerprint;
                                }
                                await removeScanHistoryData();
                                dispatch(removeRecentScanDataFromRedux());
                                await storeBiometricsDetails({
                                    username: username.trim(),
                                    password: password.trim(),
                                    biometricsEnabled: false,
                                    available: available,
                                    bioType: type,
                                })
                                await removeStoreListData();
                            })
                    }
                    // SuccessToast('Login', msg);
                    dispatch(setAuthIDInRedux(authToken));
                    dispatch(setUserDataInRedux(userData));
                    navigationToReset(navigation, NavigationScreens.DashboardScreen);
                } else if (data?.responseStatus == '400') {
                    setErrorMessage({
                        title: 'Access Denied',
                        desc: data?.message,
                    })
                    setTimeout(() => {
                        setMessageModalVisibility(true);
                    }, 100);
                    // ErrorToast('Access Denied', data?.message);
                } else {
                    ErrorToast('Login', msg);
                }
            } else {
                ErrorToast('Login', 'Something went wrong.');
            }
        } catch (error) {
            setLoading(false);
            ErrorToast('Login', error);
            console.log(error);
        }
    }

    const onLoginPress = () => {
        try {

            if (!username?.trim()) {
                ErrorToast('Username', 'Enter Username');
                return;
            }

            if (!password?.trim()) {
                ErrorToast('Password', 'Enter Password');
                return;
            }

            onLogin(username?.trim(), password?.trim());

        } catch (error) {
            setLoading(false);
            ErrorToast('Login', error);
            console.log(error);
        }
    }

    const handleUserLocation = async () => {
        const granted = await requestLocationPermission();
        granted && getCurrentLocation();
    }

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLoaction({
                    lat: latitude,
                    lng: longitude
                })
                console.log("Current Location : ", latitude, longitude);
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

    const getBiometricsData = async () => {
        const data = await getBiometricsDetails();
        data && setBiometricsData(data);
    }

    const onBiometricsPress = async () => {
        await rnBiometrics.simplePrompt({ promptMessage: `Login with ${biometricsData?.bioType}` })
            .then(async (resultObject) => {
                const { success } = resultObject;
                success && onLogin(biometricsData?.username, biometricsData?.password);
            }).catch((e) => {
                Sentry.captureMessage(`Biometrics Error: ${e}`);
            })
    }

    return {
        navigation,

        username, setUsername,
        password, setPassword,
        loading, setLoading,
        errorMessage, setErrorMessage,
        biometricsData, setBiometricsData,
        messageModalVisible, setMessageModalVisibility,

        onLoginPress,
        onBiometricsPress,
    };
}

export default useScreenHooks