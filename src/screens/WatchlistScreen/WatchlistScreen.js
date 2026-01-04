import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import React from 'react'
import useScreenHooks from './WatchlistScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import ShopSelectionButton from '../../components/button/ShopSelectionButton';
import DarkView from '../../components/modal/DarkView';

const WatchlistScreen = (props) => {

    const {
        navigation,
        loading,

        data,
        locationModalVisible, setLocationModalVisibility,

        onProductPress,
        onRemoveWatchListPress,

    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'dark-content'}
            />

            <View style={styles.HeaderContainer}>
                <TouchableOpacity
                    style={styles.BackButton}
                    onPress={() => navigation.pop(1)}
                >
                    <Entypo
                        name="chevron-left"
                        size={ResponsiveSizeWp(35)}
                        color={COLOR.BLACK}
                    />
                </TouchableOpacity>

                <ShopSelectionButton
                    bottomSheetTitle={'Select Store For Watchlist Data'}
                    locationModalVisible={locationModalVisible}
                    setLocationModalVisibility={setLocationModalVisibility}
                />

                <View style={{ flex: 1, }} />

                <Text style={styles.TitleText}>
                    Watchlist
                </Text>
            </View>

            {
                data?.length > 0 ?
                    <FlatList
                        style={styles.DataContainer}
                        contentContainerStyle={styles.DataContentContainer}
                        data={data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <ProductCard
                                    data={item}
                                    onPress={onProductPress}
                                    onWatchPress={onRemoveWatchListPress}
                                />
                            )
                        }}
                    />
                    :
                    <View style={styles.EmptyContainer}>
                        {
                            loading ?
                                <ActivityIndicator color={COLOR.ACTIVETABBACK} size='large' />
                                :
                                <Text style={styles.EmptyText}>No items have been added to the Watchlist for this store yet!</Text>
                        }
                    </View>
            }

            {locationModalVisible && <DarkView />}

        </View>
    )
}

export default WatchlistScreen