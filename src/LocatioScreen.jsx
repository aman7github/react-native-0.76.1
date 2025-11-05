import { View, Text, Button,ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import MapView,{Marker} from 'react-native-maps';

const LocationScreen = () => {

  // Note if you want navigation line route in map then for that you have to use google geolocation api but it require card details
  // for free version another option is https://project-osrm.org/docs/v5.24.0/api/#

  const [locationValue,setLocationValue] = useState(null)
  const mapRef = useRef(null);
  const [address,setAddress] = useState('')

  // these things give only locatin as longitude and latitude but we want full address
  // for that we have in expo location location.reverseGeocodeAsync 

   useEffect(()=>{

     let subscription;
     let geocode;

     async function getLocation() {

    try{
      // for checking location permission
     const { status } = await Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    //  to track current location
     const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
     });
    console.log("promise location",loc.coords);
    setLocationValue(loc.coords)

     // for watch live location use Location.watchPositionAsync
    //  but if you want to track "live keep sending you update" like taxi booking app how much distance cover or left
    //  Location.watchPositionAsync takes two things 1st object 2nd callback fn
      subscription = await Location.watchPositionAsync({
       accuracy:Location.Accuracy.High,
       timeInterval:5000,   // track at every 5 sec
       distanceInterval:10   // track at every 10 meter moves
     },
     async(location)=>{
      // here i am dynamically change loacation coords when user moves
      console.log("taxi location",location.coords)
      setLocationValue(location.coords);
    

      // for getting address from coordinates using  Location.reverseGeocodeAsync
          
      geocode = await Location.reverseGeocodeAsync({
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
      })
      if(geocode.length>0){
        let place = geocode[0]
        const fullAddress = `${place.name||''} ${place.street||''} ${place.city||''} 
        ${place.region||''} ${place.postalCode||''} ${place.country||''}`
        setAddress(fullAddress)
      }

   //  Animate map smoothly to new live location and stop again2 re-render
            if (mapRef.current) {
              mapRef.current.animateToRegion(
                {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                },
                1000 // 1 second smooth animation
              );
            }


     }
    )

  
    }catch(err){
      console.log(err)
    }

  }

    getLocation()

   // NOte--- its important when user unmount remove tracking
      return ()=>{
        if(subscription){
          subscription.remove()
        }
      }

   },[])
   

    if (!locationValue) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Fetching location...</Text>
      </View>
    );
  }


  return (
    <View  style={{ flex: 1 ,width:'100%'}}>
     
  
     <MapView
           ref={mapRef}
           provider="google"
           style={{ flex: 1, width: '100%' }}
            initialRegion={{
              latitude: locationValue.latitude,
              longitude: locationValue.longitude,
             latitudeDelta: 0.01,
             longitudeDelta: 0.01,
           }}
  
    >

       {/* draggable make marker drag one place to another and onDragEnd give exact 
       longitude and latitude of dragged placed */}
         <Marker coordinate={{
          latitude: locationValue.latitude,
          longitude: locationValue.longitude
         }}
           title="New Delhi" 
           draggable
           onDragEnd={(e)=>setLocationValue(e.nativeEvent.coordinate)}
           pinColor='blue'
         />

  </MapView>

  
    {
      locationValue? <Text style={{height:100,width:"100%"}} >
      location:{locationValue.latitude} latitute:{locationValue.longitude} address:{address}
      </Text> : <Text>location fetching...</Text>
    }


   
   
    </View>
  );
};

export default LocationScreen;
