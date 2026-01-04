import {
    View,
    StatusBar,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import useScreenHooks from './BestSellersScreen.Hooks';
import { styles } from './styles';
import MenuStrip from '../../components/MenuStrip';
import ProductSellsCard from '../../components/ProductSellsCard';
import { COLOR } from '../../constants/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import FilterButton from '../../components/button/FilterButton';
import ShopSelectionButton from '../../components/button/ShopSelectionButton';
import DarkView from '../../components/modal/DarkView';
import { NavigationScreens } from '../../constants/Strings';

const BestSellersScreen = (props) => {

    const {
        navigation,

        seletedTabValue,
        data,
        loading,

        locationModalVisible, setLocationModalVisibility,
        selectedDepts, setSelectedDepts,

        onTabSelect,

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
                    bottomSheetTitle={'Select Store For Best Sellers'}
                    locationModalVisible={locationModalVisible}
                    setLocationModalVisibility={setLocationModalVisibility}
                />

                <View style={{ flex: 1, }} />

                <Text style={styles.TitleText}>
                    Best Sellers
                </Text>
            </View>

            <MenuStrip
                selected={seletedTabValue}
                onTabPress={onTabSelect}
            />

            {
                data?.length > 0 ?
                    <FlatList
                        style={styles.DataContainer}
                        contentContainerStyle={styles.DataContentContainer}
                        data={data}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <ProductSellsCard
                                    data={item}
                                    navigation={navigation}
                                    screen={NavigationScreens.BestSellersScreen}
                                />
                            )
                        }}
                        initialNumToRender={10}
                    />
                    :
                    <View style={styles.EmptyContainer}>
                        {
                            loading ?
                                <ActivityIndicator color={COLOR.ACTIVETABBACK} size='large' />
                                :
                                <Text style={styles.EmptyText}>Best sellers not found</Text>
                        }
                    </View>
            }

            <FilterButton
                numOfFilter={selectedDepts?.includes('ALL') ? undefined : selectedDepts?.length}
                selectedDepts={selectedDepts}
                onDepartmentSelect={setSelectedDepts}
            />

            {locationModalVisible && <DarkView />}
        </View>
    )
}

export default BestSellersScreen