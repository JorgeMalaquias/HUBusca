import {
  Button,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import styled from "styled-components/native";
import {
  useFonts,
  Inter_300Light,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Controller, useForm } from "react-hook-form";
import { Link } from "expo-router";

type FormData = {
  name: string;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_900Black,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });
  const onSubmit = (data: FormData) => console.log(data);

  if (!fontsLoaded) {
    return;
  }
  return (
    <StyledView>
      <StatusBar barStyle="light-content" backgroundColor="blue" />
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Digite o nome do usuário"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <Text>This is required.</Text>}
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
      <Link style={{ color: "white" }} href="/historic">
        Go to historic
      </Link>
    </StyledView>
  );
}

const StyledView = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: space-between;
`;
const StyledText = styled.Text`
  color: #ff0000;
  font-family: "Inter_300Light";
`;
const Form = styled.View``;
