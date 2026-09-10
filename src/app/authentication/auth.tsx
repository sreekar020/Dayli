import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../../components/ui/styles";
import { useAuth } from "../../lib/auth-context";

export default function CreateAccount() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const validForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!email.trim()) {
      setError("Email address is required");
      return false;
    } else if (!emailRegex.test(email.trim())) {
      setError("Enter a valid email address");
      return false;
    }
    const passwordRegex = /^(?=.{8,}$).*[^A-Za-z0-9].*$/;
    if (!password) {
      setError("Enter password");
      return false;
    } else if (password.length < 8) {
      setError("Minimum 8 characters required");
      return false;
    } else if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters with one special character");
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!validForm()) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await register(email, password, name.trim());
      if (result) {
        setError(result);
      } else {
        router.replace("/(tabs)");
      }
    } catch (error) {
      setError("Registration failed");
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
          Create Account
        </Text>

        <TextInput
          style={styles.input}
          label="Full Name"
          placeholder="John Doe"
          autoCapitalize="words"
          returnKeyType="next"
          mode="outlined"
          activeOutlineColor="#8B5CF6"
          outlineColor="#E9D5FF"
          onChangeText={setName}
        />
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

        {error && <Text style={styles.error}>{error}</Text>}

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleAuth}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <Button
          mode="text"
          textColor="#8B5CF6"
          disabled={isSubmitting}
          onPress={() => router.replace("/authentication/login")}
        >
          Already have an Account ? Sign In
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
