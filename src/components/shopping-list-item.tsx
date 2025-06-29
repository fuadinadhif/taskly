import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { theme } from "../constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  name: string;
  isCompleted?: Date;
  onDelete: () => void;
  onPress: () => void;
}

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onPress,
}: Props) {
  function handleDelete() {
    Alert.alert(
      `Are you sure you want to delete ${name.toLowerCase()}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
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
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Feather
          name={isCompleted ? "check-circle" : "circle"}
          size={24}
          color={isCompleted ? theme.colors.grey : theme.colors.cerulean}
        />
        <Text
          style={[styles.text, isCompleted ? styles.completedText : undefined]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colors.grey : theme.colors.red}
        />
      </TouchableOpacity>
    </Pressable>
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
  textContainer: {
    flexDirection: "row",
    gap: 12,
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
