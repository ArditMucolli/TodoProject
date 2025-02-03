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
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddItem = () => {
    if (!text.trim()) {
      Alert.alert('Please enter a todo!');
      return;
    }

    setModalVisible(true);
  };

  const confirmAddItem = () => {
    addItem(text);
    setText('');
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
    backgroundColor: '#c2bad8',
    padding: 9,
    margin: 5,
  },
  btnText: {
    color: 'darkslateblue',
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
});

export default AddItem;
