import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import SlidingUnlockButton from './SlidingUnlockButton'; // Adjust the path as needed

const serverUrl = 'http://192.168.100.19:5000';

export default function App() {
  // Define the sendUnlockCommand function
  const sendUnlockCommand = async () => {
    try {
      const response = await axios.post(`${serverUrl}/unlock`);
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Error unlocking door:', error);
      Alert.alert('Error', 'Error unlocking door');
    }
  };

  // Define the sendLockCommand function
  const sendLockCommand = async () => {
    try {
      const response = await axios.post(`${serverUrl}/lock`);
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Error locking door:', error);
      Alert.alert('Error', 'Error locking door');
    }
  };

  // Define the sendTULCommand function
  const sendTULCommand = async () => {
    try {
      const response = await axios.post(`${serverUrl}/tul`);
      Alert.alert('Success', response.data.message);
    } catch (error) {
      console.error('Error performing action:', error);
      Alert.alert('Error', 'Error performing action');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <SlidingUnlockButton onUnlock={sendTULCommand} />
        <TouchableOpacity style={styles.button2} onPress={sendUnlockCommand}>
          <Text style={styles.buttonText2}>Unlock Door</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button3} onPress={sendLockCommand}>
          <Text style={styles.buttonText3}>Lock Door</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '50%',
    height: 200,
    resizeMode: 'stretch',
    marginBottom: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'yellow',
    borderRadius: 90,
    padding: 20,
    alignItems: 'center',
    height: 250,
  },
  button2: {
    borderRadius: 20,
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    width: '50%',
    height: 70,
    top:20
  },
  button3: {
    borderRadius: 20,
    backgroundColor: 'grey',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
    width: '50%',
    height: 70,
    textAlign: 'center',
    top:20
  },
  buttonText2: {
    color: 'yellow',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonText3: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
});
