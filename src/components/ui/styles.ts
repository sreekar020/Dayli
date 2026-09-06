import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
  },
  box: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  error: {
    color: "#EF4444",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#8B5CF6",
  },
});
