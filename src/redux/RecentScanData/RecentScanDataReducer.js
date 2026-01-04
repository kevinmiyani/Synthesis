import { FETCH_SCAN_DATA, REMOVE_SCAN_DATA, } from "../constants";

export const RecentScanDataReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_SCAN_DATA:
            return action.data;
        case REMOVE_SCAN_DATA:
            return [];
        default:
            return state;
    }
}