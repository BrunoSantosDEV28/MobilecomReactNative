import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, Button, StyleSheet, TextInput, RefreshControl, ProgressBarAndroid } from 'react-native';
import { fetchImagesByAstronomicalBody } from '../api/nasaApi';
import ImageCard from '../components/ImageCard';

const HomeScreen = ({ navigation }) => {
  const [astro, setAstro] = useState('earth'); 
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalItems, setTotalItems] = useState(0); 

  
  const loadImages = async (pageNum = page) => {
    setLoading(true);
    const data = await fetchImagesByAstronomicalBody(astro, pageNum);
    if (data.length > 0) {
      setImages(prevImages => [...prevImages, ...data]);
      setPage(pageNum); 
    }
    setLoading(false);
  };

  
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setImages([]); 
    setPage(1); 
    await loadImages(1);
    setIsRefreshing(false);
  }, [astro]);

  
  const handleLoadMore = () => {
    if (!loading) {
      loadImages(page + 1);
    }
  };

  
  useEffect(() => {
    loadImages();
  }, [astro]);

  
  const calculateProgress = () => {
    const percentage = (images.length / totalItems) * 100;
    return percentage > 100 ? 100 : percentage;
  };

  
  const handleImagePress = (image) => {
   
    navigation.navigate('ImageDetail', { imageDetails: image });
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    >
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          value={astro}
          onChangeText={setAstro}
          placeholder="Escolha um astro (ex: earth, moon)"
        />
        <Button title="Carregar Imagens" onPress={() => loadImages(1)} />
      </View>

      {loading && <Text>Carregando...</Text>}

      <Text style={styles.title}>Imagens de {astro}</Text>

      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={calculateProgress() / 100}
        style={styles.progressBar}
      />

      {images.length === 0 ? (
        <Text>Não há imagens disponíveis para {astro}.</Text>
      ) : (
        images.map((image, index) => (
          <ImageCard
            key={index}
            title={image.title}
            imageUrl={image.imageUrl}
            onPress={() => handleImagePress(image)} 
          />
        ))
      )}

      <View style={styles.pagination}>
        <Text>Página {page}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    marginVertical: 20,
    height: 10,
    backgroundColor: '#ddd',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HomeScreen;
