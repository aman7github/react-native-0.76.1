import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home,Cart,Detail,ProductShow } from '../Screens';
import { View, Text,FlatList, TouchableOpacity,Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MyStack from './StackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SignupSignin from '../SignupSignin';

const Tab = createBottomTabNavigator();

function MyTab() {
     const navigationHook = useNavigation()
  return (
// to combined stack navigation and bottomtabnavigation we pass "whole Mystack" in tab as screen
// to avoid double header of home screen we set ' screenOptions={{headerShown:false}} ' at Tab.Navigator
// so we can use stack navigation back with bottomtab navigation ,
// important note if you did ' screenOptions={{headerShown:false}} ' in MyStack so then back navigation arrow option will
// not visible because you did ' screenOptions={{headerShown:false}} ' in stack navigation which give back arrow navigation


// instead of adding icon in each screens set here like this-

    <Tab.Navigator   screenOptions={({route})=>({
                  
                headerShown:false,
                 tabBarIcon:({focused})=>{
                   let iconName=''
                   if(route.name=="Home"){
                     iconName='home'
                   }else if(route.name=='Cart'){
                     iconName='cart'
                   }else if(route.name=='Detail'){
                     iconName='detail'
                   }

                   return <Ionicons name={iconName} size={20} color={focused?"green":"blue"}  />

                 }

    })}

    >


         <Tab.Screen name="Home" component={MyStack}
          options={()=>({
            headerRight:()=>(
                <Pressable  style={{backgroundColor:'gray',width:'40%',height:40,justifyContent:'center',borderRadius:5}} 
                        onPress={()=>navigationHook.navigate('ProductShow')}  >
                    <Text style={{textAlign:'center',color:"white"}} >Product Show Page</Text>             
               </Pressable>
            ),
            // tabBarIcon:({focused})=> <Ionicons name="home" size={20} color={focused?"green":"red"} />
         })}  
      />



         <Tab.Screen name='Cart' component={Cart} 
         // options={{
         //    tabBarIcon:()=> <Ionicons name="cart" size={25} />
         // }} 
          />




         <Tab.Screen name='Detail' component={Detail}  
            // options={{
            //   tabBarIcon:()=> <Ionicons name="detail" size={20} />
            // }}
         />

        


    </Tab.Navigator>
  );
}

export default MyTab