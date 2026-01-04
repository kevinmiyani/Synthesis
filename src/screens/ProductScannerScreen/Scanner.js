import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR } from '../../constants/Colors'
import { ResponsiveSizeWp } from '../../constants/Responsive'
import { FontFamily } from '../../constants/Fonts';
import Shimmer from 'react-native-shimmer';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { getItemByScanCodeAPI } from '../../api/utils';
import { ErrorToast } from '../../constants/ToastMessage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertUpcEtoUpcA } from '../../constants/BarcodeConverter';
import * as Sentry from "@sentry/react-native";
import WarningCard from '../../components/WarningCard';

const Scanner = ({
    onScanned,
    onBackPress,
    permissionGranted,
    currentLocation,
    userAccess,
    userId,
    storeData,
    authToken,
    deviceInfo,
    locationAccess,
}) => {

    const storeId = storeData?.StoreId;
    const focused = useIsFocused();
    const [scanned, setScanned] = useState(false);

    const handleBarcodeRead = async (e) => {
        if (!scanned) {
            setScanned(true);
            const code = e.data.replace(/\s+/g, '');

            Sentry.setContext("deviceInfo", deviceInfo);
            Sentry.setTag("scan_number", code);

            if (e.type == BarCodeScanner.Constants.BarCodeType.upc_e) {
                const upca = convertUpcEtoUpcA(code);
                Sentry.addBreadcrumb({
                    category: "scan",
                    message: `UPC-E: ${code}, UPC-A: ${upca}`,
                    level: "info",
                });
                fetchData(upca);
            } else {
                const formattedCode = (Platform.OS === 'ios' && code?.length === 13 && code?.charAt(0) === '0')
                    ? removeFirstDigit(code)
                    : code;
                fetchData(formattedCode);
            }
        }
    };

    function removeFirstDigit(number) {
        const numberStr = String(number);
        return numberStr?.length > 1 ? numberStr.substring(1) : "0";
    }

    const fetchData = async (itemCode) => {
        try {
            const params = {
                ItemCode: itemCode,
                UserId: userId || null,
                UserRightsforStoreAccess: userAccess || 0,
                ScannedStoreId: userAccess == '2' ? storeId || 0 : 0,
                Latitude: userAccess == '2' ? 0 : currentLocation?.lat || 0,
                Longitude: userAccess == '2' ? 0 : currentLocation?.lng || 0,
                OSVersion: deviceInfo?.systemVersion,
                DeviceName: `${deviceInfo?.model} (${deviceInfo?.brand})`,
                LocationAccess: locationAccess ?? false,
            };

            Sentry.setContext("params", params);
            Sentry.setTag("UserId", userId || 0);
            Sentry.setTag("ItemCode", itemCode);
            Sentry.setTag("OSVersion", deviceInfo?.systemVersion ?? 0);
            Sentry.setTag("DeviceName", `${deviceInfo?.model} (${deviceInfo?.brand})` ?? 'unknown');

            const res = await getItemByScanCodeAPI(authToken, params);
            if (res && res.data) {
                const data = res?.data;
                const msg = data?.message?.toString();

                Sentry.setContext("API_Response", typeof (data) === 'object' ? data : { ResponseType: typeof (data) });

                if (data.responseStatus == '200') {
                    onScanned({
                        perItemCode: itemCode,
                        perItemName: data?.responseData?.ItemName,
                        perDept: data?.responseData?.DepartmentName,
                        perData: data,
                    });
                    Sentry.captureMessage(`Success : Product Scanned Successfully (ItemCode : ${itemCode}, UserID: ${userId || 0})`);
                } else {
                    ErrorToast('Product', msg);
                    setScanned(false);
                    Sentry.captureMessage(`Error: ${msg}`);
                }
            } else {
                ErrorToast('Error', 'Something went wrong.');
                setScanned(false);
                Sentry.captureMessage("Error: API returned no data.");
            }
        } catch (error) {
            setScanned(false);
            const errorMessage = error.toString();
            if (errorMessage?.includes('Network Error')) {
                ErrorToast('Network Error', 'No internet connection or weak signal.');
            } else {
                ErrorToast('Error', 'Something went wrong.');
            }
            Sentry.captureException(error);
        }
    };

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            {
                permissionGranted && focused &&
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarcodeRead}
                    style={[StyleSheet.absoluteFillObject, { zIndex: -10, }]}
                    type={'back'}
                    barCodeTypes={[
                        BarCodeScanner.Constants.BarCodeType.ean13,
                        BarCodeScanner.Constants.BarCodeType.upc_a,
                        BarCodeScanner.Constants.BarCodeType.upc_e,
                        BarCodeScanner.Constants.BarCodeType.ean8,
                        BarCodeScanner.Constants.BarCodeType.code128,
                        BarCodeScanner.Constants.BarCodeType.code39,
                    ]}
                    focusable
                />
            }

            <View style={styles.HeaderContainer}>
                {
                    Platform.OS == 'ios' ?
                        <TouchableOpacity style={styles.BackButton} onPress={onBackPress}>
                            <Ionicons name="close" size={ResponsiveSizeWp(30)} color={COLOR.WHITE} />
                        </TouchableOpacity>
                        :
                        <View style={{ flex: 1 }} />
                }
                <Shimmer>
                    <Text style={styles.ScanningText}>
                        Scanning...
                    </Text>
                </Shimmer>
            </View>

            {
                permissionGranted != true && focused &&
                <View style={styles.WarningContainer}>
                    <WarningCard
                        message={'Camera access is essential to utilize this app'}
                        buttonText={'ALLOW CAMERA ACCESS'}
                        style={{
                            backgroundColor: COLOR.ACTIVETABBACK,
                        }}
                    />
                </View>
            }
        </View>
    );
};

export default Scanner;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLOR.BLACK,
    },
    TitleText: {
        color: COLOR.BLACK,
        fontSize: ResponsiveSizeWp(23),
        fontFamily: FontFamily.Bold,
    },
    BackButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: ResponsiveSizeWp(5),
    },
    BackButtonText: {
        color: COLOR.WHITE,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(16),
    },
    ScanningText: {
        fontSize: ResponsiveSizeWp(16),
        color: COLOR.WHITE,
        fontFamily: FontFamily.Medium,
    },
    HeaderContainer: {
        flexDirection: 'row',
        marginTop: ResponsiveSizeWp(65),
        alignItems: 'center',
        width: '100%',
        paddingLeft: ResponsiveSizeWp(15),
        paddingRight: ResponsiveSizeWp(30),
        justifyContent: 'space-between',
    },
    WarningContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: ResponsiveSizeWp(20),
        marginBottom: ResponsiveSizeWp(100),
    },
})