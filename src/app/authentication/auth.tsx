import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../components/ui/styles";
import { useAuth } from "../../lib/auth-context";

export default function createAccount() {
  const router = useRouter();
  const { register } = useAuth();
  const { user } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const handleAuth = async () => {
    try {
      const result = await register(email, password);
      if (result) {
        setError(result);
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      setError("Registration failed");
    }
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
          onChangeText={setEmail}
        ></TextInput>
        <TextInput
          style={styles.input}
          label="Password"
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
          onChangeText={setPassword}
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
