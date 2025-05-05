import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  name: string;
  isCompleted?: boolean;
}

export function ShoppingListItem({ name, isCompleted }: Props) {
  function handleDelete() {
    Alert.alert(
      `Are you sure you want to delete ${name.toLowerCase()}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => console.log("Ok, deleting"),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  }
  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[styles.text, isCompleted ? styles.completedText : undefined]}
      >
        {name}
      </Text>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colors.grey : theme.colors.red}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: theme.colors.cerulean,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completedContainer: {
    backgroundColor: theme.colors.lightGrey,
    borderBottomColor: theme.colors.lightGrey,
  },
  text: {
    fontWeight: "200",
    fontSize: 18,
  },
  completedText: {
    color: theme.colors.grey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colors.grey,
  },
});
