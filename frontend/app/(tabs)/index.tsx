import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
   <SafeAreaView className='flex-1 items-center justify-center bg-white'>
      <Text className='text-2xl'>RideOnix</Text>
      <StatusBar></StatusBar>
   </SafeAreaView>
  );
}

