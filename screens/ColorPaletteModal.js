import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Switch,
} from 'react-native';
import {COLORS} from '../utils/extraColors';

const ColorPaletteModal = ({navigation}) => {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSubmit = useCallback(() => {
    if (!name) {
      return Alert.alert('Please enter a palette name');
    } else if (selectedColors.length < 3) {
      return Alert.alert('Please add at least 3 colors');
    }
    const newColorPalette = {
      paletteName: name,
      colors: selectedColors,
    };
    navigation.navigate('Home', {newColorPalette});
  }, [name, selectedColors]);

  const handleValueChange = useCallback((value, color) => {
    if (value === true) {
      setSelectedColors((colors) => [...colors, color]);
    } else {
      setSelectedColors((colors) =>
        colors.filter(
          (selectedColor) => color.colorName !== selectedColor.colorName,
        ),
      );
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Name of the palette</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Palette name"
        onChangeText={setName}
      />
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({item}) => (
          <View style={styles.color}>
            <Text>{item.colorName}</Text>
            <Switch
              value={
                !!selectedColors.find(
                  (color) => color.colorName === item.colorName,
                )
              }
              onValueChange={(selected) => {
                handleValueChange(selected, item);
              }}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  color: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});

export default ColorPaletteModal;
