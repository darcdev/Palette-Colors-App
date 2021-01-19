import React from 'react';
import {Text, StyleSheet, FlatList} from 'react-native';
import ColorBox from '../components/ColorBox';

const renderColors = ({item}) => (
  <ColorBox colorName={item.colorName} colorHex={item.hexCode} />
);

const ColorPalette = ({route}) => {
  const {colors, paletteName} = route.params;
  return (
    <FlatList
      style={styles.container}
      data={colors}
      keyExtractor={({colorName}) => colorName}
      renderItem={renderColors}
      ListHeaderComponent={<Text style={styles.title}>{paletteName}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ColorPalette;
