import React, { ReactElement, useState, useEffect } from 'react';
import { Alert,View,Text, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity}from 'react-native';
import { List, Title, Text as PaperText, Button as PaperButton, TextInput as PaperTextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Task } from '../app/interface/Todo'; 
import { fetchTasks, addTask, updateTask, deleteTask } from '../app/service/TaskService'; 


export const TodoApp = () : ReactElement => {
    
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [priority, setPriority] = useState<'haute' | 'moyenne' | 'basse'>(); 
  const [isAscendingPriority, setIsAscendingPriority] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error: unknown) {
        error instanceof Error 
               ? Alert.alert('Erreur', error.message) 
               : Alert.alert('Erreur lors du chargement des tâches');
      }
     
    };
    loadTasks();
  }, []);


  const handleAddTask = async () => {
    if (!newTaskTitle) {
      Alert.alert('Veuillez entrer un titre de tâche.');
      return;
    }
    if (!priority) {
        Alert.alert('Veuillez sélectionner une priorité de tâche');
        return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      createdAt: new Date(),
      priority : priority,

    };
    
    try {
      const addedTask = await addTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTaskTitle('');
      setPriority(undefined);
    } catch (error: unknown) {
        if(error instanceof Error) {
            Alert.alert('Erreur ', error.message);
        } else {
            Alert.alert("Erreur lors de la création de la tâche.");

        }
    }
  };

 
  const markTaskAsCompleted = async (taskId: number, completed: boolean) => {
    try {
      await updateTask(taskId, completed);
      setTasks((prevTasks) =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed } : task
        )
      );
    } catch (error: unknown) {
        if(error instanceof Error) {
            Alert.alert('Erreur ', error.message);
        }else {
            Alert.alert("Une erreur s'est produite lors de la mise à jour de la tâche. Veuillez réessayer.");
        }
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
    } catch (error: unknown) {
        if(error instanceof Error) {
            Alert.alert('Erreur', error.message);
        }else {
            Alert.alert('Erreur lors de la suppression de la tâche ');
        }
    }
  };
  /* Algorithme pour trier une liste de nombres entiers en ordre croissant,
      cependant, je préfère utiliser les méthodes existantes de JavaScript 
      pour trier les tâches par ordre alphabétique.
  */
  function sortListNumbers(numbers: number[]): number[] {

    const sortedArray = [...numbers]; //Crée une copie du tableau d'origine en utilisant le spread operator
    const length = sortedArray.length;

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                const temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
            }
        }
    }

    return sortedArray;
}


const sortTasksAlphabet = () => {
    // Vérifie si les tâches sont déjà triées par ordre alphabétique
    const isSorted = tasks.every((task, index) => {
      return index === 0 || task.title.localeCompare(tasks[index - 1].title) >= 0;
    });

    if (isSorted) {
      Alert.alert("Info", "Les tâches sont déjà triées par ordre alphabétique.");
      return;
    }
    // Trie les tâches par ordre alphabétique
    const sortedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
    setTasks(sortedTasks);
  };  

  // Trie les tâches en fonction de leur priorité
  const sortTasksByPriority = () => {

    if (!tasks || tasks.length === 0) {
        Alert.alert('Erreur', 'Aucune liste à trier.');
        return;
      }
    const priorityOrder = { haute: 1, moyenne: 2, basse: 3 };
  
    const sortedTasks = [...tasks].sort((a, b) =>
        isAscendingPriority
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      );
   
    setTasks(sortedTasks); 
    setIsAscendingPriority(!isAscendingPriority); 
  };
  
    return (
        <>
          <StatusBar backgroundColor="#208AEC" />
          <SafeAreaView style={Styles.container}>
            <View style={Styles.header}>
              <PaperText style={Styles.header_text_bold}>
                {'To-do List'}
              </PaperText>
            </View>
            <View style={Styles.wrapper}>
              <View style={Styles.flex_between}>
                <Title>Tâches</Title>
              </View>
      
              <View style={Styles.create_todo_container}>
                <PaperTextInput
                  value={newTaskTitle}
                  onChangeText={text => setNewTaskTitle(text)}
                  label="Nouvelle tâche"
                  mode="outlined"
                  style={Styles.create_todo_input}
                />
                <Text style={Styles.label}>Priorité</Text>
                <Picker
                    selectedValue={priority}
                    onValueChange={(itemValue) => setPriority(itemValue)}
                    style = {Styles.picker}
                 >
                    <Picker.Item label="Sélectionnez la priorité" value={null} />
                    <Picker.Item label="Haute" value="haute" />
                    <Picker.Item label="Moyenne" value="moyenne" />
                    <Picker.Item label="Basse" value="basse" />
                </Picker>
                <PaperButton
                  onPress={handleAddTask}
                  mode="contained"
                  icon="plus"
                  buttonColor={'#208AEC'}
                  style={Styles.create_todo_button}>
                  {'Ajout'}
                </PaperButton>
              </View>
      
              <View style={Styles.buttonContainer}>
                <PaperButton
                  onPress={sortTasksByPriority}
                  mode="contained"
                  icon="sort"
                  buttonColor={'#208AEC'}
                  style={Styles.button}>
                  {'Tri par priorité'}
                </PaperButton>
                <PaperButton
                  onPress={sortTasksAlphabet}
                  mode="contained"
                  icon="sort"
                  buttonColor={'#208AEC'}
                  style={Styles.button}>
                  {'Trier ASC'}
                </PaperButton>
              </View>
      
              <ScrollView style={Styles.scrollView}>
                {tasks.length === 0 || tasks.every(task => task.completed) ? (
                    <Text style={Styles.emptyMessage}>Aucune tâche à faire</Text>) : (
                    tasks.map(task => (
                    <List.Item
                        key={task.id}
                        title={task.title}
                        titleStyle={task.completed ? Styles.todo_text_done : Styles.todo_text}
                        style={Styles.todo_item}
                        right={props => (
                        <>
                        {task.completed !== true && (
                        <TouchableOpacity onPress={() => markTaskAsCompleted(task.id, true)}>
                            <List.Icon {...props} icon="check" color={'#4CAF50'} />
                        </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
                        <List.Icon {...props} icon="close" color={'#ef5350'} />
                        </TouchableOpacity>
                    </>
                    )}
                />
                ))
            )}
            </ScrollView>
            </View>
          </SafeAreaView>
        </>
      );
      };
      
      export default TodoApp;
      
      const Styles = StyleSheet.create({
        container: {
          backgroundColor: '#FFF',
        },
        wrapper: {
          width: '90%',
          alignSelf: 'center',
          paddingBottom: 20, 
        },
        header: {
          alignItems: 'center',
          paddingTop: 50,
          paddingBottom: 20,
          backgroundColor: '#208AEC',
        },
        header_text_bold: {
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
        },
        flex_between: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10, 
        },
        create_todo_container: {
          flexDirection: 'row',
          marginBottom: 10, 
        },
        create_todo_input: {
          flex: 1,
          height: 40, 
          marginRight: 2, 
          marginBottom: 16, 
        },
        create_todo_button: {
          height: 40,
        },
        todo_item: {
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        },
        todo_text: {
          fontSize: 15,
        },
        todo_text_done: {
          color: 'rgba(0, 0, 0, 0.3)',
          fontSize: 15,
          textDecorationLine: 'line-through',
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10, 
        },
        button: {
          flex: 1,
          marginHorizontal: 5, 
          height: 45,
        },
        label: {
            marginBottom: 8, 
            marginVertical: 4,
            fontWeight: 'bold', 
            marginLeft:10,
          },
        picker: {
            height: 30,
            width: '10%'
         },
         emptyMessage: {
            textAlign: 'center',
            fontSize: 18,
            color: '#999',
            marginVertical: 20,
          },
        scrollView: {
          marginBottom: 20, 
        },
      });
      