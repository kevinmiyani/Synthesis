import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { ShopIcon } from '../../constants/Assets';
import { elevation_2 } from '../../constants/styles';

const LocationSelectionModal = ({
    modalVisible,
    setModalVisible,
    selectedStore,
    storeList,
    title,
    onStoreSelect,
}) => {
    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>

                <TouchableOpacity
                    style={[{ height: '100%', width: '100%', }]}
                    onPress={() => { setModalVisible(false) }}
                    activeOpacity={1}
                >

                </TouchableOpacity>
                <View style={[styles.Container, { backgroundColor: COLOR.WHITE }]}>
                    <Text style={styles.StoreTitleName}>
                        {title}
                    </Text>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingHorizontal: ResponsiveSizeWp(30),
                        }}
                        bounces={false}
                    >
                        {
                            storeList?.map((store, i) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.StoreCard, selectedStore?.StoreId == store?.StoreId && { backgroundColor: COLOR.ACTIVETABBACK, ...elevation_2 }]}
                                        key={i}
                                        onPress={() => {
                                            onStoreSelect(store);
                                            setModalVisible(false);
                                        }}
                                    >
                                        <Image
                                            style={[styles.Image, selectedStore?.StoreId == store?.StoreId && { tintColor: COLOR.WHITE, }]}
                                            source={ShopIcon}
                                            resizeMode='contain'
                                        />
                                        <Text style={[styles.StoreName, selectedStore?.StoreId == store?.StoreId && { color: COLOR.WHITE, }]}>{store?.StoreName}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default LocationSelectionModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    Container: {
        borderTopLeftRadius: ResponsiveSizeWp(30),
        borderTopRightRadius: ResponsiveSizeWp(30),
        paddingBottom: ResponsiveSizeWp(30),
        paddingTop: ResponsiveSizeWp(40),
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        minHeight: '50%',
        maxHeight: '75%',
        elevation: 5,
        shadowColor: COLOR.GRAY,
        shadowOffset: { height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderColor: COLOR.LIGHTGRAY,
        borderWidth: ResponsiveSizeWp(1),
    },
    StoreCard: {
        borderRadius: ResponsiveSizeWp(15),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.BLACK_10,
        padding: ResponsiveSizeWp(15),
        marginBottom: ResponsiveSizeWp(10),
        flexDirection: 'row',
    },
    StoreName: {
        fontFamily: FontFamily.Medium,
        fontSize: ResponsiveSizeWp(18),
        marginLeft: ResponsiveSizeWp(15),
        color: COLOR.BLACK,
    },
    Image: {
        width: ResponsiveSizeWp(20),
        aspectRatio: 1 / 1,
        tintColor: COLOR.BLACK,
    },
    StoreTitleName: {
        fontFamily: FontFamily.SemiBold,
        fontSize: ResponsiveSizeWp(22),
        color: COLOR.BLACK,
        marginBottom: ResponsiveSizeWp(20),
        alignSelf: 'center',
    },
})
