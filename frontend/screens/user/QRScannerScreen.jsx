import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera'; // Make sure you're using react-native-camera

const QRScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);  // Manage camera permission state
  const [scanned, setScanned] = useState(false);  // Manage scanning state

  // Request camera permission for Android and handle permission for iOS
  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera access to scan QR codes',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
        }
      } else {
        setHasPermission(true);  // For iOS, permission is requested automatically when using RNCamera
      }
    };

    requestCameraPermission();  // Call the function to request permission
  }, []);

  // Handle the QR code scanned event
  const handleBarCodeScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('QR Code Scanned', `Data: ${data}`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  // Show message if permission is still loading or denied
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera. Please allow camera access in your device settings.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>

      {/* Camera component to scan QR code */}
      <RNCamera
        style={styles.camera}
        onBarCodeRead={handleBarCodeScanned}  // Handle QR code scanning
        captureAudio={false}  // We don't need audio capture for QR scanning
      />

      {/* Button to reset scanning after a successful scan */}
      {scanned && (
        <TouchableOpacity onPress={() => setScanned(false)} style={styles.scanAgainButton}>
          <Text style={styles.scanAgainText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  scanAgainButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#175E5E',
    borderRadius: 5,
  },
  scanAgainText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default QRScannerScreen;
