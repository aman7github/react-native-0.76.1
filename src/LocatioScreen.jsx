import { View, Text, Button } from 'react-native';
import React, { useState } from 'react';
import * as Location from 'expo-location';

const LocationScreen = () => {

  const [locationValue,setLocationValue] = useState()

  async function getLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    console.log(loc);
    setLocationValue(loc.coords.altitude)
  }

  return (
    <View>
      <Text>Location</Text>
      <Text>{locationValue}</Text>
      <Button title="Fetch Location" onPress={getLocation} />
    </View>
  );
};

export default LocationScreen;
