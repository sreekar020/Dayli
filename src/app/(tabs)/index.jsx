import app_img from "@/assets/images/app image.jpg";
import { styles } from "@/styles/style";
import { Link } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
const App = () => {
  return (
    <ImageBackground source={app_img} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Link href="/list" style={styles.link}>
          {" "}
          List{" "}
        </Link>
        <Link href="/explore" style={styles.link}>
          Explore
        </Link>
        <Link href="/login" style={styles.login}>
          login
        </Link>
        <Text style={styles.text}>coffie shop</Text>
      </View>
    </ImageBackground>
  );
};
export default App;
