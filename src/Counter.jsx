import { View, Text ,Button} from 'react-native'
import React from 'react'

import useZustanStore from './store/zustanStore';

const counter = () => {
 const {count,increment,decrement,reset,incrementBy} = useZustanStore()
 
 return <View style={{flex:1,justifyContent:'center',gap:10,alignItems:'center'}}>
 
    <Text style={{textAlign:'center'}}>Count: {count}  </Text>
    <View style={{ gap:5, flexDirection:'row',borderWidth:5}}>
       <Button title='increment' onPress={increment} />
       <Button title='decrement' onPress={decrement} />
       <Button title='increment5' onPress={()=>incrementBy(5)} />
       <Button title='reset' onPress={reset} />
    </View>
 
 </View>
}

export default counter