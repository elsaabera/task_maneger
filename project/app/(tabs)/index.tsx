import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { TaskList } from '@/components/TaskList';
import { AddTaskButton } from '@/components/AddTaskButton';
import { TaskForm } from '@/components/TaskForm';
import { useTasks } from '@/context/TaskContext';

export default function TasksScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { setFilter } = useTasks();

  // Ensure we're showing all tasks when we visit this screen
  React.useEffect(() => {
    setFilter('all');
  }, []);

  const openTaskForm = () => {
    setIsFormVisible(true);
  };

  const closeTaskForm = () => {
    setIsFormVisible(false);
  };

  return (
    <View style={styles.container}>
      <TaskList />
      <AddTaskButton onPress={openTaskForm} />
      
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeTaskForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalOverlay} />
          <TaskForm onClose={closeTaskForm} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});