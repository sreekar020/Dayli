import { View, Text, Pressable, ImageBackground } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import app_img from "@/assets/images/app image.jpg";
import { styles } from "@/styles/style";

const Explore = () => {
  const router = useRouter();
  return (
    <ImageBackground source={app_img} resizeMode="cover" style={styles.image}>
      <Pressable style={styles.container} onPress={() => router.back()}>
        <Text style={styles.text}>go back</Text>
      </Pressable>
    </ImageBackground>
  );
};

export default Explore;
