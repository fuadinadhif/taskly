import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  LayoutAnimation,
} from "react-native";
import { ShoppingListItem } from "../../components/shopping-list-item";

import { theme } from "../../constants/theme";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from "../../utils/storage";

interface ShoppingItem {
  id: number;
  name: string;
  createdAt: Date;
  lastUpdatedAt?: Date;
}

export default function Index() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[] | null>(null);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    async function getShoppingList() {
      const data = await getFromStorage("shopping-list");
      if (data) {
        setShoppingList(data);
      }
    }

    getShoppingList();
  }, []);

  function handleSubmit() {
    if (newItem) {
      let newShoppingList = [
        { id: Date.now(), name: newItem, createdAt: new Date(Date.now()) },
      ];

      if (shoppingList) {
        newShoppingList = [...newShoppingList, ...shoppingList];
      }

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage("shopping-list", newShoppingList);
    }

    setNewItem("");
  }

  function handleDelete(id: number) {
    if (shoppingList) {
      const filteredItem = shoppingList.filter((item) => item.id !== id);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(filteredItem);
      saveToStorage("shopping-list", filteredItem);
    }
  }

  function handlePress(id: number) {
    if (shoppingList) {
      const newShoppingList = shoppingList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            lastUpdatedAt: item.lastUpdatedAt
              ? undefined
              : new Date(Date.now()),
          };
        } else {
          return item;
        }
      });

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList(newShoppingList);
      saveToStorage("shopping-list", newShoppingList);
    }
  }

  function orderList(shoppingList: ShoppingItem[] | null) {
    if (!shoppingList || shoppingList.length === 0) return null;

    return shoppingList.sort((item1, item2) => {
      if (item1.lastUpdatedAt && item2.lastUpdatedAt) {
        return (
          new Date(item2.lastUpdatedAt).getTime() -
          new Date(item1.lastUpdatedAt).getTime()
        );
      }

      if (item1.lastUpdatedAt && !item2.lastUpdatedAt) {
        return 1;
      }

      if (!item1.lastUpdatedAt && item2.lastUpdatedAt) {
        return -1;
      }

      // if (!item1.lastUpdatedAt && !item2.lastUpdatedAt) {
      //   return item2.createdAt.getTime() - item1.createdAt.getTime();
      // }

      return 0;
    });
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.g Coffee"
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      }
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your list is empty</Text>
        </View>
      }
      data={orderList(shoppingList)}
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          isCompleted={item.lastUpdatedAt}
          onDelete={() => handleDelete(item.id)}
          onPress={() => handlePress(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: { paddingTop: 12 },
  listEmptyContainer: { paddingHorizontal: 18 },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colors.lightGrey,
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginBottom: 12,
    fontSize: 18,
    backgroundColor: theme.colors.white,
  },
});
