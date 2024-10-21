import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { icons } from "@/constants";

type Props = {};

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${
        focused ? "bg-general-300" : ""
      }`}
    >
      <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400": ""}`}>
        <Image source={source} tintColor={"white"} resizeMode="contain" className="w-7 h-7" />
      </View>
    </View>
  );
};

const _layout = (props: Props) => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor:"white",
        tabBarShowLabel:false,
        tabBarStyle:{
          backgroundColor:"#333333",
          borderRadius:50,
          paddingBottom:0,
          overflow:"hidden",
          marginHorizontal:20,
          marginBottom:20,
          height:78,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          flexDirection:"row",
          position:"absolute"
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="Rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />

    </Tabs>
  );
};

export default _layout;
