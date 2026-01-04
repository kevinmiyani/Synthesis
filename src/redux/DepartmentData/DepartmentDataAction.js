import { FETCH_DEPARTMENT_DATA, REMOVE_DEPARTMENT_DATA, } from "../constants"

export const setDepartmentDataInRedux = (data) => {
    return {
        type: FETCH_DEPARTMENT_DATA,
        data: data,
    }
}

export const removeDepartmentDataFromRedux = () => {
    return {
        type: REMOVE_DEPARTMENT_DATA,
        data: [],
    }
}