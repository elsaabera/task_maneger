import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TaskList } from '@/components/TaskList';
import { useTasks } from '@/context/TaskContext';

export default function CompletedScreen() {
  const { setFilter } = useTasks();

  // Set filter to completed when this screen is focused
  useEffect(() => {
    setFilter('completed');
  }, []);

  return (
    <View style={styles.container}>
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});