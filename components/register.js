import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Login");
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
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        disabled={!email || !password}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={styles.linkText}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>Already have an account? Login</Text>
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
    height: 40,
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

export default Register;
