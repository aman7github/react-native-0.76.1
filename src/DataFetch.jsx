import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const DataFetch = () => {

 const [product,setProduct] = useState()
 const [isLoading,setIsLoading] = useState(false)
 const [isError,setIsError] = useState()


//   useEffect(()=>{

//      const fetchData=async()=>{
//         setIsLoading(true)
//         console.log('fetching data')
        

//        try{
//        const res = await fetch('https://dummyjson.com/produc')
//        if(!res.ok){
//          throw new Error()
//        }
//        const data = await res.json()
//        setTimeout(async()=>{
      
//        console.log(data.products)
//        setProduct(data.products)
//        setIsLoading(false)
       
//        },3000)

//        }catch(err){
//          console.log("error is occuring",err)
//          setIsError(true)
//          setIsLoading(false)
//        }
//      }

//      fetchData()

//   },[])

  
  useEffect(()=>{

    const fetchData = async()=>{

        setIsLoading(true)
        console.log('loading...')
       // await new Promise(resolve=>setTimeout(resolve,3000))

     try{

     const res = await axios.get('https://dummyjson.com/products')
     setTimeout(()=>{
     console.log(res.data.products)
     setProduct(res.data.products)
     setIsLoading(false)
     },3000)
     

     }catch(err){
       console.log(err.message)
       setIsError(true)
       setIsLoading(false)
     }

    }

    fetchData()



  },[])











  return (
    <View>
     { isLoading?<Text>loding</Text>:<Text>data</Text>}
    </View>
  )
}

export default DataFetch