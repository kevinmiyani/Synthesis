import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const LoadingModal = ({
    visible,
}) => {
    return (
        <Modal
            animationType='fade'
            transparent
            visible={visible}
            statusBarTranslucent
        >
            <View style={styles.ViewWrapper}>
                <ActivityIndicator color={COLOR.ACTIVETABBACK} size='large' />
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
})