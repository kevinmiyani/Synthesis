import { FETCH_STORE_DATA, REMOVE_STORE_DATA, } from "../constants"

export const setStoreDataInRedux = (data) => {
    return {
        type: FETCH_STORE_DATA,
        data: data,
    }
}

export const removeStoreDataFromRedux = () => {
    return {
        type: REMOVE_STORE_DATA,
        data: null,
    }
}