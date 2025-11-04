import { View, Text,Button,Pressable,TextInput } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import useZustanStore from './store/zustanStore'

const Signup = ({setHaveAccount,haveAccount}) => {

    const[userName,setUserName] = useState('')
    const[password,setPassword] = useState('')
     const {setAccessToken} = useZustanStore()

    const signup=async()=>{

      try{
        
          const res = await axios.post('https://backend.ecom.subraatakumar.com/api/v1/auth/signup',{
            userName,
            password
          })

         console.log(res.data)

         if(res.data.accessToken){
          setUserName('')
          setPassword('')
          setAccessToken(res.data.accessToken)
         }

      }catch(err){
          console.log(err)
      }



    }


  return (
    <View >
      <Text>Signup</Text>
      <TextInput placeholder='UserName' style={{borderWidth:1,marginVertical:5}} 
        value={userName}
        onChangeText={setUserName}    // same as onChangeText={(text) => setUserName(text)}
      />

      <TextInput placeholder='password' style={{borderWidth:1,marginVertical:5}} 
        value={password}
        onChangeText={setPassword}     // same as onChangeText={(text) => setUserName(text)}
      />
      <Button title='SignUp'  onPress={()=>signup()} />


      <Pressable   onPress={()=>setHaveAccount('signin')} 
    
      style={{ backgroundColor: 'white', padding: 10, marginTop: 10 }}  >
                 <Text>if you have account go to signIn</Text>
     </Pressable>
    </View>
  )
}

export default Signup


//  https://backend.ecom.subraatakumar.com/api/v1/auth/signup