import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const SearchBar = ({searchQuery, onSearchChange}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={onSearchChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 0.5,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#fff',
    width: '80%',
  },
});

export default SearchBar;
