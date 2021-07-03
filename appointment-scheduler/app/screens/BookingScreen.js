import { useNavigation } from "@react-navigation/core";
import React, { forwardRef, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  InteractionManager,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";

import packages from "../assets/washPackages";

const createUrl = "http://localhost:8083/api/appointmentCreate";
let createApp = (name, email, slotDate, slotTime) => {
  fetch(createUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: "3478888888",
      slot_time: "" + slotTime + "",
      slot_date: slotDate,
    }),
  });
};

const InformationForm = ({ selectedDate, selectedTime, setSelectedTime }) => {
  const [nameText, setNameText] = React.useState("");
  const [emailText, setEmailText] = React.useState("");
  const [buttonDisabled, setDisabled] = useState(true);
  const navigation = useNavigation();

  const checkNameField = (text) => {
    if (!text.trim()) {
      //setDisabled(true);
      return false;
    }
    return true;
    //setNameText(text);
    // setDisabled(false);
  };
  const checkEmailField = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      //setDisabled(true);
      return false;
    } else {
      //setEmailText(text);
      //if(nameText!=null&&nameText!="")setDisabled(false);
      console.log("Email is Correct");
      return true;
    }
  };

  const checkField = () => {
    if (
      !checkNameField(nameText) &&
      !checkEmailField(emailText) &&
      selectedTime == null &&
      selectedDate == null
    ) {
      alert("please prroviide name and email and date and time desired ");
    } else if (!checkNameField(nameText) && !checkEmailField(emailText)) {
      alert("please prroviide name and email ");
    } else if (!checkNameField(nameText) && selectedTime == null) {
      alert("please prroviide name and time desired");
    } else if (!checkEmailField(emailText) && selectedTime == null) {
      alert("please prroviide email and time desired");
    } else if (!checkNameField(nameText)) {
      alert("please prroviide name ");
    } else if (!checkEmailField(emailText)) {
      alert("please prroviide  email ");
    } else if (selectedDate == null) {
      alert("please prroviide  date ");
    } else if (selectedTime == null) {
      alert("please prroviide  time ");
    } else {
      createApp(
        nameText,
        emailText,
        selectedDate.toJSON().substring(0, 10),
        selectedTime
      );
      navigation.navigate("ConfirmationScreen", {
        name: nameText,
        date: selectedDate.toJSON().substring(0, 10),
        time: selectedTime,
      });
    }
  };
  return (
    <View>
      <ImageBackground
        source={require("../assets/r8.jpg")}
        style={{ width: "100%", height: 100 }}
      >
        <View style={styles.textContainer}>
          <Text
            style={(styles.detailText, { fontSize: 15, fontWeight: "bold" })}
          >
            Enter your name and email below
          </Text>
          <View
            styles={{
              height: 50,
              alignContent: "center",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              onChangeText={setNameText}
              textContentType={"name"}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              onChangeText={setEmailText}
              textContentType={"emailAddress"}
            />
          </View>
        </View>
      </ImageBackground>

      <TouchableOpacity
        style={(styles.bookButtonTouch, { alignSelf: "center" })}
        onPress={() => {
          checkField();
          console.log(nameText, emailText, selectedDate, selectedTime);
          // navigation.navigate('ConfirmationScreen', {name: nameText, date:selectedDate.toJSON().substring(0,10),time:selectedTime} )
        }}
      >
        <Text style={{ fontSize: 25, color: "#C10B0B" }}>BOOK NOW </Text>
      </TouchableOpacity>
    </View>
  );
};

const Dates = ({
  item,
  selectedDate,
  setSelectedDate,
  datePress,
  setUnbookedTimes,
}) => {
  let backgroundColor = "#434547";
  let color = "#C10B0B";
  if (selectedDate != null) {
    backgroundColor =
      item.getDate() === selectedDate.getDate() ? "#C10B0B" : "#434547";
    color = item.getDate() === selectedDate.getDate() ? "#434547" : "#C10B0B";
  }

  return (
    <TouchableOpacity
      style={[styles.numberCircle, { backgroundColor }]}
      onPress={() => {
        datePress(item, setSelectedDate, setUnbookedTimes);
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          color: color,
          fontSize: 15,
        }}
      >
        {item.getDate()}
      </Text>
    </TouchableOpacity>
  );
};

const DateList = ({ dateArr, datePress, updateTimes }) => {
  let randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - 1);
  const [selectedDate, setSelectedDate] = useState(null);
  let currentAvail = updateTimes(new Date(), []);
  const [unbookedTimes, setUnbookedTimes] = useState(currentAvail);

  return (
    <View>
      <FlatList
        horizontal
        data={dateArr}
        contentContainerStyle={{ backgroundColor: "white" }}
        keyExtractor={(item, index) => index.toString()}
        extraData={selectedDate}
        renderItem={({ item, index }) => (
          <View style={{ padding: 10, height: 60, width: 60 }}>
            <Dates
              item={item}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              datePress={datePress}
              setUnbookedTimes={setUnbookedTimes}
            ></Dates>
          </View>
        )}
      ></FlatList>
      <TimesList
        timeArr={unbookedTimes}
        updateTimes={updateTimes}
        selectedDate={selectedDate}
      ></TimesList>
    </View>
  );
};
const Time = ({ item, selectedTime, setSelectedTime }) => {
  const backgroundColor =
    item.getHours() === selectedTime ? "#C10B0B" : "#434547";
  const color = item.getHours() === selectedTime ? "#434547" : "#C10B0B";

  return (
    <TouchableOpacity
      style={[styles.numberRect, { backgroundColor }]}
      onPress={() => {
        setSelectedTime(item.getHours());
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontWeight: "bold",
          color: color,
          fontSize: 15,
        }}
      >
        {item.getHours() % 12 != 0 ? item.getHours() % 12 : 12} :00{" "}
        {item.getHours() / 12 >= 1 ? "pm" : "am"}
      </Text>
    </TouchableOpacity>
  );
};

const TimesList = ({ timeArr, selectedDate }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
          backgroundColor: "white",
        }}
        style={{ height: 300 }}
        data={timeArr}
        extraData={selectedTime}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ padding: 15, height: 60, width: 60 }}>
            <Time
              item={item}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            ></Time>
          </View>
        )}
      ></FlatList>
      <InformationForm
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      ></InformationForm>
    </View>
  );
};

function BookingScreen({ navigation }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const url = "http://localhost:8083/api/appointments";

  const timesUrl = "http://localhost:8083/api/findDate";

  function roundToHour(date) {
    let p = 60 * 60 * 1000; // milliseconds in an hour
    return new Date(Math.ceil(date.getTime() / p) * p);
  }

  const dateArr = [...Array(14)].map((item, index) => {
    let d = new Date();
    let today = new Date();

    d.setDate(d.getDate() + index);

    return d;
  });

  const updateTimes = (selectedDate, timesBooked) => {
    let today = new Date();
    let da = new Date(selectedDate);
    da = roundToHour(da);
    if (da.getDate() != today.getDate()) da.setHours(9, 0, 0, 0);
    let closingTime = 21 - da.getHours();

    // console.log("update times pressed");

    let updatedTimes = [];
    for (let i = 0; i < closingTime + 1; i++) {
      let newHour = new Date(da);

      newHour.setHours(da.getHours() + i);
      if (!timesBooked.includes("" + newHour.getHours() + "")) {
        updatedTimes.push(newHour);
      }
    }

    return updatedTimes;
  };

  const datePress = (selectedDate, setSelectedDate, setSelectedTimes) => {
    fetch(timesUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slot_date: selectedDate.toJSON().substring(0, 10),
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          //setIsLoaded(true);
          let modTimes = result.map((obj) => {
            return obj.slot_time;
          });

          setSelectedDate(selectedDate);

          setSelectedTimes(updateTimes(selectedDate, modTimes));
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in  components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  //useEffect(()=>{datePress()})

  const Package = (props) => {
    let pkg = packages[props.id];

    return (
      <View style={styles.packages}>
        <Text style={(styles.detailText, { fontWeight: "bold" })}>
          {pkg.name}
        </Text>
        <Text style={styles.detailText}>{pkg.details}</Text>
        <Text style={styles.detailText}>{pkg.price.sedan}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <View style={{ height: 150 }}>
          <Image
            source={require("../assets/r8_2.jpg")}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          ></Image>
        </View>
        <View>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            horizontal
            data={packages}
            contentContainerStyle={{
              backgroundColor: "white",
              paddingVertical: 20,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <Package id={index}></Package>}
          />
        </View>
        <View
          style={{
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <Text
            style={(styles.detailText, { fontSize: 20, fontWeight: "bold" })}
          >
            Choose a date and time{" "}
          </Text>
        </View>
        <DateList
          dateArr={dateArr}
          datePress={datePress}
          updateTimes={updateTimes}
        ></DateList>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  bookButtonTouch: {},

  detailText: {
    fontFamily: "Futura",
  },
  packages: {
    padding: 2,
    backgroundColor: "#CDD2D5",
    alignItems: "center",
    borderColor: "white",
    margin: 1,
  },
  numberCircle: {
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    padding: 8,

    textAlign: "center",
    justifyContent: "center",

    fontFamily: "Futura",
  },
  numberRect: {
    borderRadius: 10,
    width: 150,
    height: 50,
    padding: 8,

    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "Futura",
  },
  textContainer: {
    height: 100,
    width: 300,
  },
  textInput: {
    width: 120,
    backgroundColor: "white",

    margin: 8,
    marginLeft: 20,
  },
});
export default BookingScreen;
