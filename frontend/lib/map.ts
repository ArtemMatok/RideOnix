import { DriverGetDto } from "@/models/driver";
import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: DriverGetDto[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Випадковий зсув для широти (приблизно до 1 км)
    const lngOffset = (Math.random() - 0.5) * 0.01; // Випадковий зсув для довготи (приблизно до 1 км)

    return {
      id: driver.driverId,
      latitude: userLatitude + latOffset, // Додаємо зміщення до широти користувача
      longitude: userLongitude + lngOffset, // Додаємо зміщення до довготи користувача
      title: `${driver.firstName} ${driver.lastName}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Додаємо відступ
  const longitudeDelta = (maxLng - minLng) * 1.3; // Додаємо відступ

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    const timesPromises = markers.map(async (marker) => {
      // Отримання часу від водія до користувача
      const responseToUser = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
      );
      const dataToUser = await responseToUser.json();
      if (
        !dataToUser.routes ||
        dataToUser.routes.length === 0 ||
        !dataToUser.routes[0].legs ||
        dataToUser.routes[0].legs.length === 0
      ) {
        console.error("Маршрут до користувача не знайдено для маркера:", marker);
        return { ...marker, time: null, price: null }; // Повернення, якщо є помилка
      }

      const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Час у секундах

      // Отримання часу від користувача до місця призначення
      const responseToDestination = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
      );
      const dataToDestination = await responseToDestination.json();
      if (
        !dataToDestination.routes ||
        dataToDestination.routes.length === 0 ||
        !dataToDestination.routes[0].legs ||
        dataToDestination.routes[0].legs.length === 0
      ) {
        console.error("Маршрут до місця призначення не знайдено для маркера:", marker);
        return { ...marker, time: null, price: null }; // Повернення, якщо є помилка
      }

      const timeToDestination =
        dataToDestination.routes[0].legs[0].duration.value; // Час у секундах

      const totalTime = (timeToUser + timeToDestination) / 60; // Загальний час у хвилинах
      const price = (totalTime * 0.5).toFixed(2); // Обчислення ціни на основі часу

      return { ...marker, time: totalTime, price };
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Помилка під час розрахунку часу водія:", error);
    return []; // Повернення порожнього масиву в разі помилки
  }
};
