/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { View,Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigator/StackNavigator';
import MyTab from './navigator/MyTab';

import Counter from './Counter';
import FormValidation from './FormValidation';
import DataFetch from './DataFetch';
import SignupSignin from './SignupSignin';
import Blur from './Blur';
import LocatioScreen from './LocatioScreen';


// const App=()=>{

// return <NavigationContainer>  
//          <MyTab />
//        </NavigationContainer>

// }


const App=()=>{

return <View style={{flex:1,borderWidth:5,justifyContent:"center",alignItems:'center'}} >

  {/* <FormValidation />
  <DataFetch />
  <SignupSignin /> */}
  {/* <Blur /> */}
 {/* <Text>app</Text> */}
 <LocatioScreen />
</View>


}



 export default App;




