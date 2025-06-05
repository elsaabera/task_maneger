import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ClipboardList } from 'lucide-react-native';
import { TaskFilter } from '@/types/task';

interface EmptyStateProps {
  filter: TaskFilter;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  let message = 'No tasks found';
  
  if (filter === 'active') {
    message = 'No active tasks';
  } else if (filter === 'completed') {
    message = 'No completed tasks';
  }

  return (
    <View style={styles.container}>
      <ClipboardList size={64} color="#94A3B8" />
      <Text style={styles.title}>{message}</Text>
      {filter === 'all' && (
        <Text style={styles.subtitle}>
          Add a new task to get started
        </Text>
      )}
      {filter === 'active' && (
        <Text style={styles.subtitle}>
          Your active tasks will appear here
        </Text>
      )}
      {filter === 'completed' && (
        <Text style={styles.subtitle}>
          Complete some tasks to see them here
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
});