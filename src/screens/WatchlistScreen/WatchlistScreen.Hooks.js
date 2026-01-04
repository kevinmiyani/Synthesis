import { useEffect, useState } from "react";
import { NavigationScreens } from "../../constants/Strings";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { getItemByStoreIdAPI, RemoveFromWatchlistAPI } from "../../api/utils";
import { ErrorToast, SuccessToast } from "../../constants/ToastMessage";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const seletedStore = useSelector(state => state[reducers.SelectedStoreDataReducer]);

    // UseStates
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [locationModalVisible, setLocationModalVisibility] = useState(false);

    // UseEffects
    useEffect(() => {
        if (seletedStore && seletedStore?.StoreId) {
            setLoading(true);
            fetchData();
        }
    }, [seletedStore])

    // Methods
    const onProductPress = (data) => {
        navigation.navigate(NavigationScreens.ProductScannerScreen, {
            perItemCode: data?.ItemCode,
            perItemName: data?.ItemName,
            perDept: data?.DepartmentName,
            perParent: NavigationScreens.WatchlistScreen,
        });
    }

    const fetchData = async () => {
        try {

            const params = {
                StoreId: seletedStore?.StoreId,
            }

            const res = await getItemByStoreIdAPI(authToken, params);

            setLoading(false);

            if (res && res?.data) {
                const data = res?.data;
                const msg = data?.message?.toString();
                if (data?.responseStatus == '200') {
                    setData(data?.responseData);
                } else {
                    setData([]);
                    // ErrorToast('Watchlist', msg);
                    setLoading(false);
                }
            } else {
                ErrorToast('Watchlist', 'Something went wrong.');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            if (error?.toString()?.includes('Network Error')) {
                ErrorToast('Network Error', 'No internet connection or weak signal.');
            } else {
                ErrorToast('Watchlist', error);
            }
            console.log(error);
        }
    }


    const onRemoveWatchListPress = async (code) => {
        try {
            const params = {
                StoreId: seletedStore?.StoreId,
                UPCCode: code,
            }

            const res = await RemoveFromWatchlistAPI(authToken, params);

            if (res && res?.data) {
                const resdata = res?.data;
                const msg = resdata?.message?.toString();
                if (resdata?.responseStatus == '200') {
                    // SuccessToast('Watchlist', msg);
                    setData(data?.filter((item) => item.ItemCode != code));
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

    return {
        navigation,
        loading,

        data,
        locationModalVisible, setLocationModalVisibility,

        onProductPress,
        onRemoveWatchListPress,

    };
}

export default useScreenHooks