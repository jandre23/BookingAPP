import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import packages from "../assets/washPackages";

function ConfirmationScreen({ route, navigation }, props) {
  const { name, date, time } = route.params;

  return (
    <SafeAreaView>
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderStyle: "solid",
          borderWidth: 1,
        }}
      >
        <View
          style={{ alignItems: "center", borderStyle: "solid", borderWidth: 1 }}
        >
          <Text style={{ fontFamily: "Futura", fontSize: 15 }}>
            Hi <Text style={{ fontWeight: "bold" }}>{name}</Text>{" "}
          </Text>
          <Text style={{ fontFamily: "Futura", fontSize: 15 }}>
            Your appointment is confirmed for{" "}
            <Text style={{ fontWeight: "bold" }}> {date} </Text>
            at <Text style={{ fontWeight: "bold" }}>{time} </Text>
          </Text>
          <Text style={{ fontFamily: "Futura", fontSize: 15 }}>
            See You Soon!
          </Text>
          <TouchableOpacity
            style={styles.bookButtonTouch}
            onPress={() => navigation.navigate("Home")}
          >
            <Text
              style={{ fontSize: 20, color: "#C10B0B", fontFamily: "Futura" }}
            >
              Back to home{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bookButtonTouch: {},
  confirmation: {},
});
export default ConfirmationScreen;
