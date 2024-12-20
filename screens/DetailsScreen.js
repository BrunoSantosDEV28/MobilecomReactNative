import React from 'react';
import { View, Text, Image } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { image } = route.params;

  return (
    <View>
      <Image source={{ uri: image.links[0].href }} style={{ width: 300, height: 300 }} />
      <Text>{image.data[0].title}</Text>
      <Text>{image.data[0].description}</Text>
    </View>
  );
};

export default DetailsScreen;
