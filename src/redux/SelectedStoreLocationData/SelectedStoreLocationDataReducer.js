import { FETCH_SELECTED_STORE_LOCATION_DATA, REMOVE_SELECTED_STORE_LOCATION_DATA, } from "../constants";

const initialState = {};

export const SelectedStoreLocationDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SELECTED_STORE_LOCATION_DATA:
            return action.data;
        case REMOVE_SELECTED_STORE_LOCATION_DATA:
            return {};
        default:
            return state;
    }
}