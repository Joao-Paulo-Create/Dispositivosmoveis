import * as Location from 'expo-location';
import { Alert } from 'react-native';

export async function getCurrentPlace() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão negada', 'Permissão de localização foi negada.');
    return null;
  }
  let location = await Location.getCurrentPositionAsync({});
  let reverseGeocode = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  if (reverseGeocode.length > 0) {
    const place = reverseGeocode[0];
    return {
      label: `${place.street || 'Rua desconhecida'}, ${place.city || 'Cidade'}`,
    };
  }
  return { label: 'Localização desconhecida' };
}