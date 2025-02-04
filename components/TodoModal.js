import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
  Text,
} from 'react-native';

const TodoModal = ({
  visible,
  text,
  setText,
  category,
  setCategory,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter todo..."
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
          <Text style={styles.categoryText}>Select Category:</Text>
          <View style={styles.categoryButtons}>
            {['General', 'Personal', 'Work'].map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.selectedCategory,
                ]}
                onPress={() => setCategory(cat)}>
                <Text style={styles.categoryButtonText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.modalButtons}>
            <Button title="Cancel" onPress={onCancel} />
            <Button title="Confirm" onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 15,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    height: 50,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  categoryText: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  categoryButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 5,
    minWidth: 90,
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

export default TodoModal;
