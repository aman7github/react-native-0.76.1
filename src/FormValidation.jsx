import { View, Text,TextInput,StyleSheet,Button } from 'react-native'
import React, { useState } from 'react'
import {useForm , Controller} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const FormValidation = () => {

//  const [userName,setUserName] = useState('')
//  const [userError,setUserError] = useState('')

//  const validateUserName=(val)=>{
//    if(val.length<8){
//       setUserError('userName can not be less than 8 letters')
//    }else{
//     setUserError('')
//    }
   
//    setUserName(val)

//  }

// note - for validation we need two library 'yup' and '@hookform/resolvers' then link to form
// for validation this loginSchema 
// not only required, min,max it has lots of validation like email and others after yup.string(). go for suggestions
   const loginSchema = yup.object().shape({
     userName: yup.string().required('required username').min(6,'minimum char should be atleast 6')
               .max(10,'can not be exceed than 10 letters'),
      email: yup.string().email('not a valid email').required('email required')  ,         
     pass: yup.string().required('required pass').min(6,'minimum char should be atleast 6')
               .max(10,'can not be exceed than 10 letters'),           
   })

// link this control to controller's control and destructure handlesubmit,formState from useForm
  const {control, handleSubmit ,formState:{errors}  } = useForm({
    defaultValues:{
        email:"",
        userName:"",
        pass:""
    },
    resolver:yupResolver(loginSchema)
  })
 
  console.log('component is rendering')

  const submitFn=(data)=>{
   console.log(data)
  }

 





  return (
    // <View>
    //   <TextInput  style={styles.input} value={userName} onChangeText={(val)=>validateUserName(val)}  />
    //   <Text style={{color:'red'}}  >{userError}</Text>
    // </View>


    <View>
    
        <Controller 
        control={control}
     
        // in render pass fun and inside that fn destructure field object and its value and onchange  
        render={({field:{value,onChange}})=>{
            return  <TextInput value={value}  onChangeText={onChange} style={styles.input} placeholder='userName' />
        }}  
          name='userName'
          
        />
        {errors.userName && <Text style={{color:'red'}} > {errors.userName.message} </Text>}
        

        <Controller 
        control={control}
        render={ ({field:{value,onChange}})=>{
          return <TextInput  value={value} onChangeText={onChange}  style={styles.input} placeholder='email' />
        } }
        name='email'
       
        />
        {errors.email && <Text style={{color:'red'}} > {errors.email.message} </Text>}

        
        <Controller 
        control={control}
        render={ ({field:{value,onChange}})=>{
          return <TextInput  value={value} onChangeText={onChange}  style={styles.input}
           placeholder='password' secureTextEntry />
        } }
        name='pass'
        
       
        />
        {errors.pass && <Text style={{color:'red'}} > {errors.pass.message} </Text>}


        // pass submitfn in handleSubmit fn which is destructured from useForm
        <Button title='submit' onPress={handleSubmit(submitFn)} />

    </View>

  )
}

export default FormValidation

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderRadius:4,
        borderColor:'black'
    }
})