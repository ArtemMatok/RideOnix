import { View, Text, Image } from 'react-native'
import React from 'react'
import { GoogleInputProps } from '@/types/type';
import{GooglePlacesAutocomplete} from "react-native-google-places-autocomplete"
import 'react-native-get-random-values';
import { EXPO_PUBLIC_GOOGLE_API_KEY } from '@/constants/urlApi';
import { icons } from '@/constants';


const googlePlacesApiKey = EXPO_PUBLIC_GOOGLE_API_KEY

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress
}: GoogleInputProps) => {
  return (
    <View className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5` }>
      <GooglePlacesAutocomplete 
        fetchDetails={true}
        placeholder='Where you wanna go?'
        debounce={200}
        styles={{
          textInputContainer:{
            alignItems:"center",
            justifyContent:"center",
            borderRadius:20,
            marginHorizontal:20,
            position:"relative",
            shadowColor:"#d4d4d4",
          },
          textInput:{
            backgroundColor:textInputBackgroundColor || "white",
            fontSize:16,
            fontWeight:600,
            marginTop:5,
            width:"100%",
            borderRadius:200,
          },
          listView:{
            backgroundColor:textInputBackgroundColor || "white",
            position:"relative",
            top:0,
            width:"100%",
            borderRadius:10,
            shadowColor:"#d4d4d4",
            zIndex:99,
          }
        }}
        onPress={(data,details = null) => {
          handlePress({
            latitude:details?.geometry.location.lat!,
            longitude:details?.geometry.location.lng!,
            address:data.description
          });
        }}
        query={{
          key:googlePlacesApiKey,
          language:"en",
        }}
        renderLeftButton={() => (
          <View  className='justify-center items-center w-6 h-6'>
            <Image 
              source={icon ? icon : icons.search}
              resizeMode="contain"
              className='w-6 h-6'
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor:"gray",
          placeholder:initialLocation ?? "Where do you wanna go?"
        }}
      />
    </View>
  )
}

export default GoogleTextInput;