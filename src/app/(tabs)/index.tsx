import { View, Text } from "react-native";
import { styles } from "../../components/ui/styles";
import { useAuth } from "../../lib/auth-context";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  const { Logout } = useAuth();
  const { user } = useAuth();
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Home Screen</Text>
      <Text style={styles.text}>{user?.email}</Text>
      <Button style={styles.homebutton} icon="logout" onPress={Logout}>
        Log out
      </Button>
    </View>
  );
}
