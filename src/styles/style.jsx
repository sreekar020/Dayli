import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: "20%",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    alignItems: "center",
  },
  link: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "10%",
  },
  login: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    textAlign: "center",
    lineHeight: 40,
  },
});
