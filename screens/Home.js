import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, StyleSheet, RefreshControl} from 'react-native';
import PalettePreview from '../components/PalletePreview';

const URL = 'https://color-palette-api.kadikraman.now.sh/palettes';

const Home = ({navigation}) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const apicolors = useCallback(async () => {
    let response = await fetch(URL);
    if (response.ok) {
      const colors = await response.json();
      setColorPalettes(colors);
    }
  }, []);

  useEffect(() => {
    apicolors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefreshing = useCallback(async () => {
    setIsRefreshing(true);
    await apicolors();
    setIsRefreshing(false);
  }, []);

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({item}) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefreshing}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
});
export default Home;
