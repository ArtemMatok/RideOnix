import { View, Text, FlatList } from 'react-native';
import React from 'react';
import RideLayout from '@/components/RideLayout';
import DriverCard from '@/components/DriverCard';
import CustomButton from '@/components/CustomButton';
import { useDriverStore } from '@/store';
import { router } from 'expo-router';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList 
        data={drivers} 
        renderItem={({ item }) => (
          <DriverCard 
            selected={selectedDriver!} 
            setSelected={() => setSelectedDriver(Number(item.driverId)!)} 
            item={item} 
          />
        )}
        keyExtractor={(item) => item.driverId.toString()}
        showsVerticalScrollIndicator={false} // Приховує індикатор прокрутки
        contentContainerStyle={{ paddingBottom: 20 }} // Додає відступ для кнопки
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton 
              disabled={!selectedDriver} 
              title="Select Ride" 
              onPress={() => router.push('/(root)/BookRide')} 
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
