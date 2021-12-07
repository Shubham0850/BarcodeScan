import React, {useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';

export default function ScanBarcode() {
  const [isBarcodeRead, setIsBarcodeRead] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');

  const onCodeRead = event => {
    // Logic after code is read
    if (!isBarcodeRead) {
      setIsBarcodeRead(true);
      setBarcodeValue(event.data);
    }
  };

  const scanAgain = () => {
    // Scan Again Logic
    setIsBarcodeRead(false);
    setBarcodeValue('');
  };

  return (
    <View flex={1} style={styles.container}>
      <View style={styles.nav}>
        <Text style={styles.title}>Scan</Text>
        <TouchableOpacity
          onPress={() => {
            scanAgain();
          }}>
          <Image
            style={styles.icon}
            source={require('./refresh.png')}
            alt="refresh icon"
          />
        </TouchableOpacity>
      </View>
      {/* Scanner */}
      <RNCamera
        defaultTouchToFocus
        flashMode={RNCamera.Constants.FlashMode.auto}
        mirrorImage={false}
        onBarCodeRead={e => {
          onCodeRead(e);
        }}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}>
        {/* Code Value */}
        <Text style={styles.codeRead}>{barcodeValue}</Text>
        {/* Barcode Mask */}
        <BarcodeMask
          edgeColor="#fff"
          edgeRadius={10}
          backgroundColor="#"
          animatedLineColor="#fff"
          animatedLineHeight={3}
        />
      </RNCamera>
      {/* Scan Code Button */}
      {!isBarcodeRead ? (
        <TouchableOpacity style={styles.butn}>
          <View>
            <Text style={styles.butnTitle}>Scanning..</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.butn}
          onPress={() => {
            alert(`Code is Read: ${barcodeValue}`);
          }}>
          <View>
            <Text style={styles.butnTitle}>Done</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#27205F',
    padding: 20,
    position: 'relative',
  },
  title: {
    width: '60%',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    padding: 10,
    color: '#fff',
  },
  icon: {
    width: 40,
    height: 40,
  },
  nav: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  butn: {
    width: '100%',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#4CAFE9',
    borderRadius: 15,

    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  butnTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  preview: {
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  codeRead: {
    color: '#fff',
    fontSize: 18,

    position: 'absolute',
    top: 20,
  },
};
