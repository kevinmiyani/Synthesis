import {
    View,
    StatusBar,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import React from 'react';
import useScreenHooks from './BarcodeScannerScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Shimmer from 'react-native-shimmer';

const { width } = Dimensions.get('window');

const BarcodeScannerScreen = (props) => {

    const {
        focused,
        navigation,
        animation,
        permissionGranted,
        scanned, setScanned,
        onBackPress,

        handleBarcodeRead,

    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            <Text style={styles.TitleText} numberOfLines={1}>
                Scan Barcode
            </Text>

            {
                permissionGranted && focused &&
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarcodeRead}
                    style={StyleSheet.absoluteFillObject}
                    type={'back'}
                    barCodeTypes={[
                        BarCodeScanner.Constants.BarCodeType.ean13,
                        BarCodeScanner.Constants.BarCodeType.code128,
                        BarCodeScanner.Constants.BarCodeType.upc_e,
                        BarCodeScanner.Constants.BarCodeType.ean8,
                        BarCodeScanner.Constants.BarCodeType.upc_a,
                    ]}

                />
            }

            <View style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }}>
                <View style={styles.BarcodeScannerMainContainer}>
                    <Animated.View
                        style={[styles.BarcodeScannerLineStyle, {
                            transform: [{
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, (width * 0.63) - ResponsiveSizeWp(66)],
                                })
                            }]
                        }]}
                    />
                </View>
            </View>


            <View style={styles.HeaderContainer}>

                {
                    Platform.OS == 'ios' ?
                        <TouchableOpacity
                            style={styles.BackButton}
                            onPress={onBackPress}
                        >
                            <Ionicons
                                name="close"
                                size={ResponsiveSizeWp(30)}
                                color={COLOR.WHITE}
                            />
                        </TouchableOpacity>
                        :
                        <View />
                }

                <Shimmer>
                    <Text style={styles.ScanningText}>Scanning...</Text>
                </Shimmer>
            </View>
        </View>
    );
};

export default BarcodeScannerScreen;
