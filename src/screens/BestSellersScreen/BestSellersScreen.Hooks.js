import { useEffect, useState } from "react";
import { SellersTabs } from "../../constants/Helper";
import { getBestSellersAPI } from "../../api/utils";
import { useSelector } from "react-redux";
import { reducers } from "../../redux/helper";
import { ErrorToast } from "react-native-toast-message";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const seletedStore = useSelector(state => state[reducers.SelectedStoreDataReducer]);

    // UseStates
    const [seletedTabValue, setSelectedTabValue] = useState(SellersTabs[0]);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDepts, setSelectedDepts] = useState(['ALL']);
    const [locationModalVisible, setLocationModalVisibility] = useState(false);

    // UseEffects
    useEffect(() => {
        seletedStore && seletedStore?.StoreId && fetchData(selectedDepts);
    }, [seletedStore, selectedDepts])

    // Methods
    const fetchData = async (deps) => {
        try {
            setLoading(true);

            const params = {
                StoreId: seletedStore?.StoreId,
                DepartmentIds: deps?.includes('ALL') ? '' : deps?.toString(),
            }

            const res = await getBestSellersAPI(authToken, params);

            setLoading(false);

            if (res && res?.data) {
                const data = res?.data;
                const msg = data?.message?.toString();
                if (data?.responseStatus == '200') {
                    setData(data[seletedTabValue.key] || data?.YesterdayData);
                    setAllData(data);
                } else {
                    ErrorToast('Best Sellers', msg);
                }
            } else {
                ErrorToast('Best Sellers', 'Something went wrong.');
            }
        } catch (error) {
            setLoading(false);
            if (error?.toString()?.includes('Network Error')) {
                ErrorToast('Network Error', 'No internet connection or weak signal.');
            } else {
                ErrorToast('Best Sellers', error);
            }
            console.log(error);
        }
    }

    const onTabSelect = (tab) => {
        setSelectedTabValue(tab);
        setData(allData[tab?.key]);
    }

    return {
        navigation,
        seletedTabValue,
        data,
        loading,

        locationModalVisible, setLocationModalVisibility,
        selectedDepts, setSelectedDepts,

        onTabSelect,
    };
}

export default useScreenHooks