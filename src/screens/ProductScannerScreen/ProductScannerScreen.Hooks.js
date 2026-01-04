import { useEffect, useState } from "react";
import { AddToWatchlistAPI, getItemByCodeAPI, ReportIssueDumpAPI } from "../../api/utils";
import { useDispatch, useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";
import Share from 'react-native-share';
import { BarCodeScanner } from "expo-barcode-scanner";
import { AppState, BackHandler, Platform } from "react-native";
import { setRecentScanDataInRedux } from "../../redux/RecentScanData/RecentScanDataAction";
import { useLocation } from "../../context/LocationContext";
import DeviceInfo from "react-native-device-info";
import { requestLocationPermission } from "../../constants/Helper";;
import { navigationToReset } from "../../constants/NavigationController";
import { NavigationScreens } from "../../constants/Strings";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;

    const product = props.route.params?.perData;
    const perItemCode = props.route.params?.perItemCode;
    const perItemName = props.route.params?.perItemName;
    const perDept = props.route.params?.perDept;
    const perParent = props.route.params?.perParent;
    const perIsScanner = props.route.params?.perIsScanner;

    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const allStoreList = useSelector(state => state[reducers.StoreDataReducer]);
    const selectedData = useSelector(state => state[reducers.SelectedStoreDataReducer]);
    const recentScanData = useSelector(state => state[reducers.RecentScanDataReducer]);
    const selectedLocationStore = useSelector(state => state[reducers.SelectedStoreLocationDataReducer]);
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const userAccess = userData['UserRightsforStoreAccess'];
    const userId = userData?.UserId;
    const dispatch = useDispatch();
    const { location, locationAccess, setLocationAccess } = useLocation();
    const currentLocation = location ?? { lat: 0, lng: 0 };

    // UseStates
    const [selectedStore, setSelectedStore] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [allData, setAllData] = useState();
    const [itemName, setItemName] = useState(perItemName || '');
    const [itemCode, setItemCode] = useState(perItemCode || '');
    const [deptName, setDeptName] = useState(perDept || '');
    const [isScannerVisible, setIsScannerVisible] = useState(perIsScanner);
    const [storeList, setStoreList] = useState([]);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [images, setImages] = useState([]);
    const [frt, setFrt] = useState(false);
    const [edt, setEdt] = useState(false);
    const [spt, setSpt] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState({});
    const [isAppActive, setIsAppActive] = useState(true);
    const [reportModalVisible, setReportModalVisibility] = useState(false);
    const [reportSuccessModalVisible, setReportSuccessModalVisibility] = useState(false);

    // UseEffects
    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            setIsAppActive(nextAppState == 'active');
        });

        getDeviceInfo();
        if (product) {
            arrangeData(product);
        } else {
            itemCode && fetchData();
        }

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        isAppActive && checkForLocation();
        if (isScannerVisible && isAppActive) {
            !permissionGranted && getBarCodeScannerPermissions();
            if (!perIsScanner && Platform.OS == 'android') {
                BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
                return () => {
                    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
                };
            }
        }
    }, [isScannerVisible, isAppActive])

    // Methods
    const fetchData = async () => {
        try {
            setLoading(true);

            const params = {
                ItemCode: itemCode,
            }

            const res = await getItemByCodeAPI(authToken, params);

            setLoading(false);

            if (res && res?.data) {
                const data = res?.data;
                if (data?.responseStatus == '200') {
                    setItemName(data?.responseData?.ItemName);
                    setDeptName(data?.responseData?.DepartmentName);
                    arrangeData(data);
                }
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error?.toString()?.includes('Network Error')) {
                ErrorToast('Network Error', 'No internet connection or weak signal.');
            }
        }
    }

    const checkForLocation = async () => {
        const result = await requestLocationPermission();
        if (locationAccess !== result) {
            setLocationAccess(result);
            result == false && navigationToReset(navigation, NavigationScreens.DashboardScreen);
        }
    }

    const arrangeData = (data) => {
        setAllData(data?.responseData?.ItemDetails);
        data?.responseData?.ImageURLs?.length > 0 && setImages(data?.responseData?.ImageURLs);

        setItemName(data?.responseData?.ItemName);
        setDeptName(data?.responseData?.DepartmentName);

        const otherStores = Array.isArray(allStoreList) ? allStoreList.filter(store => store?.StoreId != selectedData?.StoreId) : [];
        const tempStores = selectedData ? [selectedData, ...otherStores] : [...otherStores];

        setStoreList(tempStores);
        setSelectedStore(tempStores[0]);
        const storeid = tempStores[0]?.StoreId;
        storeid && data?.responseData?.ItemDetails && data?.responseData?.ItemDetails?.length > 0 && setData(data?.responseData?.ItemDetails?.find((i) => i.StoreId == storeid));
        setIsScannerVisible(false);
    }

    const onBackPress = () => {
        perIsScanner ? setIsScannerVisible(true) : navigation.goBack();
    };

    const onTabSelect = (tab) => {
        setSelectedStore(tab);
        const storeid = tab?.StoreId;
        storeid && allData && allData?.length > 0 && setData(allData?.find((i) => i.StoreId == storeid));
    }

    const onAddWatchlistPress = async () => {
        try {
            if (!data) {
                ErrorToast('Product', 'Item not found.');
                return;
            }
            const params = data;
            params['UPCCode'] = itemCode;
            params['ProductName'] = itemName;
            params['DepartmentName'] = deptName;

            const res = await AddToWatchlistAPI(authToken, params);

            if (res && res?.data) {
                const resdata = res?.data;
                const msg = resdata?.message?.toString();
                if (resdata?.responseStatus == '200') {
                    SuccessToast('Watchlist', msg);
                }
            } else {
                ErrorToast('Watchlist', 'Something went wrong.');
            }
        } catch (error) {
            if (error?.toString()?.includes('Network Error')) {
                ErrorToast('Network Error', 'No internet connection or weak signal.');
            } else {
                ErrorToast('Watchlist', error);
            }
            console.log(error);
        }
    }

    const onSharePress = async (_container) => {
        _container?.current?.capture({
            format: "jpg",
            quality: 1,
        }).then(
            async (uri) => {
                await Share.open({ url: uri, }).catch((e) => { console.log(e) });
            },
            (error) => {
                console.log("Oops, snapshot failed", error);
            }
        )
    }

    const onScannerPress = () => setIsScannerVisible(true);

    const onScanned = (data) => {
        setItemName(data?.perItemName);
        setItemCode(data?.perItemCode);
        setDeptName(data?.perDept);
        arrangeData(data.perData);

        try {
            const product = {
                ItemCode: data?.perItemCode,
                ItemName: data?.perItemName,
                DepartmentName: data?.perDept,
                Count: 1
            };

            let newData = Array.isArray(recentScanData) ? [...recentScanData] : [];
            const existingProductIndex = newData.findIndex(pro => pro.ItemCode === product.ItemCode);

            if (existingProductIndex !== -1) {
                const updatedProduct = { ...newData[existingProductIndex], Count: newData[existingProductIndex].Count + 1 };
                newData.splice(existingProductIndex, 1);
                newData = [updatedProduct, ...newData];
            } else {
                newData = [product, ...newData];
            }

            if (newData.length > 50) {
                newData = newData.slice(0, 50);
            }

            dispatch(setRecentScanDataInRedux(newData));
        } catch (error) {
            console.log(error);
        }

    }

    const getBarCodeScannerPermissions = async () => {
        const granted = await BarCodeScanner.requestPermissionsAsync();
        setPermissionGranted(granted?.granted);
    };

    const handleBackButtonClick = () => {
        setIsScannerVisible(false)
        return true;
    }

    const getDeviceInfo = async () => {
        const data = {
            brand: await DeviceInfo.getBrand(),
            model: await DeviceInfo.getModel(),
            systemName: await DeviceInfo.getSystemName(),
            systemVersion: await DeviceInfo.getSystemVersion(),
            deviceId: await DeviceInfo.getDeviceId(),
            uniqueId: await DeviceInfo.getUniqueId(),
            appVersion: await DeviceInfo.getVersion(),
        }
        setDeviceInfo(data);
    }

    const onReportSubmit = async (data) => {
        try {
            const res = await ReportIssueDumpAPI(authToken, data);

            if (res && res?.data) {
                const resdata = res?.data;
                if (resdata?.responseStatus == '200') {
                    setReportSuccessModalVisibility(true);
                }
            } else {
                ErrorToast('Report An Issue', 'Something went wrong.');
            }
        } catch (error) {
            ErrorToast('Report An Issue', 'Something went wrong.');
            console.log(error);
        }
    }

    return {
        navigation,
        itemCode,
        authToken,
        storeList,
        itemName,
        deptName,
        perIsScanner,
        deviceInfo,
        dispatch,
        locationAccess,

        data,
        images,
        loading,
        userId,
        userAccess,
        permissionGranted,
        currentLocation,
        selectedData,
        selectedLocationStore,

        selectedStore, setSelectedStore,
        isScannerVisible, setIsScannerVisible,
        reportModalVisible, setReportModalVisibility,
        reportSuccessModalVisible, setReportSuccessModalVisibility,
        frt, setFrt,
        edt, setEdt,
        spt, setSpt,

        onBackPress,
        onTabSelect,
        onAddWatchlistPress,
        onSharePress,
        onScannerPress,
        onScanned,
        onReportSubmit,
    };
}

export default useScreenHooks