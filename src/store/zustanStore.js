import {create} from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

//create store  as hook so name start from use

// create returns a function which return a object and we take out set prop 

const useZustanStore = create( 
   
persist(
    
(set)=>({
// here set and state named anything like instead of "state" i can write prev=>({count:prev.count+1})
 count:0,
 increment: ()=>set( (state)=>({count:state.count+1}) )  ,
 decrement: ()=>set( (state)=>({count:state.count-1}) ),
 reset: ()=>set({count:0}),
 // receive payload which is passing in button
 incrementBy: (payload) => set( state=>({count:state.count+payload}) ),

 accessToken:null,
 setAccessToken: (token)=>set( {accessToken:token} ),

 isLoggedIn:false,
 setIsLoggedIn:(value)=>set({isLoggedIn:value})

}) 

    ),
    {
        name:"counter", // set any unique name
        storage:createJSONStorage(()=>AsyncStorage)
    }

)

export default useZustanStore