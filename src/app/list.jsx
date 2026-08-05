import React from "react";
import { styles } from "@/styles/style";
import { View, Text, ImageBackground } from "react-native";
import app_img from "@/assets/images/app image.jpg";

const list = () => {
  return (
    <ImageBackground source={app_img} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.text}>list</Text>
      </View>
    </ImageBackground>
  );
};

export default list;
