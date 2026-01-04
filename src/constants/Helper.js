import { Platform } from "react-native";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { setStoreDataInRedux } from "../redux/StoreData/StoreDataAction";
import { setSelectedStoreDataInRedux } from "../redux/SelectedStoreData/SelectedStoreDataAction";
import { setLocationStoreDataInRedux } from "../redux/LocationStoreData/LocationStoreDataAction";
import { setSelectedStoreLocationDataInRedux } from "../redux/SelectedStoreLocationData/SelectedStoreLocationDataAction";

export const SellersTabs = [
    {
        key: 'YesterdayData',
        label: 'Yesterday',
    },
    {
        key: 'LastWeekData',
        label: 'Last Week',
    },
    {
        key: 'LastMonthData',
        label: 'Last Month',
    },
];

export const ScanHistoryTab = [
    {
        key: 'Recent',
        label: 'Recently Scanned',
    },
    {
        key: 'Frequently',
        label: 'Frequently Scanned',
    },
];

export const BioType = {
    TouchID: 'Touch ID',
    FaceID: 'Face ID',
    Fingerprint: 'Fingerprint',
}

export const requestLocationPermission = async () => {
    return await checkPermission(Platform.OS == 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
}

const checkPermission = async (permission) => {
    return check(permission)
        .then((result) => {
            switch (result) {
                case RESULTS.DENIED:
                    return requestPermission(permission);
                case RESULTS.GRANTED:
                    return true;
                case RESULTS.UNAVAILABLE:
                    return false;
                default:
                    return false
            }
        }).catch((error) => { console.log(error) })
}

const requestPermission = (permission) => {
    return request(permission, true).then((result) => {
        switch (result) {
            case RESULTS.GRANTED:
                return true;
        }
    })
}

export const arrangeStoreData = (dispatch, storeList) => {
    const userAccessStores = storeList?.filter((s) => s.ViewStoreDataAccess == 1);
    userAccessStores && userAccessStores?.length > 0 && dispatch(setStoreDataInRedux(userAccessStores));
    userAccessStores && userAccessStores?.length > 0 && dispatch(setSelectedStoreDataInRedux(userAccessStores[0]));

    const locationAccessStores = storeList?.filter((s) => s.LocationAccess == 1);
    locationAccessStores && locationAccessStores?.length > 0 && dispatch(setLocationStoreDataInRedux(locationAccessStores));
    locationAccessStores && locationAccessStores?.length > 0 && dispatch(setSelectedStoreLocationDataInRedux(locationAccessStores[0]));
}