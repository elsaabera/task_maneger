import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { useTasks } from '@/context/TaskContext';
import { FilterBar } from './FilterBar';

export const TaskList: React.FC = () => {
  const { filteredTasks, filter, setFilter } = useTasks();

  return (
    <View style={styles.container}>
      <FilterBar currentFilter={filter} onFilterChange={setFilter} />
      
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState filter={filter} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    flexGrow: 1,
  },
});