import { StyleSheet, View } from "react-native";
import { ShoppingListItem } from "../../components/shopping-list-item";

import { theme } from "../../constants/theme";

export default function Index() {
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
