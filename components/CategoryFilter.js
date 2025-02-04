import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CategoryFilter = ({onCategorySelect, selectedCategory}) => {
  const categories = ['All', 'General', 'Personal', 'Work'];

  useEffect(() => {
    // Set "All" as the default category if none is selected
    if (selectedCategory === null) {
      onCategorySelect('All');
    }
  }, [selectedCategory, onCategorySelect]);

  return (
    <View style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategory,
          ]}
          onPress={() => onCategorySelect(category)} // Update logic to select the category
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedCategory: {
    backgroundColor: 'darkslateblue',
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedCategoryText: {
    color: 'yellow',
  },
});

export default CategoryFilter;
