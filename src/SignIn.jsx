import { View, Text,Button ,Pressable,TextInput} from 'react-native'
import React, { useState } from 'react'
import useZustanStore from './store/zustanStore'
import * as Keychain from 'react-native-keychain';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const SignIn = ({setHaveAccount,haveAccount}) => {

  const[userName,setUserName] = useState('')
  const[password,setPassword] = useState('')

  const {isLoggedIn,setIsLoggedIn,setAccessToken} = useZustanStore()

     const signin=async()=>{

      try{
        
          const res = await axios.post('https://backend.ecom.subraatakumar.com/api/v1/auth/signin',{
            userName,
            password
          })

         console.log(res.data)

         if(res.data.accessToken){
          setUserName('')
          setPassword('')
          // this is not secure storing / do either this way or below secure way 
          // this is only for checking via zustan too
          setAccessToken(res.data.accessToken)

          // for storing token in secure storage
          // do not need zustand for login logout we can use only by keychain this line is enough itself
           await Keychain.setGenericPassword("auth",res.data.accessToken, {service:'service_key'} )
           setIsLoggedIn(true)
          
         
         }

      }catch(err){
          console.log(err)
        
      }



    }


  return (
    <View >
      <Text>SignIn</Text>
      <TextInput placeholder='UserName' style={{borderWidth:1,marginVertical:5}}
        value={userName}
        onChangeText={setUserName}     // same as onChangeText={(text) => setUserName(text)}
      
      />
      <TextInput placeholder='password' style={{borderWidth:1,marginVertical:5}}
        value={password}
        onChangeText={setPassword}     // same as onChangeText={(text) => setUserName(text)}
      
      />
      <Button title='SignIN'  onPress={()=>signin()} />
       
       {/* // for navigate to signup page */}
        <Pressable  onPress={()=>setHaveAccount('signup')} 
        style={{ backgroundColor: 'white', padding: 10, marginTop: 10,color:"white"}}  >
            <Text>if you don't have account go to signUp</Text>
        </Pressable>
    </View>
  )
}

export default SignIn