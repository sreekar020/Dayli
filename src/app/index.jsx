import { View, Text, ImageBackground } from "react-native";
import React from "react";
import app_img from "@/assets/images/app image.jpg";
import { styles } from "@/styles/style";
import { Link, useRouter } from "expo-router";
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
        <Text style={styles.text}>coffie shop</Text>
      </View>
    </ImageBackground>
  );
};
export default App;
