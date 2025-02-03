import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ListItem = ({
  item,
  deleteItem,
  editItem,
  isEditing,
  editItemDetail,
  saveEditItem,
  handleEditChange,
  itemChecked,
  checkedItems,
}) => {
  const checked = checkedItems.filter(
    checkedItem => checkedItem.id === item.id,
  );

  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        {isEditing && editItemDetail.id === item.id ? (
          <TextInput
            placeholder="Edit Todo..."
            style={styles.editItemInput}
            value={editItemDetail.text}
            onChangeText={handleEditChange}
          />
        ) : (
          <View style={styles.textContainer}>
            <Text
              onPress={() => itemChecked(item.id, item.text)}
              style={
                checked.length ? styles.checkedItemText : styles.listItemText
              }>
              {item.text}
            </Text>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}

        <View style={styles.iconView}>
          {isEditing && editItemDetail.id === item.id ? (
            <Icon
              name="save"
              size={20}
              color="green"
              onPress={() => saveEditItem(item.id, editItemDetail.text)}
            />
          ) : (
            !checked.length && (
              <Icon
                name="pencil"
                size={20}
                color="blue"
                onPress={() => editItem(item.id, item.text, item.category)}
              />
            )
          )}
          <Icon
            name="remove"
            size={20}
            color="firebrick"
            onPress={() => deleteItem(item.id)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 18,
    flex: 1,
  },
  checkedItemText: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: 'green',
    flex: 1,
  },
  categoryText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
    flexShrink: 1,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 70,
  },
  editItemInput: {
    padding: 0,
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ListItem;
