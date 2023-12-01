import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View>
      <ActivityIndicator color="red" />
    </View>
  );
}
