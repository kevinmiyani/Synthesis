import React, { useEffect } from 'react';
import { NavigationHandler } from './navigation/NavigationHandler';
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';
import { FontFamily } from './constants/Fonts';
import { COLOR } from './constants/Colors';
import { getDepartmentListAPI, getReportIssueListAPI, getStoreListAPI } from './api/utils';
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from './redux/helper';
import { setDepartmentDataInRedux } from './redux/DepartmentData/DepartmentDataAction';
import * as Sentry from "@sentry/react-native";
import { AppState } from 'react-native';
import { getStoreListData, storeScanHistoryData, storeStoreListData } from './constants/AsyncStorage';
import { arrangeStoreData } from './constants/Helper';
import { setIssueListDataInRedux } from './redux/IssueListData/IssueListDataAction';

Sentry.init({
  dsn: "https://45f13706d6de29e397598e0658e93bf3@o4508205101023232.ingest.us.sentry.io/4508205102268416",
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 15,
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontWeight: '500',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: FontFamily.Regular,
        color: COLOR.GRAY,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: COLOR.ACTIVETABBACK }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 15,
        fontFamily: FontFamily.SemiBold,
        color: COLOR.ACTIVETABBACK,
        fontWeight: '500',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: FontFamily.Regular,
        color: COLOR.GRAY,
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 15,
        fontFamily: FontFamily.SemiBold,
        color: COLOR.BLACK,
        fontWeight: '500',
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: FontFamily.Regular,
        color: COLOR.GRAY,
      }}
    />
  ),
};

const App = () => {
  const authToken = useSelector(state => state[reducers.AuthReducer]);
  const userData = useSelector(state => state[reducers.UserDataReducer]);
  const recentScanData = useSelector(state => state[reducers.RecentScanDataReducer]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authToken && authToken !== '' && Object.keys(userData)?.length > 0) {
      fetchStoreData();
      fetchDepartmentData();
      fetchIssueListData();
    }
  }, [authToken, userData]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [recentScanData]);

  const handleAppStateChange = async (nextAppState) => {
    nextAppState == 'background' && await storeScanHistoryData(recentScanData);
  };

  const fetchStoreData = async () => {
    try {
      const storeData = await getStoreListData();
      storeData?.length > 0 && arrangeStoreData(dispatch, storeData);

      const res = await getStoreListAPI(authToken, { UserId: userData?.UserId });
      if (res?.data?.responseStatus === '200') {
        const data = res.data;
        if (data?.responseData && data?.responseData?.length > 0) {
          arrangeStoreData(dispatch, data?.responseData ?? []);
          await storeStoreListData(data?.responseData);
        }
      }
    } catch (error) {
      console.log(error);
      Sentry.captureException(`Store Data Error: ${error}`);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const res = await getDepartmentListAPI(authToken);
      if (res?.data?.responseStatus === '200') {
        const data = res.data;
        dispatch(setDepartmentDataInRedux(['ALL', ...data?.responseData?.map((dept) => dept?.Department)]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIssueListData = async () => {
    try {
      const res = await getReportIssueListAPI(authToken);
      if (res?.data?.responseStatus === '200') {
        const data = res.data;
        dispatch(setIssueListDataInRedux(data?.responseData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavigationHandler />
      <Toast config={toastConfig} />
    </>
  );
};

export default Sentry.wrap(App);