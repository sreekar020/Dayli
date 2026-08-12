import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../lib/auth-context";
import { databases } from "@/lib/appwrite";

const frequencies = ["Daily", "Weekly", "Monthly"];
type Frequency = (typeof frequencies)[number];
export default function AddHabbitsScreen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("Daily");
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  // const handleAddHabit = async () => {
  //   if (!user) return;

  //   await database.createDocument(Data)

  // }

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setTitle}
        style={styles.textinput}
        placeholder="Habit title"
        placeholderTextColor="#9CA3AF"
      />
      <TextInput onChangeText={setDescription}
        style={styles.textinput}
        placeholder="Habit description"
        placeholderTextColor="#9CA3AF"
      />
      <View style={styles.segmentedContainer}>
        {frequencies.map((freq) => (
          <Pressable
            onPress={() => setFrequency(freq)}
            key={freq}
            style={[
              styles.segmentedButton,
              frequency === freq && styles.selectedButton,
            ]}
          >
            <Text style={styles.buttonText}>{freq}</Text>
          </Pressable>
        ))}
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Feather
          name="plus-circle"
          size={20}
          color="#FFFFFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText} disabled={!title || !description || !frequency}>Add Habit</Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },
  textinput: {
    borderWidth: 1.5,
    borderColor: "#E9D5FF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginVertical: 8,
    fontSize: 16,
    width: "100%",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    width: "100%",
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  segmentedContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,

  },
  segmentedButton: {
    width: "27%",
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B5CF6",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  selectedButton: {
  backgroundColor: "#511da6ff",
},
});
