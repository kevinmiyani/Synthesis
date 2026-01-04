import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React, { useEffect, useState } from 'react';
import TabBar from './TabBar';
import BestSellersScreen from '../../screens/BestSellersScreen/BestSellersScreen';
import SlowMoversScreen from '../../screens/SlowMoversScreen/SlowMoversScreen';
import { BBestSellersIcon, BSlowMoversIcon, BWatchlistIcon } from '../../constants/Assets';
import WatchlistScreen from '../../screens/WatchlistScreen/WatchlistScreen';
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from '../../redux/helper';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import { navigationToReset } from '../../constants/NavigationController';
import { removeAuthID, removeUserDetails } from '../../constants/AsyncStorage';
import { removeUserDataFromRedux } from '../../redux/UserData/UserDataAction';
import { removeAuthIDFromRedux } from '../../redux/Authentication/AuthAction';
import { requestLocationPermission } from '../../constants/Helper';
import TimerModal from '../../components/modal/TimerModal';

const Tab = createBottomTabNavigator();

export default BottomTab = ({ route }) => {
    const Screens = [
        {
            name: NavigationScreens.WatchlistScreen,
            title: 'Watchlist',
            component: WatchlistScreen,
            icon: BWatchlistIcon,
        },
        {
            name: NavigationScreens.BestSellersScreen,
            title: 'Best Sellers',
            component: BestSellersScreen,
            icon: BBestSellersIcon,
        },
        {
            name: NavigationScreens.SlowMoversScreen,
            title: 'Slow Movers',
            component: SlowMoversScreen,
            icon: BSlowMoversIcon,
        },
    ]

    const authToken = useSelector(state => state[reducers.AuthReducer]);
    const userData = useSelector(state => state[reducers.UserDataReducer]);
    const storeList = useSelector(state => state[reducers.StoreDataReducer]);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [watchId, setWatchId] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (authToken && authToken !== '') {
            fetchStoreData();
        }
        return () => {
            Geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    }, [authToken]);

    const fetchStoreData = async () => {
        try {
            userData?.UserId != 1091 && handleUserLocation();
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        setModalVisible(false);
        dispatch(removeAuthIDFromRedux());
        dispatch(removeUserDataFromRedux());
        removeAuthID();
        removeUserDetails();
        navigationToReset(navigation, NavigationScreens.LoginScreen);
    };

    const handleUserLocation = async () => {
        const granted = await requestLocationPermission();
        if (granted) {
            const newWatchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    console.log("Location : ", latitude, longitude);

                    let isInRadius = false;

                },
                (error) => {
                    console.warn("Location error:", error.code, error.message);
                },
                {
                    enableHighAccuracy: true,
                    distanceFilter: 0,
                    interval: 5000,
                    fastestInterval: 1000,
                }
            );
            setWatchId(newWatchId);
        }
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={(props) => (
                    <TabBar {...props} route={route} />
                )}
            >
                {
                    Screens.map((screen, i) => {
                        return (
                            <Tab.Screen
                                name={screen.name}
                                component={screen.component}
                                options={{
                                    title: screen.title,
                                    tabBarIcon: screen.icon,
                                }}
                                key={i}
                            />
                        )
                    })
                }
            </Tab.Navigator>
            <TimerModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLogout={() => handleLogout()}
            />
        </>
    );
}