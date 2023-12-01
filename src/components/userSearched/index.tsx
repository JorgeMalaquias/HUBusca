import styled from "styled-components/native";
import {
  useFonts,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";

const windowDimensions = Dimensions.get("window");
type User = {
  name: string;
  login: string;
  avatar_url: string;
  location: string;
};

export default function UserSearched(props: User) {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  });
  return (
    <Container
      $windowWidth={dimensions.window.width}
      $windowHeight={dimensions.window.height}
    >
      {/* <Image source={require(props.avatar_url)} alt="uer_photo" />*/}
      <View>
        <Info>{props.name}</Info>
        <Info>{props.login}</Info>
        <Info>{props.location}</Info>
      </View>
    </Container>
  );
}

const Container = styled.View<{
  $windowWidth: number;
  $windowHeight: number;
}>`
  width: ${(props) => props.$windowWidth * 0.7};
  height: ${(props) => props.$windowHeight * 0.15};
  background-color: green;
`;

const Info = styled.Text`
  color: white;
`;
