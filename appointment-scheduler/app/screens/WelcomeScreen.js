import React,{useEffect,useState} from 'react';
import { Image, ImageBackground,SafeAreaView,StyleSheet, View,Text, Button,TouchableOpacity} from 'react-native';
import packages from '../assets/washPackages'

function WelcomeScreen({navigation},props) {

   
    
    

    const Package=(props)=>{

        let pkg= packages[props.id];

        return(<View style={styles.packages}>
            <Text style= { styles.packageText}>{pkg.name}</Text>
            <Text style= { styles.packageText}>{pkg.details}</Text>
            <Text style= { styles.packageText}>{pkg.price.sedan}</Text>
            
        </View>);
    }

 
    




 
    return (
       
       <SafeAreaView style={{flex:1, backgroundColor:'#898b8c'}}>
        <ImageBackground
            style= {styles.background}
            source={require("../assets/ferrari-458.jpg")}
        >
            <View style={styles.logoContainer}>
                <Image source={require("../assets/logo-social.png")}
                    style={styles.logo}></Image>
                <Text style={styles.logoText}>Give us your car,we give you exelence</Text>
            </View>
           
            <View   style= {styles.packagesContainer}>
                <Package id= "0"/>
                <Package id= "1"/>
                <Package id= "2"/>
                <Package id= "3"/>

               
            </View>
            <View style= {{top:50,
                padding:20}}>
            
            <TouchableOpacity style={styles.bookButtonTouch} onPress={()=>navigation.navigate('BookingScreen')}>
                <Text style={{fontSize:25,color:"#f194ff"}}>BOOK NOW </Text>
            </TouchableOpacity>
            </View>

        </ImageBackground>
        </SafeAreaView>
           
    );
}

const styles = StyleSheet.create({
    background: {
        flex:1,
        
        
    },
    logo:{
       
        width:100,
        height:100

    },
    logoContainer:{
        
        height:200,
        width:'100%',
        top: 70,
        alignItems:'center',
        
    },
    logoText:{
        fontFamily: "Cochin",
        fontSize:25,
        textAlign:"center",
        color:`#575789`
    },
    packages:{
         padding:5,
         backgroundColor: '#2E405399',
         alignItems:'center',
         borderColor:'#000000',
         borderWidth:.25


    },
    packageText:{
        fontFamily:"Futura",
        fontSize:20,
        textAlign: "center"},

    packagesContainer:{
        top:40,
        
      
        
        width:'100%',
        
        
       

    },
    ourCompany:{
     
        height: 100,
        width:'100%',
        opacity:.5,
        backgroundColor:`#778899`

    },
    bookButton:{
    color:`#778899`

    },
     bookButtonTouch:{
         backgroundColor:`#778899`,
         alignItems:"center",
         

     }



    
})
export default WelcomeScreen;