import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PalettePreview from '../components/PalletePreview';
import {SOLARIZED, FRONTEND_MASTERS, RAINBOW} from '../utils/colors';

const COLOR_PALETTES = [
  {paletteName: 'Solarized', colors: SOLARIZED},
  {paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS},
  {paletteName: 'Rainbow', colors: RAINBOW},
];

const Home = ({navigation}) => {
  return (
    <FlatList
      style={styles.list}
      data={COLOR_PALETTES}
      keyExtractor={(item) => item.paletteName}
      renderItem={({item}) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
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
