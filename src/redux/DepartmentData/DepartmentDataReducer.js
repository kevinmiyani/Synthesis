import { FETCH_DEPARTMENT_DATA, REMOVE_DEPARTMENT_DATA, } from "../constants";

const initialState = [];

export const DepartmentDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENT_DATA:
            return action.data;
        case REMOVE_DEPARTMENT_DATA:
            return [];
        default:
            return state;
    }
}