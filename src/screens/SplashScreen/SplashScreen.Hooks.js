import { useEffect } from "react";
import { NavigationScreens } from "../../constants/Strings";
import { navigationToReplace } from "../../constants/NavigationController";
import { useDispatch } from "react-redux";
import { getAuthID, getScanHistoryData, getUserDetails, removeAuthID, removeUserDetails, storeStoreListData, storeUserDetails } from "../../constants/AsyncStorage";
import { removeAuthIDFromRedux, setAuthIDInRedux } from "../../redux/Authentication/AuthAction";
import { removeUserDataFromRedux, setUserDataInRedux } from "../../redux/UserData/UserDataAction";
import { getUserDetailAPI } from "../../api/utils";
import { removeStoreDataFromRedux } from "../../redux/StoreData/StoreDataAction";
import { removeLocationStoreDataFromRedux } from "../../redux/LocationStoreData/LocationStoreDataAction";
import { removeSelectedStoreDataFromRedux } from "../../redux/SelectedStoreData/SelectedStoreDataAction";
import { removeSelectedStoreLocationDataFromRedux } from "../../redux/SelectedStoreLocationData/SelectedStoreLocationDataAction";
import { setRecentScanDataInRedux } from "../../redux/RecentScanData/RecentScanDataAction";
import { arrangeStoreData } from "../../constants/Helper";

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();

    // UseStates


    // UseEffects
    useEffect(() => {
        getDataFromStorage();
    }, [])

    // Methods
    const getDataFromStorage = async () => {
        const authToken = await getAuthID();
        const userData = await getUserDetails();
        const isFound = userData && authToken && await getUserData(userData, authToken);
        if (isFound && userData && authToken) {
            dispatch(setAuthIDInRedux(authToken));
            setTimeout(() => {
                navigationToReplace(navigation, NavigationScreens.DashboardScreen);
            }, 1000);
        } else {
            onNotFound();
            setTimeout(() => {
                navigationToReplace(navigation, NavigationScreens.LoginScreen);
            }, 1000);
        }
        const recentScanData = await getScanHistoryData();
        dispatch(setRecentScanDataInRedux(recentScanData));
    }

    const getUserData = async (userData, authToken) => {
        try {
            const res = await getUserDetailAPI(authToken, {
                UserId: userData?.UserId
            });
            if (res?.status == 200) {
                const data = res?.data?.responseData;
                if (data) {
                    dispatch(setUserDataInRedux(data));
                    arrangeStoreData(dispatch, data?.StoreDetails || []);
                    await storeUserDetails(data);
                    await storeStoreListData(data?.StoreDetails || []);
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const onNotFound = () => {
        dispatch(removeAuthIDFromRedux());
        dispatch(removeUserDataFromRedux());
        dispatch(removeStoreDataFromRedux());
        dispatch(removeLocationStoreDataFromRedux());
        dispatch(removeSelectedStoreDataFromRedux());
        dispatch(removeSelectedStoreLocationDataFromRedux());
        removeAuthID();
        removeUserDetails();
    }

    return {
        navigation,
    };
}

export default useScreenHooks