import { FETCH_ISSUE_DATA, REMOVE_ISSUE_DATA, } from "../constants";

const initialState = [];

export const IssueListDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ISSUE_DATA:
            return action.data;
        case REMOVE_ISSUE_DATA:
            return [];
        default:
            return state;
    }
}