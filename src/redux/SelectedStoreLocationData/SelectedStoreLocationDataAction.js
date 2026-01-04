import { FETCH_SELECTED_STORE_LOCATION_DATA, REMOVE_SELECTED_STORE_LOCATION_DATA, } from "../constants"

export const setSelectedStoreLocationDataInRedux = (data) => {
    return {
        type: FETCH_SELECTED_STORE_LOCATION_DATA,
        data: data,
    }
}

export const removeSelectedStoreLocationDataFromRedux = () => {
    return {
        type: REMOVE_SELECTED_STORE_LOCATION_DATA,
        data: {},
    }
}