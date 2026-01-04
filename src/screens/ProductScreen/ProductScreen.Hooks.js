import { useEffect, useState } from "react";
import { AddToWatchlistAPI, getItemByCodeAPI } from "../../api/utils";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";
import Share from 'react-native-share';
import { NavigationScreens } from "../../constants/Strings";
import { navigationToNavigate } from "../../constants/NavigationController";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const { itemCode, itemName, dept } = props.route.params;
    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const allStoreList = useSelector(state => state[reducers.StoreDataReducer]);
    const selectedData = useSelector(state => state[reducers.SelectedStoreDataReducer]);
    const product = props.route.params?.data;
    const parentScreen = props.route.params?.parent;

    // UseStates
    const [selectedStore, setSelectedStore] = useState();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [allData, setAllData] = useState();
    const [name, setName] = useState(itemName || '');
    const [deptName, setDeptName] = useState(dept || '');
    const [storeList, setStoreList] = useState([]);
    const [images, setImages] = useState('');
    const [frt, setFrt] = useState(false);
    const [edt, setEdt] = useState(false);
    const [spt, setSpt] = useState(false);

    // UseEffects
    useEffect(() => {
        console.log(parentScreen);
        if (product) {
            arrangeData(product);
        } else {
            itemCode && fetchData();
        }
    }, [itemCode])

    // useEffect(() => {
    //     !isFocused && resetData();
    // }, [isFocused])

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
                const msg = data?.message?.toString();
                if (data?.responseStatus == '200') {
                    setName(data?.responseData?.ItemName);
                    setDeptName(data?.responseData?.DepartmentName);
                    arrangeData(data);
                } else {
                    resetData();
                    ErrorToast('Product', msg);
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

    const arrangeData = (data) => {
        setAllData(data?.responseData?.ItemDetails);
        setImages(data?.ImageURL);

        setName(data?.responseData?.ItemName);
        setDeptName(data?.responseData?.DepartmentName);

        const otherStores = Array.isArray(allStoreList) ? allStoreList.filter(store => store?.StoreId != selectedData?.StoreId) : [];
        const tempStores = selectedData ? [selectedData, ...otherStores] : [...otherStores];

        setStoreList(tempStores);
        setSelectedStore(tempStores[0]);
        const storeid = tempStores[0]?.StoreId;
        storeid && data?.responseData?.ItemDetails && data?.responseData?.ItemDetails?.length > 0 && setData(data?.responseData?.ItemDetails?.find((i) => i.StoreId == storeid));
    }

    const onBackPress = () => navigation.pop(1);

    const onTabSelect = (tab) => {
        setSelectedStore(tab);
        const storeid = tab?.StoreId;
        storeid && allData && allData?.length > 0 && setData(allData?.find((i) => i.StoreId == storeid));
    }

    const resetData = () => {
        setAllData([]);
        setImages('');
        setData(undefined);
    }

    const onAddWatchlistPress = async () => {
        try {
            if (!data) {
                ErrorToast('Product', 'Item not found.');
                return;
            }
            const params = data;
            params['UPCCode'] = itemCode;
            params['ProductName'] = name;
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

    const onScannerPress = () => {
        // // console.log(navigation);
        // if (parentScreen === NavigationScreens.BarcodeScannerScreen) {
        //     navigation.goBack();
        // } else {
        navigationToNavigate(navigation, NavigationScreens.BarcodeScannerScreen)
        // }
    }

    return {
        navigation,
        itemCode,
        itemName,
        storeList,
        name,
        deptName,

        data,
        images,
        loading,
        selectedStore, setSelectedStore,
        frt, setFrt,
        edt, setEdt,
        spt, setSpt,

        onBackPress,
        onTabSelect,
        onAddWatchlistPress,
        onSharePress,
        onScannerPress,

    };
}

export default useScreenHooks