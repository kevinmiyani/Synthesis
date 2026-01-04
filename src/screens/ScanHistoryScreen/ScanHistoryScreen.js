import React from 'react';
import {
    View,
    StatusBar,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import Searchcard from '../../components/Searchcard';
import useScreenHooks from './ScanHistoryScreen.Hooks';
import { NavigationScreens } from '../../constants/Strings';
import Entypo from 'react-native-vector-icons/Entypo';
import MenuStrip from '../../components/MenuStrip';
import { ScanHistoryTab } from '../../constants/Helper';

const ScanHistoryScreen = (props) => {

    const {
        data,
        navigation,
        seletedTabValue,

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

                <View style={{ flex: 1, }} />

                <Text style={styles.TitleText}>
                    Scan History
                </Text>
            </View>

            <MenuStrip
                tabs={ScanHistoryTab}
                selected={seletedTabValue}
                onTabPress={onTabSelect}
                textSize={ResponsiveSizeWp(17)}
            />

            {
                data?.length > 0 ?
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Searchcard data={item} navigation={navigation} screen={NavigationScreens.SearchScreen} />}
                        keyExtractor={(item, i) => i}
                        style={{
                            flex: 1,
                            height: 'auto',
                        }}
                        contentContainerStyle={{
                            paddingHorizontal: ResponsiveSizeWp(15),
                        }}
                    />
                    :
                    <View style={styles.EmptyContainer}>
                        <Text style={styles.EmptyText}>{`No ${seletedTabValue.label} Items`}</Text>
                    </View>
            }

        </View>
    );
};

export default ScanHistoryScreen;