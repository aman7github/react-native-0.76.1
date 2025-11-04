import { View, Text } from 'react-native'
import React, { useState } from 'react'
import SignIn from './SignIn'
import Signup from './Signup'

const SignupSignin = () => {
   
    const[haveAccount,setHaveAccount] = useState('signup')


  return (
    <View  style={{flex:1,width:'100%',justifyContent:"center"}} >
      {haveAccount=='signin' && <SignIn setHaveAccount={setHaveAccount} haveAccount={haveAccount}   /> }
      {haveAccount=='signup'  && <Signup  setHaveAccount={setHaveAccount} haveAccount={haveAccount}  /> }
    </View>
  )
}

export default SignupSignin