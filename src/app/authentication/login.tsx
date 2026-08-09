import { useRouter } from "expo-router";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "./styles";

export default function Login() {
  const router = useRouter();
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title} variant="headlineMedium">
          Login
        </Text>

        <TextInput
          style={styles.input}
          label="Email"
          placeholder="example@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          mode="outlined"
        ></TextInput>
        <TextInput
          style={styles.input}
          label="Password"
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
        ></TextInput>

        <Button mode="contained" style={styles.button}>
          Sign In
        </Button>
        <Button
          mode="text"
          onPress={() => router.replace("/authentication/auth")}
        >
          Don't have an Account ? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
