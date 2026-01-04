import axios from "axios";

export const DOMAIN = `ADD_YOUR_DOMAIN_URL_HERE`;
const BASE_URL = `${DOMAIN}/api`;

// GET
const ITEM_LIST_BASE_URL = `${BASE_URL}/GetItemList`;
const ITEM_LIST_STORE_WISE_URL = `${ITEM_LIST_BASE_URL}/GetAllWatchList`;
const BEST_SELLETS_URL = `${ITEM_LIST_BASE_URL}/GetTop50ItemsList`;
const SLOW_MOVERS_URL = `${ITEM_LIST_BASE_URL}/GetLowest50ItemsList`;
const GET_ITEM_BY_CODE_URL = `${ITEM_LIST_BASE_URL}/GetItemListScanbyCode`;
const GET_ITEM_BY_SCAN_CODE_URL = `${ITEM_LIST_BASE_URL}/ProductItemLogScanDBDump`;
const STORE_LIST_URL = `${BASE_URL}/HRStoreList/GetStoreListData`;
const Search_URL = `${ITEM_LIST_BASE_URL}/GetItembyKeywordSearch`;
const DEPARTMENT_LIST_URL = `${ITEM_LIST_BASE_URL}/GetAllItemMovementDepartment`;
const UPDATE_APP_API_URL = `${ITEM_LIST_BASE_URL}/GetForceUpdate`;
const GET_USER_DETAIL_URL = `${ITEM_LIST_BASE_URL}/GetAllUserDetails`;
const GET_REPORT_ISSUE_URL = `${ITEM_LIST_BASE_URL}/GetAllOptionsToReportIssue`;

// POST
const LOGIN_URL = `${BASE_URL}/HRLogin/GetUserLogProducts`;
const REMOVE_FROM_WATCHLIST_URL = `${ITEM_LIST_BASE_URL}/DeleteApkWatchList`;
const ADD_TO_WATCHLIST_URL = `${ITEM_LIST_BASE_URL}/ApkWatchList`;
const REPORT_ISSUE_DUMP_URL = `${ITEM_LIST_BASE_URL}/ReportIssueDump`;

// GET
export const getItemByStoreIdAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(ITEM_LIST_STORE_WISE_URL, headers);
    return res;
}

export const getResponseFromSearch = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(Search_URL, headers);
    return res;
}

export const getBestSellersAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(BEST_SELLETS_URL, headers);
    return res;
}

export const getSlowMoversAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(SLOW_MOVERS_URL, headers);
    return res;
}

export const getItemByCodeAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(GET_ITEM_BY_CODE_URL, headers);
    return res;
}

export const getItemByScanCodeAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(GET_ITEM_BY_SCAN_CODE_URL, headers);
    return res;
}

export const getStoreListAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(STORE_LIST_URL, headers);
    return res;
}

export const getDepartmentListAPI = async (authToken) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
    }
    const res = await axios.get(DEPARTMENT_LIST_URL, headers);
    return res;
}

export const getReportIssueListAPI = async (authToken) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
    }
    const res = await axios.get(GET_REPORT_ISSUE_URL, headers);
    return res;
}

export const getAppUpdateVersionAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(UPDATE_APP_API_URL, headers);
    return res;
}

export const getUserDetailAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params,
    }
    const res = await axios.get(GET_USER_DETAIL_URL, headers);
    return res;
}


// POST
export const LoginAPI = async (data) => {
    const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const res = await axios.post(LOGIN_URL, data?.toString(), { headers }).catch((e) => { console.log(e) });
    return res;
};

export const RemoveFromWatchlistAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
        params: params
    }
    const res = await axios.post(REMOVE_FROM_WATCHLIST_URL, {}, headers).catch((e) => { console.log(e) });
    return res;
};

export const AddToWatchlistAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
    }
    const res = await axios.post(ADD_TO_WATCHLIST_URL, params, headers).catch((e) => { console.log(e) });
    return res;
};

export const ReportIssueDumpAPI = async (authToken, params) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
        },
    }
    const res = await axios.post(REPORT_ISSUE_DUMP_URL, params, headers).catch((e) => { console.log(e) });
    return res;
};