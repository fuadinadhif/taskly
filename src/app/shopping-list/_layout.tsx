import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "../../constants/theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerRight: () => (
            <Link href={"/shopping-list/history"} asChild>
              <Pressable hitSlop={20}>
                <MaterialIcons
                  name="history"
                  size={30}
                  color={theme.colors.grey}
                />
              </Pressable>
            </Link>
          ),
          title: "Shopping List",
        }}
      />
      <Stack.Screen name="history" options={{ title: "History" }} />
    </Stack>
  );
}
