import { combineReducers } from "redux";
import { AuthReducer } from "./Authentication/AuthReducer";
import { UserDataReducer } from "./UserData/UserDataReducer";
import { StoreDataReducer } from "./StoreData/StoreDataReducer";
import { SelectedStoreDataReducer } from "./SelectedStoreData/SelectedStoreDataReducer";
import { DepartmentDataReducer } from "./DepartmentData/DepartmentDataReducer";
import { LocationStoreDataReducer } from "./LocationStoreData/LocationStoreDataReducer";
import { SelectedStoreLocationDataReducer } from "./SelectedStoreLocationData/SelectedStoreLocationDataReducer";
import { RecentScanDataReducer } from "./RecentScanData/RecentScanDataReducer";
import { IssueListDataReducer } from "./IssueListData/IssueListDataReducer";

export default rootReducer = combineReducers({
    AuthReducer,
    UserDataReducer,
    StoreDataReducer,
    SelectedStoreDataReducer,
    DepartmentDataReducer,
    LocationStoreDataReducer,
    SelectedStoreLocationDataReducer,
    RecentScanDataReducer,
    IssueListDataReducer,
})
