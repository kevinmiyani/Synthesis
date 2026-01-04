import { FETCH_SELECTED_STORE_DATA, REMOVE_SELECTED_STORE_DATA, } from "../constants"

export const setSelectedStoreDataInRedux = (data) => {
    return {
        type: FETCH_SELECTED_STORE_DATA,
        data: data,
    }
}

export const removeSelectedStoreDataFromRedux = () => {
    return {
        type: REMOVE_SELECTED_STORE_DATA,
        data: {},
    }
}