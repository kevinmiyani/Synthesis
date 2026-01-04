import React from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { SearchIcon } from '../../constants/Assets';
import { FontFamily } from '../../constants/Fonts';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Searchcard from '../../components/Searchcard';
import Entypo from 'react-native-vector-icons/Entypo';
import useScreenHooks from './SearchScreen.Hooks';
import FilterButton from '../../components/button/FilterButton';
import { NavigationScreens } from '../../constants/Strings';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchScreen = (props) => {

    const {
        allData,
        navigation,
        seletedStore,

        search, setSearch,
        isLoading, setIsLoading,
        searchResults, setSearchResults,
        selectedDepts, setSelectedDepts,

        handleSearch,
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
                <View style={[styles.HeaderInnerContainer, { alignItems: 'center', flexDirection: 'row' }]}>
                    <TextInput
                        placeholder='Search Product'
                        placeholderTextColor={COLOR.LIGHTGRAYBORDER}
                        value={search}
                        keyboardType='default'
                        onChangeText={setSearch}
                        style={{
                            flex: 1,
                            height: ResponsiveSizeWp(45),
                            marginRight: ResponsiveSizeWp(10),
                            color: COLOR.BLACK,
                            fontFamily: FontFamily.SemiBold,
                            fontSize: ResponsiveSizeWp(17),
                        }}
                    />
                    <TouchableOpacity style={styles.SearchButton} onPress={() => { setSearch('') }} disabled={search?.length <= 0}>
                        {
                            search.length > 0 ?
                                <Ionicons
                                    name="close"
                                    size={ResponsiveSizeWp(18)}
                                    color={COLOR.BLACK}
                                />
                                :
                                <Image
                                    style={{
                                        height: '100%',
                                        aspectRatio: 1 / 1,
                                        resizeMode: "contain",
                                        tintColor: COLOR.BLACK,
                                    }}
                                    source={SearchIcon}
                                />
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator color={COLOR.ACTIVETABBACK} style={{ marginTop: ResponsiveSizeWp(50) }} />
            ) : (
                <FlatList
                    data={searchResults?.length > 0 ? searchResults : search.length == 0 ? allData : searchResults}
                    renderItem={({ item }) => <Searchcard data={item} navigation={navigation} screen={NavigationScreens.SearchScreen} />}
                    keyExtractor={(item, i) => i}
                    style={{
                        flex: 1,
                        height: 'auto',
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: ResponsiveSizeWp(15),
                    }}
                    ListEmptyComponent={() => (
                        <Text style={{ alignSelf: "center" }}>Product not found</Text>
                    )}
                />
            )}

            <FilterButton
                numOfFilter={selectedDepts?.includes('ALL') ? undefined : selectedDepts?.length}
                selectedDepts={selectedDepts}
                onDepartmentSelect={setSelectedDepts}
            />
        </View>
    );
};

export default SearchScreen;