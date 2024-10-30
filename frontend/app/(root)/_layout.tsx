import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

type Props = {}

const _layout = (props: Props) => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="FindRide" options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmRide" options={{ headerShown: false }} />
        <Stack.Screen name="BookRide" options={{ headerShown: false }} /> 
        <Stack.Screen name="PaymentChoose/[rideId]" options={{ headerShown: false }} /> 
    </Stack>
  )
}

export default _layout