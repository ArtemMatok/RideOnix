import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useDriverStore, useLocationStore } from "@/store";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { MarkerData } from "@/types/type";
import { icons } from "@/constants";

const drivers = [
  {
    driver_id: 1, // додано id
    first_name: "James",
    last_name: "Wilson",
    title: "James Wilson", // додано title
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: 4.8,
    time: 2,

  },
  {
    driver_id: 2, // додано id
    first_name: "David",
    last_name: "Brown",
    title: "David Brown", // додано title
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    time: 10,
    rating: 4.6,

  },
  {
    driver_id: 3, // додано id
    first_name: "Michael",
    last_name: "Johnson",
    title: "Michael Johnson", // додано title
    profile_image_url:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
    car_image_url:
      "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
    car_seats: 4,
    time: 3,
    rating: 4.7,

  },
  {
    driver_id: 4, // додано id
    first_name: "Robert",
    last_name: "Green",
    title: "Robert Green", // додано title
    profile_image_url:
      "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
    car_image_url:
      "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
    car_seats: 4,
    time: 10,
    rating: 4.9,

  },
];

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();


  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  useEffect(() => {
    //TODO: Remove
    const createMarkers = () => {
      setDrivers(drivers);

      if (Array.isArray(drivers)) {
        if (!userLatitude || !userLongitude) return;

      
        const newMarkers = generateMarkersFromData({
          data: drivers,
          userLatitude:userLatitude, 
          userLongitude: userLongitude,
        });

        setMarkers(newMarkers);
      }
    };
    createMarkers();
  }, [drivers]);


  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.driver_id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          
          image={
            selectedDriver === marker.driver_id
              ? icons.selectedMarker
              : icons.marker
          }
        />
      ))}
    </MapView>
  );
};

export default Map;
