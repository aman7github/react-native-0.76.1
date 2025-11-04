import { View, Text,FlatList, TouchableOpacity ,Pressable} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'




const Home = ({navigation}) => {

 const products = [
    {id:1,
     name:'table',
     price:80  
    },
    {id:2,
     name:'chair' ,
     price:90 
    }
]
  // name should ne navigation but i am already using navigation from stack navigation so name as navigationHook
  const navigationHook = useNavigation()

  const renderItem=({item})=>{
    return <TouchableOpacity
             onPress={()=> navigation.navigate('Detail',{product:item})  }
            >
             <View><Text>{item.name}</Text></View>
             <View><Text>{item.price}</Text></View>
          </TouchableOpacity>
  }

  return (
    <View>
      <Text>Home</Text>
      <FlatList   data={products}  renderItem={renderItem}  keyExtractor={item=>item.id} />

      <Pressable  style={{backgroundColor:'gray',width:'40%',height:40,justifyContent:'center',borderRadius:5}} 
        onPress={()=>navigationHook.navigate('ProductShow')}
      >
        <Text style={{textAlign:'center',color:"white"}} >Product Show Page</Text>
      </Pressable>
     
    </View>
  )
}

export default Home