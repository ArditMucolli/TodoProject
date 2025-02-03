import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Alert,
  Text,
} from 'react-native';

const AddItem = ({addItem}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('General');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddItem = () => {
    if (!text.trim()) {
      Alert.alert('Please enter a todo!');
      return;
    }

    setModalVisible(true);
  };

  const confirmAddItem = () => {
    addItem(text, category);
    setText('');
    setCategory('General');
    setModalVisible(false);
  };

  return (
    <View>
      <TextInput
        placeholder="Add Todo..."
        style={styles.input}
        onChangeText={setText}
        value={text}
      />
      <Text style={styles.categoryText}>Select Category:</Text>
      <View style={styles.categoryButtons}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'General' && styles.selectedCategory,
          ]}
          onPress={() => setCategory('General')}>
          <Text style={styles.categoryButtonText}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'Personal' && styles.selectedCategory,
          ]}
          onPress={() => setCategory('Personal')}>
          <Text style={styles.categoryButtonText}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            category === 'Work' && styles.selectedCategory,
          ]}
          onPress={() => setCategory('Work')}>
          <Text style={styles.categoryButtonText}>Work</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleAddItem}>
        <Text style={styles.btnText}>Add Todo</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Are you sure you want to add this todo?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={confirmAddItem} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 8,
    margin: 5,
  },
  btn: {
    backgroundColor: 'darkslateblue',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  categoryText: {
    padding: 10,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  categoryButtons: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedCategory: {
    backgroundColor: 'darkslateblue',
  },
});

export default AddItem;
