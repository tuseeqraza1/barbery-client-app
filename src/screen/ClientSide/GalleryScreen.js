import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ImageView from 'react-native-image-viewing';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../../../config';

import LoadingIndicator from '../../components/LoadingIndicator';
import ImageGalleryCard from '../../components/ImageGalleryCard';
import colors from '../../styles/colors';

export default function GalleryScreen({ route: { params } }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const columns = 4;

  const getGallery = async () => {
    const res = await axios.get('/saloon/saloonCollections/' + params.id);

    setPhotos(
      res.data.map((val) => ({
        id: val._id,
        uri: `data:${val?.picture?.type};base64,${val?.picture?.data}`,
      })),
    );
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getGallery();
    return () => {};
  }, []);

  return (
    <>
      {loading && <LoadingIndicator />}
      <View style={styles.screen}>
        <FlatList
          style={{ flex: 1 }}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={photos}
          keyExtractor={(photo) => photo.id.toString()}
          renderItem={({ item, index }) => (
            <ImageGalleryCard
              image={item.uri}
              onPress={() => {
                setIsVisible(true);
                setImageIndex(index);
              }}
            />
          )}
        />
        <ImageView
          images={photos}
          imageIndex={imageIndex}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatScreen: {
    flex: 1,
    paddingTop: 10,
  },
});
