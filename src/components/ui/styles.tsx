import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3eafa",
  },
  box: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 18,
  },
  input: {
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  error: {
    color: "#941b1bff",
  },

  text: {
    textAlign: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: "black",
    fontSize: 18,
  },
});
