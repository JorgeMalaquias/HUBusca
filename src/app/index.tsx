import { Button, StatusBar } from "react-native";
import styled from "styled-components/native";
import {
  useFonts,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Controller, useForm } from "react-hook-form";
import { Link } from "expo-router";
import axios from "axios";
import { useState } from "react";
import { Loading } from "../components/loading";
import UserSearched from "../components/userSearched";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type FormData = {
  name: string;
};

export class User {
  public name: string;
  public login: string;
  public avatar_url: string;
  public location: string;
  constructor(
    name: string,
    login: string,
    avatar_url: string,
    location: string
  ) {
    this.name = name ?? "Dado não existente";
    this.login = login ?? "Dado não existente";
    this.avatar_url = avatar_url ?? "Sem foto";
    this.location = location ?? "Dado não existente";
  }
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_900Black,
  });
  const [user, setUser] = useState<User>({} as User);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${data.name}`
      );
      const { name, login, avatar_url, location } = response.data;
      const newUser = new User(name, login, avatar_url, location);
      setUser(newUser);
      const jsonValue = await AsyncStorage.getItem("users");
      if (jsonValue && Array.isArray(JSON.parse(jsonValue))) {
        const array: User[] = JSON.parse(jsonValue);
        array.push(newUser);
        await AsyncStorage.setItem("users", JSON.stringify(newUser));
      } else {
        await AsyncStorage.setItem("users", JSON.stringify([newUser]));
      }
    } catch (error) {
      alert(error);
    }
  };

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <StyledView>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
      <Form>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormTextInput
              placeholder="Digite o nome do usuário"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <WarningMessage>This is required.</WarningMessage>}
        <Button
          color="green"
          title="Pesquisar"
          onPress={handleSubmit(onSubmit)}
        />
      </Form>
      {user.login && (
        <UserSearched
          avatar_url={user.avatar_url}
          name={user.name}
          login={user.login}
          location={user.location}
        />
      )}
      <Link style={{ color: "white" }} href="/historicScreen">
        Go to historic
      </Link>
    </StyledView>
  );
}

const StyledView = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const WarningMessage = styled.Text`
  color: yellow;
  font-family: "Inter_300Light";
`;
const Form = styled.View``;

const FormTextInput = styled.TextInput`
  border: solid 1px green;
  background-color: white;
`;
