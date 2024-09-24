import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";


type Props = {};

const Home = (props: Props) => {

    return <Redirect href="/(auth)/Welcome"/>

};

export default Home;
