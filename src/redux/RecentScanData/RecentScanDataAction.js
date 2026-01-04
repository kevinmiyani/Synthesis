import { FETCH_SCAN_DATA, REMOVE_SCAN_DATA, } from "../constants"

export const setRecentScanDataInRedux = (data) => {
    return {
        type: FETCH_SCAN_DATA,
        data: data,
    }
}

export const removeRecentScanDataFromRedux = () => {
    return {
        type: REMOVE_SCAN_DATA,
        data: [],
    }
}