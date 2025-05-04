import { StyleSheet, View } from "react-native";
import { theme } from "./theme";
import { ShoppingListItem } from "./components/shopping-list-item";

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingListItem name="Green Tea" />
      <ShoppingListItem name="Matcha" isCompleted={true} />
      <ShoppingListItem name="Coffee" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: "center",
  },
});
