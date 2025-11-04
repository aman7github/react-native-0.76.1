import { createStackNavigator } from '@react-navigation/stack';
import {Cart,Home,Detail,ProductShow} from '../Screens'
import { View ,Pressable,Text} from 'react-native';
import SignupSignin from '../SignupSignin';
import SignIn from '../SignIn';
import Signup from '../Signup';
import useZustanStore from '../store/zustanStore';
import { useState } from 'react';
import * as Keychain from 'react-native-keychain';

const Stack = createStackNavigator();

function MyStack() {

  const {isLoggedIn,setIsLoggedIn,accessToken} = useZustanStore()
  console.log('this is acces token in mystack',accessToken)


  const handlelogout=async()=>{
   // before logout clear/reset key 
    await Keychain.resetGenericPassword({service: 'service_key'});
    setIsLoggedIn(false)
  }

  useState(()=>{
   // create fn for accessing token from secure storage and base on that showing signinpage or other page
   const checkSecureTokenFn= async()=>{
                 
    const credentials = await Keychain.getGenericPassword({service: 'service_key'});
    // does not matter whatever key and value name you set while storing access token
    // always for getting key use username and for value/accesstoken use password , it internally store like
    // console.log(credentials);
    // Output: { username: "auth", password: "12345-token" }
    if (credentials.password && credentials.password.length>0) {
       setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }

   }

     checkSecureTokenFn()

  },[])



   return <Stack.Navigator  >
    
           { isLoggedIn?  <Stack.Screen name='Home' component={Home} 

              options={({navigation,route})=>({
                title:'All products',
                  headerRight:()=>{
                     return <View  style={{flexDirection:'row',gap:10,padding:3}} >
                             <Pressable style={{backgroundColor:'red'}} 
                               onPress={()=>navigation.navigate('SignupSignin')   }      >
                              <Text>SignUp</Text>
                             </Pressable>

                              <Pressable style={{backgroundColor:'red',padding:3}} 
                               onPress={ handlelogout  }      >
                              <Text>Logout</Text>
                             </Pressable>
                     </View>
                  },
                  headerStyle: { backgroundColor: "blue",height: 70,borderBottomWidth: 10, borderBottomColor: "yellow" },
                  headerTitleStyle: { fontWeight: "bold",fontSize: 22,color: "white"}


              })
               
            }
            
            /> :      <Stack.Screen name='SignupSignin' component={SignupSignin} 
                options={{
                  title:'Signup/Signin Page'
                }}
             />


              }




            {/* <Stack.Screen name='Cart' component={Cart}  />
            <Stack.Screen name='Detail' component={Detail}  /> */}
            <Stack.Screen name="ProductShow" component={ProductShow} />

       
              {/* <Tab.Screen name='Signin' component={SignIn} />
              <Tab.Screen name='Signup' component={Signup} /> */}
         </Stack.Navigator>
}

export default MyStack



// OR i can do that also by using useNavigation hook

// import { useNavigation } from '@react-navigation/native';

// function CartButton() {
//   const navigation = useNavigation();
//   return (
//     <Pressable
//       style={{ backgroundColor: 'red', padding: 5 }}
//       onPress={() => navigation.navigate('Cart')}
//     >
//       <Text style={{ color: 'white' }}>Cart</Text>
//     </Pressable>
//   );
// }

// // Then in your Stack.Screen:
// <Stack.Screen
//   name='Home'
//   component={Home}
//   options={{
//     title: 'All products',
//     headerRight: () => <CartButton />,
//   }}
// />
