import { View, Text,AppState,Button,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { BlurView } from '@react-native-community/blur'

const Blur = () => {

  const [isBlur,setIsBlur] = useState(false)

  useEffect(() => {
    // Set up listener once
    const subscription = AppState.addEventListener('change', (state) => {
      console.log('App state:', state);
      setIsBlur(state !== 'active'); // true if app goes to background/inactive
    });

    // Cleanup listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);
  


  return (
    <View  style={{gap:20}}>
      <Text>On background this text will be Blur or when click on button</Text>
      {
        // here before this BlurView everything become blur view because of stylesheet.absoluteFill style
        // it is set to position absoulte so that, underhood stylesheet.absoluteFill style is style={{ position: 'absolute',top: 0, right: 0, bottom: 0, left: 0}}
        // if you want any sepecifi position blur on page then make position relative and width height percente set how many want to blur
          isBlur && <BlurView blurType='light' blurAmount={5}
            style={StyleSheet.absoluteFill} // by default it is present in stylesheet
          />

      }
    
       <Button  title={isBlur?"content is blur now ":'content is not blur yet'}
         onPress={()=>setIsBlur(!isBlur)}
       />


    </View>
  )
}

export default Blur