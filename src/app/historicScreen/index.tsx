import { StatusBar, Text } from "react-native";
import styled from "styled-components/native";
import {
  useFonts,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import UserSearched from "../../components/userSearched";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "..";

export default function Historic() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_900Black,
  });
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const getHistoric = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("users");
      if (jsonValue && Array.isArray(JSON.parse(jsonValue))) {
        const array: User[] = JSON.parse(jsonValue);
        setSearchedUsers(array);
      } else {
        alert("Erro ao acessar o histórico de pesquisa");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getHistoric();
  }, []);
  if (!fontsLoaded) {
    return;
  }
  return (
    <StyledView>
      <Text style={{ color: "white" }}>Historic page</Text>
      <Link style={{ color: "white" }} href="/">
        Voltar para tela principal
      </Link>
      {searchedUsers.map((searchedUser, index) => (
        <UserSearched
          key={index}
          name={searchedUser.name}
          login={searchedUser.login}
          avatar_url={searchedUser.avatar_url}
          location={searchedUser.location}
        />
      ))}
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
