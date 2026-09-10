import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../components/ui/styles";
import { useAuth } from "../../lib/auth-context";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const validForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      setError("Email address is required");
      return false;
    } else if (!emailRegex.test(email.trim())) {
      setError("Enter a valid email address");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validForm()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await login(email, password);
      if (result) {
        setError(result);
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      setError("Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
          activeOutlineColor="#8B5CF6"
          outlineColor="#E9D5FF"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          label="Password"
          autoCapitalize="none"
          keyboardType="default"
          mode="outlined"
          secureTextEntry={!showPassword}
          activeOutlineColor="#8B5CF6"
          outlineColor="#E9D5FF"
          onChangeText={setPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleLogin}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        <Button
          mode="text"
          textColor="#8B5CF6"
          disabled={isSubmitting}
          onPress={() => router.replace("/authentication/auth")}
        >
          Don't have an Account ? Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
