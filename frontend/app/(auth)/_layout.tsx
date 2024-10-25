import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

type Props = {}

const Layout = (props: Props) => {
  return (
    
    <Stack>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="SignUpDriver" options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" options={{ headerShown: false }} />
        <Stack.Screen name="SignInDriver" options={{ headerShown: false }} />
        <Stack.Screen name="SelectRegister" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout