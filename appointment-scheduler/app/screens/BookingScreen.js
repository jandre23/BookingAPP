import { useNavigation } from '@react-navigation/core';
import React,{forwardRef, useEffect,useState} from 'react';
import { View,Text, SafeAreaView, Button,StyleSheet,TouchableOpacity, Animated, FlatList, InteractionManager, TextInput} from 'react-native';

import packages from '../assets/washPackages'

const createUrl='http://localhost:8083/api/appointmentCreate'
let createApp= (name,email,slotDate,slotTime)=>{
    fetch(createUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": name,
          "email":email,
          "phone": "3478888888",
          "slot_time": ""+slotTime+"",
          "slot_date": slotDate
      })
      })
  
    
}

const InformationForm=({selectedDate,selectedTime,setSelectedTime})=>{
    const [nameText, setNameText] = React.useState("");
    const [emailText, setEmailText] = React.useState("");
    const [buttonDisabled,setDisabled]= useState(true);
    const navigation=useNavigation();
    
    const checkNameField=(text)=>{
        

        if (!text.trim()) {
            
            //setDisabled(true);
            return false;
          }
          return true;
        //setNameText(text);
       // setDisabled(false);
       
       

    }
    const checkEmailField=(text) => {
        
       
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          
          //setDisabled(true);
          return false;
        }
        else {
          //setEmailText(text);
          //if(nameText!=null&&nameText!="")setDisabled(false);
          console.log("Email is Correct");
          return true;
        }
      }
    
      const checkField=()=>{

        if((!checkNameField(nameText))&&(!checkEmailField(emailText))&&selectedTime==null){
            alert("please prroviide name and email and time desired")

        }
        else if((!checkNameField(nameText))&&(!checkEmailField(emailText))){
            alert("please prroviide name and email ")
        }
        else if(!checkNameField(nameText)&&selectedTime==null){
            alert("please prroviide name and time desired")
        }
        else if (!checkEmailField(emailText)&&selectedTime==null){
            alert("please prroviide email and time desired")
        }
        else if (!checkNameField(nameText)){
            alert("please prroviide name ")
        }
        else if(!checkEmailField(emailText)){
            alert("please prroviide  email ")
        }
        else {
            createApp(nameText,emailText,selectedDate.toJSON().substring(0,10),selectedTime)
            navigation.navigate('ConfirmationScreen', {name: nameText, date:selectedDate.toJSON().substring(0,10),time:selectedTime} )
        }
        
      }
    return (
        <View>
            <View style={styles.textContainer}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setNameText}
                    textContentType={'name'}
                    
                />
                <TextInput
                    style={styles.textInput}
                    onChangeText={setEmailText}
                    textContentType={'emailAddress'}
                    
                />
            </View>
           
            <TouchableOpacity
                style={styles.bookButtonTouch,{alignSelf:'center'}}
                
                onPress={()=>{
                    checkField()
                   console.log(nameText,emailText,selectedDate.toJSON().substring(0,10),selectedTime)
                   // navigation.navigate('ConfirmationScreen', {name: nameText, date:selectedDate.toJSON().substring(0,10),time:selectedTime} )
                }
               
                    
                }
                
            ><Text style={{fontSize:25,color:"#f194ff"}}>BOOK NOW </Text></TouchableOpacity>
            
            

          
        </View>
    )

}

const Dates=({item,selectedDate,setSelectedDate,datePress,setUnbookedTimes})=>{
        
        
    const backgroundColor = item.getDate() === selectedDate.getDate() ? "#6e3b6e" : "#f9c2ff";
    const color = item.getDate() === selectedDate.getDate() ? 'white' : 'black';
     return (<TouchableOpacity  
        style={[styles.numberCircle,{backgroundColor}]}
        onPress={()=>{
            
           
            datePress(item,setSelectedDate,setUnbookedTimes);
            
              
            }
        }
    ><Text  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: color,
                    fontSize: 15,
                    }}>{item.getDate()}</Text ></TouchableOpacity>)

}

const DateList=({dateArr,datePress,updateTimes})=>{
    const [selectedDate,setSelectedDate]= useState(new Date());
    let currentAvail= updateTimes(new Date(), [])
    const [unbookedTimes,setUnbookedTimes]=useState(currentAvail);

    return(
        <View >
               <FlatList
                horizontal
                data={dateArr}
                keyExtractor={(item, index) => index.toString()}
                extraData={selectedDate}
                renderItem ={({item,index})=><View style={{padding:10,height:60,width:60}}>
                    <Dates item={item} selectedDate={selectedDate} setSelectedDate={setSelectedDate} datePress={datePress} setUnbookedTimes={setUnbookedTimes}></Dates></View>}>
                

                </FlatList>
                <TimesList timeArr={unbookedTimes} updateTimes={updateTimes} selectedDate={selectedDate}></TimesList>
                
            
            </View>
    )
}
const Time=({item,selectedTime,setSelectedTime})=>{
    const backgroundColor = item.getHours() === selectedTime ? "#6e3b6e" : "#f9c2ff";
    const color = item.getHours()=== selectedTime ? 'white' : 'black';
    
   

    return (<TouchableOpacity  
        style={[styles.numberRect,{backgroundColor}]}
        onPress={()=>{setSelectedTime(item.getHours())
            
            }
            
        }
    ><Text  style={{
        alignSelf: 'center',
        fontWeight: 'bold',
        color: color,
        fontSize: 15,
        }}>{item.getHours()%12!=0?item.getHours()%12:12} :00 {item.getHours()/12>=1?"pm":"am"}</Text ></TouchableOpacity>)

}

const TimesList=({timeArr,selectedDate})=>{
        
   
    const [selectedTime,setSelectedTime]= useState(null);
    
    
    

    return(
        <View>
                <FlatList
                contentContainerStyle = {{alignItems:'center',
                paddingBottom:20,
                }}
                style={{height:300,
                }}
                data={timeArr}
                extraData={selectedTime}
                keyExtractor={(item, index) => index.toString()}
                renderItem ={({item,index})=><View style={{padding:15,height:60,width:60}}>
                   <Time item={item} selectedTime={selectedTime} setSelectedTime={setSelectedTime}></Time></View> }>
                  

                </FlatList>
                <InformationForm selectedDate={selectedDate } selectedTime={selectedTime} setSelectedTime={setSelectedTime}></InformationForm>
                
                
        </View>
        
            
    )
}

function BookingScreen({navigation}) {
    
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const url='http://localhost:8083/api/appointments';

    const timesUrl= 'http://localhost:8083/api/findDate'
   

    function roundToHour(date) {
        let p = 60 * 60 * 1000; // milliseconds in an hour
        return new Date(Math.ceil(date.getTime() / p ) * p);
      } 

    const dateArr = [...Array(14)].map((item, index) => {
        let d= new Date();
        let today= new Date();
        
        d.setDate(d.getDate()+index);

        return d
    });
    
    const updateTimes= (selectedDate,timesBooked)=>{
        let today= new Date();
        let da=  new Date(selectedDate);
        da= roundToHour(da);
        if( da.getDate()!=today.getDate())da.setHours(9,0,0,0)
        let closingTime = (21-da.getHours())
        
       // console.log("update times pressed");
       
        let updatedTimes=[];
        for( let i=0;i<closingTime+1;i++){
            let newHour =new Date(da);
            
            newHour.setHours(da.getHours()+i);
            if(!timesBooked.includes(""+newHour.getHours()+""))
           { updatedTimes.push(newHour);
            
           }
           
           
        }
        
       
        return updatedTimes;
        
        
    
    }

    const datePress= (selectedDate,setSelectedDate,setSelectedTimes)=>{
       
       
        fetch(timesUrl, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              
              "slot_date": selectedDate.toJSON().substring(0,10)
          })
          }).then(res=>res.json()) .then(
            (result) => {
              //setIsLoaded(true);
             let modTimes= result.map(obj=>{return obj.slot_time})
             
             
             setSelectedDate(selectedDate);
             
             setSelectedTimes(updateTimes(selectedDate,modTimes))
                
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in  components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
          
          
        
    }


   //useEffect(()=>{datePress()})


  
    










    

    const Package=(props)=>{

        let pkg= packages[props.id];

        return(<View style={styles.packages}>
            <Text style= { styles.packageText}>{pkg.name}</Text>
            <Text style= { styles.packageText}>{pkg.details}</Text>
            <Text style= { styles.packageText}>{pkg.price.sedan}</Text>
            
        </View>);
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View>
                <View>
                    <Animated.FlatList
                        onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                        {useNativeDriver: true},
                        )}
                        horizontal
                        data={packages}
                        contentContainerStyle={{
                            backgroundColor:'black',
                            paddingVertical: 30,
                            paddingHorizontal:20
                        
                        }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => <View style={styles.packages}><Package id= {index}></Package></View>}
                        
                    />
                </View>
                <DateList dateArr={dateArr} datePress={datePress} updateTimes={updateTimes}></DateList>
                
                    
            
                
                
                
           
           
           
            </View>
        </SafeAreaView>
    );
}
const styles= StyleSheet.create({
    packages:{
        padding:5,
        backgroundColor: '#2E405399',
        alignItems:'center',
        borderColor:'#000000',
        borderWidth:.25


   },
   numberCircle: {
    borderRadius: 50/2,
    width: 50,
    height: 50,
    padding: 8,
   
    textAlign: 'center',
    justifyContent:'center',

    fontFamily:"Futura",
},
numberRect: {
    borderRadius: 10,
    width: 150,
    height: 50,
    padding: 8,
    
    textAlign: 'center',
    justifyContent:'center',
    alignSelf:'center',
    fontFamily:"Futura",
},
textContainer:{
    height: 100,
    width: 300,
    alignSelf: 'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'yellow'
},
textInput:{ width: 100,
    backgroundColor:'white',
    
    borderBottomWidth:.5



},


})
export default BookingScreen;