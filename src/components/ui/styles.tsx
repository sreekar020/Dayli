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
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#F3E8FF",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#1F2937",
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  input: {
    marginBottom: 16,
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  button: {
    marginTop: 8,
    marginBottom: 12,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#8B5CF6",
    paddingVertical: 4,
  },
  error: {
    color: "#EF4444",
    marginBottom: 12,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },

  text: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    color: "#4B5563",
    fontSize: 16,
  },
  homebutton: {
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#FEE2E2",
    paddingVertical: 4,
    width: "50%",
  },
});
