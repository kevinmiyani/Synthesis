import { NavigationScreens } from '../constants/Strings';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BottomTab from './BottomTab/BottomTab';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen/BarcodeScannerScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import WatchlistScreen from '../screens/WatchlistScreen/WatchlistScreen';
import BestSellersScreen from '../screens/BestSellersScreen/BestSellersScreen';
import SlowMoversScreen from '../screens/SlowMoversScreen/SlowMoversScreen';
import AddItemsScreen from '../screens/AddItemsScreen/AddItemsScreen';
import ItemMovementScreen from '../screens/ItemMovementScreen/ItemMovementScreen';
import ManageStockScreen from '../screens/ManageStockScreen/ManageStockScreen';
import GeneratePOScreen from '../screens/GeneratePOScreen/GeneratePOScreen';
import AlertsScreen from '../screens/AlertsScreen/AlertsScreen';
import PredictionsScreen from '../screens/PredictionsScreen/PredictionsScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import ProductScannerScreen from '../screens/ProductScannerScreen/ProductScannerScreen';
import ScanHistoryScreen from '../screens/ScanHistoryScreen/ScanHistoryScreen';

const Stack = createStackNavigator();

export const NavigationHandler = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animationEnabled: false }}>

            <Stack.Screen name={NavigationScreens.SplashScreen} component={SplashScreen} />
            <Stack.Screen name={NavigationScreens.LoginScreen} component={LoginScreen} />
            {/* <Stack.Screen name={NavigationScreens.BottomTab} component={BottomTab} /> */}
            <Stack.Screen name={NavigationScreens.DashboardScreen} component={DashboardScreen} />
            <Stack.Screen name={NavigationScreens.SearchScreen} component={SearchScreen} />
            <Stack.Screen name={NavigationScreens.ScanHistoryScreen} component={ScanHistoryScreen} />
            <Stack.Screen name={NavigationScreens.WatchlistScreen} component={WatchlistScreen} />
            <Stack.Screen name={NavigationScreens.BestSellersScreen} component={BestSellersScreen} />
            <Stack.Screen name={NavigationScreens.SlowMoversScreen} component={SlowMoversScreen} />
            <Stack.Screen name={NavigationScreens.BarcodeScannerScreen} component={BarcodeScannerScreen} />
            <Stack.Screen name={NavigationScreens.ProductScreen} component={ProductScreen} />
            <Stack.Screen name={NavigationScreens.AddItemsScreen} component={AddItemsScreen} />
            <Stack.Screen name={NavigationScreens.ItemMovementScreen} component={ItemMovementScreen} />
            <Stack.Screen name={NavigationScreens.ManageStockScreen} component={ManageStockScreen} />
            <Stack.Screen name={NavigationScreens.GeneratePOScreen} component={GeneratePOScreen} />
            <Stack.Screen name={NavigationScreens.AlertsScreen} component={AlertsScreen} />
            <Stack.Screen name={NavigationScreens.PredictionsScreen} component={PredictionsScreen} />
            <Stack.Screen name={NavigationScreens.ProductScannerScreen} component={ProductScannerScreen} />

        </Stack.Navigator>
    );
}