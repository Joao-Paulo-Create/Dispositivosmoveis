import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

export default function ProfileScreen() {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    async function loadSavedPhoto() {
      const savedUri = await AsyncStorage.getItem('@profile-photo');
      if (savedUri) {
        setImageUri(savedUri);
      }
    }
    loadSavedPhoto();
  }, []);

  const handlePickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImageUri(uri);
      await AsyncStorage.setItem('@profile-photo', uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        <Image 
          source={imageUri ? { uri: imageUri } : { uri: 'https://via.placeholder.com/150' }} 
          style={styles.avatar} 
        />
      </TouchableOpacity>
      <Text style={styles.text}>Toque na foto para alterar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  text: { fontSize: 14, color: '#666' }
});