import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "./styles";

export default function createAccount() {
  const router = useRouter();
  const [email, isEmail] = useState<string>("");
  const [password, isPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill all inputs");
      return;
    }
    if (password.length < 6) {
      setError("password length must be 6 characters");
      return;
    }
    setError(null);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title} variant="headlineMedium">
          Create Account
        </Text>

        <TextInput
          style={styles.input}
          label="Email"
          placeholder="example@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          mode="outlined"
          onChangeText={isEmail}
        ></TextInput>
        <TextInput
          style={styles.input}
          label="Password"
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
          onChangeText={isPassword}
        ></TextInput>
        {error && <Text style={styles.error}>{error}</Text>}
        <Button mode="contained" style={styles.button} onPress={handleAuth}>
          Sign UP
        </Button>
        <Button
          mode="text"
          onPress={() => router.replace("/authentication/login")}
        >
          Alredy have an Account ? Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
