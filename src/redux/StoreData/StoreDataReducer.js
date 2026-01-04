import { FETCH_STORE_DATA, REMOVE_STORE_DATA, } from "../constants";

export const StoreDataReducer = (state = null, action) => {
    switch (action.type) {
        case FETCH_STORE_DATA:
            return action.data;
        case REMOVE_STORE_DATA:
            return null;
        default:
            return state;
    }
}