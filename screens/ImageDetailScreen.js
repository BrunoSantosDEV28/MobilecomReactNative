import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ImageDetailScreen = ({ route }) => {
  const { imageDetails } = route.params; 

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageDetails.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{imageDetails.title}</Text>
      <Text style={styles.description}>{imageDetails.description || 'Sem descrição disponível.'}</Text>
      <Text style={styles.date}>Data: {imageDetails.date}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  date: {
    marginTop: 10,
    fontSize: 14,
    color: '#888',
  },
});

export default ImageDetailScreen;
