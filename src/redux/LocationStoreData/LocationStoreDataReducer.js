import { FETCH_LOCATION_STORE_DATA, REMOVE_LOCATION_STORE_DATA, } from "../constants";

export const LocationStoreDataReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_LOCATION_STORE_DATA:
            return action.data;
        case REMOVE_LOCATION_STORE_DATA:
            return null;
        default:
            return state;
    }
}