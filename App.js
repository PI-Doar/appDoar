

import React from "react";
import ListScreen from "./contactList/ListScreen";
import Login from "./login/login";
import BoasVindas from "./login/boasVindas";
import Cadastro from "./cadastro/cadastro";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import axios from 'axios';


const Stack = createNativeStackNavigator();


export default  () => {

  defineInterceptor();

  return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={headerStyle}>
        <Stack.Screen name="boasVindas" component={BoasVindas} options={{headerShown: false}} /> 
        <Stack.Screen name="login" component={Login} options={{headerShown: false}} />   
        <Stack.Screen name="list" component={ListScreen} options={{title:'Feed'}}/>               
        <Stack.Screen name="cadastro" component={Cadastro} options={{title: 'Cadastro'}}/> 
                                     
        
        </Stack.Navigator>
    </NavigationContainer>
  )
}
function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
          .then((res) => {
            AsyncStorage.setItem("TOKEN", res.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
            return axios(originalReq)
          })
          resolve(res)
        })
      }else{
        reject(err)
      }
    })
  })
}


const headerStyle = {
  headerStyle :{
    //backgroundColor: '#001219',
    //color:'white'
  },
  headerTintColor: 'white '
}
