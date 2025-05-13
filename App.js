import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

<Ionicons name="trash-bin" size={24} color="#ff5c5c" />
// Importer les icônes de Ionicons

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Ajouter une tâche
  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTaskList([
        ...taskList,
        { id: Date.now().toString(), title: task, done: false }
      ]);
      setTask('');
    }
  };

  // Supprimer une tâche
  const handleDeleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  // Marquer une tâche comme terminée
  const toggleTaskDone = (id) => {
    const updatedList = taskList.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    setTaskList(updatedList);
  };

  // Sauvegarder dans AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  // Charger depuis AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      const data = await AsyncStorage.getItem('tasks');
      if (data) {
        setTaskList(JSON.parse(data));
      }
    };
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Ma To-Do Liste</Text>

      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche..."
        value={task}
        onChangeText={setTask}
      />

      <Button title="Ajouter" onPress={handleAddTask} />

      <FlatList
  data={taskList}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.taskRow}>
      <Ionicons
        name={item.done ? "checkmark-circle" : "ellipse-outline"}
        size={24}
        color={item.done ? "green" : "gray"}
        onPress={() => toggleTaskDone(item.id)}
        style={{ marginRight: 10 }}
      />
      <Text
        style={[
          styles.taskItem,
          item.done && styles.taskDone
        ]}
        onPress={() => toggleTaskDone(item.id)}
      >
        {item.title}
      </Text>
      <Ionicons
        name="trash-bin"
        size={24}
        color="#ff5c5c"
        onPress={() => handleDeleteTask(item.id)}
      />
    </View>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskItem: {
    fontSize: 18,
    flex: 1, // important pour que le texte prenne l'espace libre
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
// App.js
  