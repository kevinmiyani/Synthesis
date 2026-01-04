import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ResponsiveSizeWp } from '../../constants/Responsive';
import { COLOR } from '../../constants/Colors';
import { FontFamily } from '../../constants/Fonts';
import { elevation_2 } from '../../constants/styles';

const TimerModal = ({ isVisible, onClose, onLogout }) => {

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer;
    if (isVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isVisible, countdown]);

  useEffect(() => {
    if (countdown === 0) {
      onLogout()
    }
  }, [countdown]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      statusBarTranslucent
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            You are not within radius of any of the allowed store.
          </Text>
          <Text style={styles.modalText}>
            You will be logged out in {countdown} seconds.
          </Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
          >
            <Text style={[styles.logoutButtonText, elevation_2]}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginBottom: ResponsiveSizeWp(10),
    textAlign: 'center',
    fontSize: ResponsiveSizeWp(18),
    color: COLOR.BLACK,
    fontFamily: FontFamily.Regular,
    fontSize: ResponsiveSizeWp(15),
  },
  logoutButton: {
    backgroundColor: COLOR.ACTIVETABBACK,
    borderRadius: ResponsiveSizeWp(20),
    paddingVertical: ResponsiveSizeWp(10),
    paddingHorizontal: ResponsiveSizeWp(40),
    marginTop: ResponsiveSizeWp(20),
    borderWidth: ResponsiveSizeWp(1),
    borderColor: COLOR.WHITE,
  },
  logoutButtonText: {
    textAlign: 'center',
    fontFamily: FontFamily.Bold,
    color: COLOR.WHITE,
    fontSize: ResponsiveSizeWp(14),
  },
});

export default TimerModal;