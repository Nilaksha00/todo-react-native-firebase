import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Todo = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>To-do App</Text>
          <TouchableOpacity
            onPress={() => {
              auth.signOut();
              navigation.navigate("Login");
            }}
          >
            <Image
              style={styles.logoutIcon}
              source={require("../assets/logout.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <AddTodo />
          <TodoList />
        </View>
      </View>
    </SafeAreaView>
  );
};

function AddTodo() {
  const [task, setTask] = useState("");
  const taskRef = collection(db, "tasks");

  const handleAdd = async () => {
    addDoc(taskRef, {
      name: task,
      isComplete: false,
    });
    setTask("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Enter your task"
        onChangeText={(text) => setTask(text)}
        value={task}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function TodoList() {
  const [tasksList, setTasksList] = useState([]);
  const [toogleComplete, setToogleComplete] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const ref = query(collection(db, "tasks"));
      const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTasksList(list);
      });
      return unsubscribe;
    };
    getTasks();
  }, []);

  return (
    <ScrollView style={styles.listContainer}>
      {tasksList.map((task, index) => {
        return (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemName}>{task.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  let taskRef = doc(db, "tasks", task.id);
                  updateDoc(taskRef, {
                    isComplete: !task.isComplete,
                  });
                }}
              >
                {task.isComplete ? (
                  ""
                ) : (
                  <Image
                    source={require("../assets/checkbox.png")}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  let taskRef = doc(db, "tasks", task.id);
                  deleteDoc(taskRef);
                }}
              >
                <Image
                  source={require("../assets/delete.png")}
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: 300,
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
    paddingHorizontal: 22,
    margin: 10,
    borderRadius: 5,
  },
  listContainer: {
    flexDirection: "column",
    backgroundColor: "lightyellow",
    height: "100%",
    padding: 10,
    borderRadius: 5,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "light",
    maxWidth: 250,
  },
  checkbox: {
    alignSelf: "center",
    height: 20,
    width: 20,
  },
  deleteIcon: {
    height: 30,
    width: 30,
    marginHorizontal: 10,
    alignSelf: "center",
    marginVertical: 5,
  },
  checkIcon: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  logoutIcon: {
    height: 40,
    width: 40,
    marginVertical: 10,
  },
});

export default Todo;
