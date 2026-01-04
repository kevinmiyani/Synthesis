import { FETCH_LOCATION_STORE_DATA, REMOVE_LOCATION_STORE_DATA, } from "../constants"

export const setLocationStoreDataInRedux = (data) => {
    return {
        type: FETCH_LOCATION_STORE_DATA,
        data: data,
    }
}

export const removeLocationStoreDataFromRedux = () => {
    return {
        type: REMOVE_LOCATION_STORE_DATA,
        data: null,
    }
}