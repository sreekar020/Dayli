import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SplashScreen() {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: false,
        }),
        Animated.timing(progressAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [progressAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["20%", "85%"],
  });

  return (
    <View style={styles.container}>
      {/* Center Branding Content */}
      <View style={styles.centerContent}>
        {/* App Icon (Purple Squircle with White Flame) */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="fire" size={68} color="#FFFFFF" />
        </View>

        {/* App Title */}
        <Text style={styles.title}>Daily</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Small Habits</Text>
        <Text style={styles.tagline}>A Better You</Text>
      </View>

      {/* Bottom Loading Progress Bar & Status Text */}
      <View style={styles.bottomContent}>
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[styles.progressBarFill, { width: progressWidth }]}
          />
        </View>
        <Text style={styles.loadingText}>Building a better you...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: "#7C3AED",
    textAlign: "center",
    lineHeight: 28,
  },
  bottomContent: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  progressBarTrack: {
    width: 220,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E9D5FF",
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
    borderRadius: 3,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#8B5CF6",
    letterSpacing: 0.2,
  },
});
