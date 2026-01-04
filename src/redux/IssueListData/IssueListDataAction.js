import { FETCH_ISSUE_DATA, REMOVE_ISSUE_DATA, } from "../constants"

export const setIssueListDataInRedux = (data) => {
    return {
        type: FETCH_ISSUE_DATA,
        data: data,
    }
}

export const removeIssueListDataFromRedux = () => {
    return {
        type: REMOVE_ISSUE_DATA,
        data: [],
    }
}