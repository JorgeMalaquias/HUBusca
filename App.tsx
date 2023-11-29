import { StyleSheet, Text, View, StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  useFonts,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return;
  }
  return (
    <StyledView>
      <StyledText>Hello!</StyledText>
      <StatusBar barStyle="light-content" translucent />
    </StyledView>
  );
}

const StyledView = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.Text`
  color: #ff0000;
  font-family: "Inter_300Light";
`;
