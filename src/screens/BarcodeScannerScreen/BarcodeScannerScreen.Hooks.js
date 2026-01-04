import { Animated, Platform } from "react-native";
import { NavigationScreens } from "../../constants/Strings";
import { useEffect, useRef, useState } from "react";
import { getItemByCodeAPI } from "../../api/utils";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { ErrorToast } from "../../constants/ToastMessage";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import { convertUpcEtoUpcA } from "../../constants/BarcodeConverter";
import { requestLocationPermission } from "../../constants/Helper";
import Geolocation from 'react-native-geolocation-service';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const userAccess = userData['UserRightsforStoreAccess'];
    const userId = userData?.UserId;
    const storeData = useSelector(state => state[reducers.SelectedStoreDataReducer]);
    const storeId = storeData?.StoreId;
    const focused = useIsFocused();

    // UseStates
    const animation = useRef(new Animated.Value(0)).current;
    const animationDuration = 700;
    const [animationType, setAnimationType] = useState(1);
    const [scanned, setScanned] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [currentLocation, setCurrentLoaction] = useState({ lat: 0, lng: 0 });

    // UseEffects
    useEffect(() => {
        getBarCodeScannerPermissions();
        userAccess != '2' && handleUserLocation();
    }, [])

    useEffect(() => {
        focused && setScanned(false);
    }, [focused])

    useEffect(() => {
        const id = setTimeout(() => {
            clearTimeout(id);
            setAnimationType(animationType == 1 ? 0 : 1);
        }, animationDuration);
        Animated.timing(animation, {
            toValue: animationType,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [animationType])

    function removeFirstDigit(number) {
        const numberStr = String(number);
        if (numberStr.length > 1) {
            return numberStr.substring(1);
        }
        return "0";
    }

    // Methods
    const handleBarcodeRead = (e) => {
        if (!scanned) {
            setScanned(true);
            const code = e.data.replace(/\s+/g, '');
            if (e.type == BarCodeScanner.Constants.BarCodeType.upc_e) {
                const upca = convertUpcEtoUpcA(code);
                console.log(`UPC-E : ${code}, UPC-A: ${upca}`);
                fetchData(upca);
            } else {
                if (Platform.OS === 'ios' && code.length === 13 && code?.charAt(0) === '0') {
                    const data = removeFirstDigit(code);
                    fetchData(data);
                } else {
                    fetchData(code);
                }
            }
        }
    };

    const fetchData = async (itemCode) => {
        try {

            const params = {
                ItemCode: itemCode,
                UserId: userId,
            }

            params['UserRightsforStoreAccess'] = userAccess;

            if (userAccess == '2') {
                params['ScannedStoreId'] = storeId;
                params['Latitude'] = 0;
                params['Longitude'] = 0;
            } else {
                params['ScannedStoreId'] = 0;
                params['Latitude'] = currentLocation.lat;
                params['Longitude'] = currentLocation.lng;
            }

            console.log('Scanner : ', params);

            const res = await getItemByCodeAPI(authToken, params);

            if (res && res?.data) {
                const data = res?.data;
                const msg = data?.message?.toString();
                if (data?.responseStatus == '200') {
                    navigation.navigate(NavigationScreens.ProductScannerScreen, {
                        perItemCode: itemCode,
                        perItemName: data?.responseData?.ItemName,
                        perDept: data?.responseData?.DepartmentName,
                        perData: data,
                        perParent: NavigationScreens.BarcodeScannerScreen,
                    })
                } else {
                    ErrorToast('Product', msg);
                    setScanned(false);
                }
            }
        } catch (error) {
            console.log(error);
            if (error?.toString()?.includes('Network Error')) {
                ErrorToast('Network Error', 'No internet connection or weak signal.');
            }
        }
    }

    const getBarCodeScannerPermissions = async () => {
        const granted = await BarCodeScanner.requestPermissionsAsync();
        setPermissionGranted(granted?.granted);
    };

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

    const onBackPress = () => navigation.pop(1);

    return {
        focused,
        navigation,
        animation,
        permissionGranted,

        scanned, setScanned,

        handleBarcodeRead,
        onBackPress,
    };
}

export default useScreenHooks