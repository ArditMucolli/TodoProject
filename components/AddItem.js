import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import TodoModal from './TodoModal';

const AddItem = ({addItem}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddItem = () => {
    setModalVisible(true);
  };

  const confirmAddItem = () => {
    if (!text.trim()) {
      Alert.alert('Please enter a todo!');
      return;
    }
    addItem(text, category);
    setText('');
    setCategory('General');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleAddItem}>
        <Text style={styles.btnText}>Add Todo</Text>
      </TouchableOpacity>
      <TodoModal
        visible={modalVisible}
        text={text}
        setText={setText}
        category={category}
        setCategory={setCategory}
        onCancel={() => setModalVisible(false)}
        onConfirm={confirmAddItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    backgroundColor: 'darkslateblue',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddItem;
