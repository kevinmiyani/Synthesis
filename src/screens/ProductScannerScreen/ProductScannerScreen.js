import {
    View,
    StatusBar,
    TouchableOpacity,
    Text,
    Image,
} from 'react-native'
import React, { useRef } from 'react'
import { COLOR } from '../../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TableHeader from '../../components/table/TableHeader';
import TableRow from '../../components/table/TableRow';
import FastImage from 'react-native-fast-image';
import StoreMenuStrip from '../../components/StoreMenuStrip';
import FloatingScannerButton from '../../components/button/FloatingScannerButton';
import LoadingModal from '../../components/modal/LoadingModal';
import { BarcodeIcon, EditIcon, ForecastIcon, PlaceHolderBackground } from '../../constants/Assets';
import ViewShot from 'react-native-view-shot';
import Tooltip from '../../components/Tooltip';
import useScreenHooks from './ProductScannerScreen.Hooks';
import { styles } from './styles';
import Scanner from './Scanner';
import ImageSlider from '../../components/ImageSlider';
import ReportIssueModal from '../../components/modal/ReportIssueModal';
import ReportIssueSuccessModal from '../../components/modal/ReportIssueSuccessModal';

const ProductScannerScreen = (props) => {

    const {
        navigation,
        itemCode,
        storeList,
        itemName,
        authToken,
        deptName,
        perIsScanner,
        deviceInfo,
        locationAccess,

        data,
        images,
        loading,
        userId,
        userAccess,
        permissionGranted,
        currentLocation,
        selectedLocationStore,

        selectedStore, setSelectedStore,
        isScannerVisible, setIsScannerVisible,
        reportModalVisible, setReportModalVisibility,
        reportSuccessModalVisible, setReportSuccessModalVisibility,
        frt, setFrt,
        edt, setEdt,
        spt, setSpt,

        onBackPress,
        onTabSelect,
        onAddWatchlistPress,
        onSharePress,
        onScannerPress,
        onScanned,
        onReportSubmit,

    } = useScreenHooks(props);

    const _container = useRef();

    return (

        isScannerVisible ?
            <Scanner
                authToken={authToken}
                onScanned={onScanned}
                deviceInfo={deviceInfo}
                locationAccess={locationAccess}
                onBackPress={() => {
                    perIsScanner ? navigation.goBack() : setIsScannerVisible(false)
                }}
                permissionGranted={permissionGranted}
                userAccess={userAccess}
                userId={userId}
                currentLocation={currentLocation}
                storeData={selectedLocationStore}
            />
            :
            <View style={styles.Container}>
                <StatusBar
                    translucent
                    backgroundColor={COLOR.TRANSPARANT}
                    barStyle={'dark-content'}
                />

                <ViewShot
                    ref={_container}
                    style={{ flex: 1, backgroundColor: COLOR.WHITE, paddingVertical: ResponsiveSizeWp(15) }}
                >
                    <View style={styles.HeaderContainer}>
                        <TouchableOpacity
                            style={styles.BackButton}
                            onPress={onBackPress}
                        >
                            <Entypo
                                name="chevron-left"
                                size={ResponsiveSizeWp(35)}
                                color={COLOR.BLACK}
                            />
                        </TouchableOpacity>
                        <View style={styles.RightContainer}>
                            <Image
                                style={styles.Image}
                                source={BarcodeIcon}
                                resizeMode='contain'
                            />
                            <Text style={styles.UPCCODeText} numberOfLines={1}>
                                {itemCode}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.CenterContainer}>
                        {
                            images && images != null && images?.length > 0 ?
                                <ImageSlider data={images} />
                                :
                                <FastImage
                                    style={[styles.ImageStyle, { borderRadius: ResponsiveSizeWp(15), }]}
                                    resizeMode='cover'
                                    source={PlaceHolderBackground}
                                />
                        }
                    </View>

                    <View style={styles.ContentContainer}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={styles.ProductNameText} numberOfLines={2}>
                                    {itemName}
                                </Text>
                                <View style={{ flexDirection: 'row', marginTop: ResponsiveSizeWp(5), paddingHorizontal: ResponsiveSizeWp(15), alignItems: 'center', }}>
                                    <Text style={styles.DeptNameText} numberOfLines={2}>
                                        {deptName}
                                    </Text>
                                    <View style={{ width: ResponsiveSizeWp(1), height: '100%', marginLeft: ResponsiveSizeWp(15), backgroundColor: COLOR.LIGHTGRAYBORDER, borderRadius: ResponsiveSizeWp(2), }} />
                                    <TouchableOpacity
                                        onPress={() => setSpt(true)}
                                    >
                                        <Text style={styles.SuppliersText} numberOfLines={1}>
                                            Suppliers
                                        </Text>
                                        {
                                            spt &&
                                            <Tooltip
                                                text={'Coming Soon'}
                                                visible={spt}
                                                setVisible={setSpt}
                                                style={{
                                                    left: ResponsiveSizeWp(35),
                                                }}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.WatchListButton, {
                                    marginRight: ResponsiveSizeWp(15),
                                    backgroundColor: COLOR.WHITE,
                                    borderColor: COLOR.LIGHTGRAYBORDER,
                                    borderWidth: ResponsiveSizeWp(1),
                                }]}
                                onPress={() => setEdt(true)}
                            >
                                <Image
                                    source={EditIcon}
                                    style={{
                                        width: ResponsiveSizeWp(17),
                                        aspectRatio: 1 / 1,
                                        resizeMode: 'contain',
                                        tintColor: COLOR.BLACK,
                                    }}
                                />
                                {
                                    edt &&
                                    <Tooltip
                                        text={'Coming Soon'}
                                        visible={edt}
                                        setVisible={setEdt}
                                        style={{
                                            left: '0%',
                                            transform: [{ translateX: -ResponsiveSizeWp(40) }],
                                        }}
                                    />
                                }
                            </TouchableOpacity>

                        </View>

                        <StoreMenuStrip
                            data={storeList}
                            selected={selectedStore}
                            onTabPress={onTabSelect}
                        />

                        <View style={{ paddingHorizontal: ResponsiveSizeWp(15), }}>

                            <TableHeader />

                            <TableRow
                                timePeriod={'Yesterday'}
                                avgPrice={data && data?.YesterdayAvgPrice || '0.0'}
                                comPrice={data && data?.CompPrice || '0.0'}
                                unitSold={data?.YesterdayQty || '0'}
                            />

                            <TableRow
                                timePeriod={'Last Week'}
                                avgPrice={data && data?.LastWeekAvgPrice || '0.0'}
                                comPrice={data && data?.CompPrice || '0.0'}
                                unitSold={data?.LastWeekQty || '0'}
                            />

                            <TableRow
                                timePeriod={'Last 30 Days'}
                                avgPrice={data && data?.Last30DaysAvgPrice || '0.0'}
                                comPrice={data && data?.CompPrice || '0.0'}
                                unitSold={data?.Last30DaysQty || '0'}
                            />

                            <TableRow
                                timePeriod={'Last 120 Days'}
                                avgPrice={data && data?.Last120DaysAvgPrice || '0.0'}
                                comPrice={data && data?.CompPrice || '0.0'}
                                unitSold={data?.Last120DaysQty || '0'}
                            />

                            <TableRow
                                timePeriod={'Year to Date'}
                                avgPrice={data && data?.ThisYearAvgPrice || '0.0'}
                                comPrice={data && data?.CompPrice || '0.0'}
                                unitSold={data?.ThisYearQty || '0'}
                            />

                            <TableRow
                                timePeriod={'Last Year'}
                                avgPrice={data && data?.LastYearAvgPrice || '0.0'}
                                comPrice={data && data?.CompPrice || '0.0'}
                                unitSold={data?.LastYearQty || '0'}
                            />
                        </View>
                    </View>
                </ViewShot>

                <View style={styles.BottomContainer}>
                    <TouchableOpacity
                        style={[styles.WatchListButton, {
                            aspectRatio: undefined,
                            flex: 1,
                            paddingHorizontal: ResponsiveSizeWp(10),
                            justifyContent: 'space-between',
                            gap: ResponsiveSizeWp(5),
                        }]}
                        onPress={() => { setFrt(true) }}
                    >
                        <Image
                            source={ForecastIcon}
                            style={{
                                width: ResponsiveSizeWp(20),
                                aspectRatio: 1 / 1,
                                resizeMode: 'contain',
                                tintColor: COLOR.BLACK,
                            }}
                        />

                        <Text style={styles.ForecastText} numberOfLines={1}>
                            FORECAST
                        </Text>
                        {
                            frt &&
                            <Tooltip
                                text={'Coming Soon'}
                                visible={frt}
                                setVisible={setFrt}
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.WatchListButton}
                        onPress={() => { setReportModalVisibility(true) }}
                    >
                        <Ionicons
                            name={'chatbubble'}
                            size={ResponsiveSizeWp(25)}
                            color={COLOR.BLACK}
                        />
                        <Text style={styles.ReportButton}>!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.WatchListButton}
                        onPress={onAddWatchlistPress}
                    >
                        <MaterialCommunityIcons
                            name={'bookmark'}
                            size={ResponsiveSizeWp(25)}
                            color={COLOR.BLACK}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.WatchListButton}
                        onPress={() => onSharePress(_container)}
                    >
                        <MaterialCommunityIcons
                            name={'share'}
                            size={ResponsiveSizeWp(25)}
                            color={COLOR.BLACK}
                        />
                    </TouchableOpacity>
                </View>

                <FloatingScannerButton
                    onPress={onScannerPress}
                    style={{ right: ResponsiveSizeWp(15), width: ResponsiveSizeWp(65) }}
                    iconStyle={{ height: ResponsiveSizeWp(35), }}
                    disabled={locationAccess != true}
                />

                {loading && <LoadingModal visible={loading} />}

                {
                    reportModalVisible &&
                    <ReportIssueModal
                        itemCode={itemCode}
                        itemName={itemName}
                        modalVisible={reportModalVisible}
                        setModalVisible={setReportModalVisibility}
                        onSubmit={onReportSubmit}
                    />
                }
                {
                    reportSuccessModalVisible &&
                    <ReportIssueSuccessModal
                        modalVisible={reportSuccessModalVisible}
                        setModalVisible={setReportSuccessModalVisibility}
                    />
                }
            </View>
    )
}

export default ProductScannerScreen