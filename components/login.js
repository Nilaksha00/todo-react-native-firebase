import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Todo");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={styles.linkText}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>No account? Create new</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "pink",
    borderWidth: 1,
    backgroundColor: "lightpink",
    margin: 10,
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
  linkText: {
    fontSize: 16,
    color: "blue",
  },
});

export default Login;
