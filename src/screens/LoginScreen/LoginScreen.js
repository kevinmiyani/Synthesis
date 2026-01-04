import {
    View,
    StatusBar,
    Image,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import React from 'react'
import useScreenHooks from './LoginScreen.Hooks';
import { styles } from './styles';
import { COLOR } from '../../constants/Colors';
import { FaceIDIcon, LoginBackground, TouchIDIcon, WMLogo } from '../../constants/Assets';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import AuthTextInput from '../../components/input/AuthTextInput';
import { keyboardType } from '../../constants/Strings';
import LoadingModal from '../../components/modal/LoadingModal';
import { BlurView } from "@react-native-community/blur";
import MessageModal from '../../components/modal/MessageModal';
import { BioType } from '../../constants/Helper';

const LoginScreen = (props) => {

    const {
        navigation,

        username, setUsername,
        password, setPassword,
        loading, setLoading,
        errorMessage, setErrorMessage,
        messageModalVisible, setMessageModalVisibility,
        biometricsData, setBiometricsData,

        onLoginPress,
        onBiometricsPress,
    } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                translucent
                backgroundColor={COLOR.TRANSPARANT}
                barStyle={'light-content'}
            />

            <Image
                source={LoginBackground}
                style={styles.BackgroundImage}
                resizeMode='cover'
                blurRadius={2}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <View style={styles.LoginContainer}>
                    <View style={styles.LogoImage}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: ResponsiveSizeWp(100),
                                zIndex: 100,
                            }}
                            source={WMLogo}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={{
                        zIndex: -10,
                        borderRadius: ResponsiveSizeWp(30),
                        overflow: 'hidden',
                        borderWidth: ResponsiveSizeWp(1),
                        borderColor: COLOR.WHITE_10,
                    }}>

                        <BlurView
                            style={styles.absolute}
                            blurType="extraDark"
                            blurAmount={4}
                        >


                        </BlurView>

                        <View style={{
                            paddingHorizontal: ResponsiveSizeWp(30),
                            paddingTop: ResponsiveSizeWp(60),
                            paddingBottom: ResponsiveSizeWp(35),
                        }}>

                            <Text style={styles.LoginText}>
                                Login
                            </Text>

                            <AuthTextInput
                                placeholder={'Username'}
                                keyboardType={keyboardType.default}
                                value={username}
                                onChangeText={setUsername}
                            />

                            <AuthTextInput
                                placeholder={'Password'}
                                keyboardType={keyboardType.default}
                                value={password}
                                onChangeText={setPassword}
                                isPasswordField
                            />



                            <TouchableOpacity
                                style={styles.LoginButton}
                                onPress={onLoginPress}
                            >
                                <Text style={styles.LoginButtonText}>
                                    Login
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>

            </KeyboardAvoidingView>

            {loading && <LoadingModal visible={loading} />}

            {
                messageModalVisible &&
                <MessageModal
                    modalVisible={messageModalVisible}
                    onOkPres={() => {
                        setTimeout(() => {
                            setMessageModalVisibility(false);
                        }, 100);
                    }}
                    title={errorMessage?.title}
                    desc={errorMessage?.desc}
                />
            }

            {
                biometricsData != null && biometricsData?.biometricsEnabled && biometricsData?.bioType &&
                <TouchableOpacity
                    style={styles.BioButton}
                    onPress={onBiometricsPress}
                >
                    {
                        biometricsData?.bioType &&
                        <Image
                            style={{
                                width: ResponsiveSizeWp(20),
                                aspectRatio: 1 / 1,
                                tintColor: COLOR.WHITE,
                            }}
                            source={biometricsData?.bioType == BioType.FaceID ? FaceIDIcon : TouchIDIcon}
                        />
                    }
                    <Text style={styles.BioButtonText}>
                        Login with {biometricsData?.bioType}
                    </Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default LoginScreen