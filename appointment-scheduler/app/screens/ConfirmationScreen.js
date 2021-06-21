import React,{useEffect,useState} from 'react';
import { Image, ImageBackground,SafeAreaView,StyleSheet, View,Text, Button,TouchableOpacity} from 'react-native';
import packages from '../assets/washPackages'

function ConfirmationScreen({route,navigation},props) {

   
    

  const {name,date,time}=route.params;
 
    




 
    return (<View>
        
        <Text>hi {name}  </Text>
        <Text>your appointment  is cofirmeed  for {date} at {time}  </Text>
    <TouchableOpacity style={styles.bookButtonTouch} onPress={()=>navigation.navigate('Home')}>
    <Text style={{fontSize:25,color:"#f194ff"}}>Back  tto home </Text>
</TouchableOpacity>
</View>

);
}

const styles = StyleSheet.create({
   

    
})
export default ConfirmationScreen;