import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import UUID from 'react-native-uuid';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './components/SearchBar';

const App = () => {
  const [items, setItems] = useState([]);
  const [editStatus, editStatusChange] = useState(false);
  const [editItemDetail, editItemDetailChange] = useState({
    id: null,
    text: null,
  });
  const [checkedItems, checkedItemChange] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('items');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
        const storedCheckedItems = await AsyncStorage.getItem('checkedItems');
        if (storedCheckedItems) {
          checkedItemChange(JSON.parse(storedCheckedItems));
        }
      } catch (error) {
        console.log('Error loading items from AsyncStorage', error);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('items', JSON.stringify(items));
        await AsyncStorage.setItem(
          'checkedItems',
          JSON.stringify(checkedItems),
        );
      } catch (error) {
        console.log(
          'Error saving items or checked items to AsyncStorage',
          error,
        );
      }
    };
    saveItems();
  }, [items, checkedItems]);

  const deleteItem = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const saveEditItem = (id, text) => {
    setItems(prevItems => {
      return prevItems.map(item => (item.id === id ? {...item, text} : item));
    });
    editStatusChange(!editStatus);
  };

  const handleEditChange = text => {
    editItemDetailChange({id: editItemDetail.id, text});
  };

  const addItem = (text, category) => {
    if (!text.trim()) {
      Alert.alert('Please enter a todo!');
      return;
    }
    setItems(prevItems => [
      {id: UUID.v4(), text, category, isChecked: false},
      ...prevItems,
    ]);
  };

  const editItem = (id, text, category) => {
    editItemDetailChange({
      id,
      text,
      category,
    });
    return editStatusChange(!editStatus);
  };

  const itemChecked = (id, text) => {
    const isChecked = checkedItems.some(checkedItem => checkedItem.id === id);
    if (isChecked) {
      checkedItemChange(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      checkedItemChange(prevItems => [...prevItems, {id, text}]);
    }
  };

  const filteredItems = items.filter(
    item =>
      item.text &&
      typeof item.text === 'string' &&
      item.text.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Header title="Todo App" />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <AddItem addItem={addItem} existingItems={items} />
      <FlatList
        data={filteredItems}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItem={deleteItem}
            editItem={editItem}
            isEditing={editStatus}
            editItemDetail={editItemDetail}
            saveEditItem={saveEditItem}
            handleEditChange={handleEditChange}
            itemChecked={itemChecked}
            checkedItems={checkedItems}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
