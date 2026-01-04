import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from '../../redux/helper';
import { ShopIcon } from '../../constants/Assets';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import LocationSelectionModal from '../modal/LocationSelectionModal';
import { setSelectedStoreDataInRedux } from '../../redux/SelectedStoreData/SelectedStoreDataAction';
import Geolocation from 'react-native-geolocation-service';
import { calculateDistance } from '../../constants/DistanceCalculator';

const ShopSelectionButton = ({
    bottomSheetTitle,
    locationModalVisible,
    setLocationModalVisibility,
}) => {

    const selectedStore = useSelector(state => state[reducers.SelectedStoreDataReducer]);
    const storeList = useSelector(state => state[reducers.StoreDataReducer]);

    const onButtonPress = () => setLocationModalVisibility(true);

    const dispatch = useDispatch();

    const onStoreSelect = (store) => dispatch(setSelectedStoreDataInRedux(store));

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // console.log("Current Location : ", latitude, longitude);

                var lessDistanceStore = selectedStore;
                var lessDistance = null;

                const allDone = storeList?.map((store, i) => {
                    const distance = calculateDistance(latitude, longitude, store.Latitude, store.Longitude);
                    if (distance < lessDistance || lessDistance == null) {
                        lessDistance = distance;
                        lessDistanceStore?.StoreId != store?.StoreId && (lessDistanceStore = store);
                    }
                    // console.log(`Store Id : ${store.StoreId}, Distance : ${distance}`);
                })

                if (allDone) {
                    return Promise.all(allDone).then(() => {
                        (lessDistanceStore?.StoreId != selectedStore?.StoreId) && dispatch(setSelectedStoreDataInRedux(lessDistanceStore));
                    })
                }
            },
            (error) => {
                console.log("Current Location error:", error.code, error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 2000,
                maximumAge: 1000,
            }
        );
    }

    useEffect(() => {
        getCurrentLocation();
    }, [])

    return (
        <View>
            <TouchableOpacity
                style={[styles.ButtonContainer]}
                onPress={onButtonPress}
                disabled={storeList?.length <= 1}
            >
                <Image
                    style={styles.IconStyle}
                    source={ShopIcon}
                    resizeMode='contain'
                />

                <Text style={[styles.ButtonTextStyle]} numberOfLines={1}>
                    {selectedStore && selectedStore?.StoreNickName}
                </Text>

            </TouchableOpacity>

            <LocationSelectionModal
                title={bottomSheetTitle}
                storeList={storeList}
                selectedStore={selectedStore}
                modalVisible={locationModalVisible}
                setModalVisible={setLocationModalVisibility}
                onStoreSelect={onStoreSelect}
            />
        </View>
    )
}

export default ShopSelectionButton

const styles = StyleSheet.create({
    ButtonContainer: {
        flexDirection: 'row',
        paddingVertical: ResponsiveSizeWp(10),
        alignItems: 'center',
        backgroundColor: COLOR.LIGHTGRAY_2,
        paddingHorizontal: ResponsiveSizeWp(10),
        borderRadius: ResponsiveSizeWp(13),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
    },
    IconStyle: {
        width: ResponsiveSizeWp(20),
        aspectRatio: 1 / 1,
        tintColor: COLOR.BLACK,
    },
    ButtonTextStyle: {
        color: COLOR.BLACK,
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(17),
        borderRadius: ResponsiveSizeWp(8),
        marginLeft: ResponsiveSizeWp(8),
        marginRight: ResponsiveSizeWp(4),
    },
})