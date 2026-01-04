import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_2 } from '../../constants/styles';
import { FaceIDIcon, TouchIDIcon } from '../../constants/Assets';
import { BioType } from '../../constants/Helper';

const BiometricsModal = ({
    type,
    onEnablePress,
    onNotNowPress,
}) => {
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {
                    type && <Image
                        style={{
                            height: ResponsiveSizeWp(70),
                            aspectRatio: 1 / 1,
                            marginBottom: ResponsiveSizeWp(25),
                            tintColor: COLOR.LIGHTGRAYBORDER,
                        }}
                        source={type == BioType.FaceID ? FaceIDIcon : TouchIDIcon}
                    />
                }

                <Text style={styles.modalText}>
                    {`Enable ${type}\nfor quicker login experience`}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    gap: ResponsiveSizeWp(10),
                    width: '100%',
                    height: 'auto',
                }}>
                    <TouchableOpacity
                        style={[styles.button, elevation_2, { backgroundColor: COLOR.BLACK }]}
                        onPress={onNotNowPress}
                    >
                        <Text style={[styles.buttonText,]}>Not Now</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, elevation_2]}
                        onPress={onEnablePress}
                    >
                        <Text style={[styles.buttonText,]}>Enable</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 100,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    modalView: {
        backgroundColor: COLOR.WHITE,
        borderRadius: ResponsiveSizeWp(20),
        padding: ResponsiveSizeWp(30),
        paddingTop: ResponsiveSizeWp(40),
        alignItems: 'center',
        width: '85%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: ResponsiveSizeWp(20),
        textAlign: 'center',
        color: COLOR.BLACK,
        fontFamily: FontFamily.Regular,
        fontSize: ResponsiveSizeWp(15),
        lineHeight: ResponsiveSizeWp(20),
    },
    headerText: {
        marginBottom: ResponsiveSizeWp(10),
        textAlign: 'center',
        fontSize: ResponsiveSizeWp(18),
        color: COLOR.BLACK,
        fontFamily: FontFamily.Medium,
    },
    button: {
        flex: 1,
        height: ResponsiveSizeWp(40),
        justifyContent: 'center',
        backgroundColor: COLOR.ACTIVETABBACK,
        borderRadius: ResponsiveSizeWp(20),
        paddingVertical: ResponsiveSizeWp(10),
        paddingHorizontal: ResponsiveSizeWp(40),
        marginTop: ResponsiveSizeWp(10),
        borderWidth: ResponsiveSizeWp(1),
        borderColor: COLOR.WHITE,
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FontFamily.SemiBold,
        color: COLOR.WHITE,
        fontSize: ResponsiveSizeWp(13),
    },
});

export default BiometricsModal;