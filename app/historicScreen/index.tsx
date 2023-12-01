import { ScrollView, StatusBar, Text, TextInput } from "react-native";
import styled from "styled-components/native";
import {
  useFonts,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function Historic() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return;
  }
  return (
    <StyledView>
      <Text style={{ color: "white" }}>Historic page</Text>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
    </StyledView>
  );
}

const StyledView = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: space-between;
`;
const StyledText = styled.Text`
  color: #ff0000;
  font-family: "Inter_300Light";
`;
