import { FETCH_SELECTED_STORE_DATA, REMOVE_SELECTED_STORE_DATA, } from "../constants";

const initialState = {};

export const SelectedStoreDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SELECTED_STORE_DATA:
            return action.data;
        case REMOVE_SELECTED_STORE_DATA:
            return {};
        default:
            return state;
    }
}