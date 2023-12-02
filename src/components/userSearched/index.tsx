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
      <View>
        <Info>Nome: {props.name}</Info>
        <Info>Login: {props.login}</Info>
        <Info>Localização: {props.location}</Info>
      </View>
      <Image
        style={{ width: 70, height: 70 }}
        source={{ uri: props.avatar_url }}
        alt="user_photo"
      />
    </Container>
  );
}

const Container = styled.View<{
  $windowWidth: number;
  $windowHeight: number;
}>`
  width: ${(props) => Math.floor(props.$windowWidth * 0.7)};
  height: ${(props) => Math.floor(props.$windowHeight * 0.15)};
  background-color: green;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
`;

const Info = styled.Text`
  color: white;
`;
