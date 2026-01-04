import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR, } from '../../constants/Colors';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { BlurView } from '@react-native-community/blur';

const OptionMenuModal = ({
    modalVisible,
    setModalVisible,
    children,
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

                <View style={styles.Container}>
                    <BlurView
                        style={styles.absolute}
                        blurType="extraDark"
                        blurAmount={4}
                    />

                    <View style={{
                        flex: 1,
                        borderTopLeftRadius: ResponsiveSizeWp(30),
                        borderTopRightRadius: ResponsiveSizeWp(30),
                        paddingBottom: ResponsiveSizeWp(30),
                        paddingTop: ResponsiveSizeWp(40),
                        borderColor: COLOR.LIGHTGRAY,
                        borderWidth: ResponsiveSizeWp(1),
                    }}>
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{
                                paddingHorizontal: ResponsiveSizeWp(30),
                            }}
                            bounces={false}
                        >
                            {children}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default OptionMenuModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    Container: {
        borderTopLeftRadius: ResponsiveSizeWp(30),
        borderTopRightRadius: ResponsiveSizeWp(30),
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        minHeight: '30%',
        maxHeight: '75%',
        overflow: 'hidden',
    },
    absolute: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -10,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLOR.BLACK_40,
    },
})
