import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskFilter } from '@/types/task';

interface FilterBarProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'all' ? styles.activeFilter : null,
        ]}
        onPress={() => onFilterChange('all')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === 'all' ? styles.activeFilterText : null,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'active' ? styles.activeFilter : null,
        ]}
        onPress={() => onFilterChange('active')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === 'active' ? styles.activeFilterText : null,
          ]}
        >
          Active
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.filterButton,
          currentFilter === 'completed' ? styles.activeFilter : null,
        ]}
        onPress={() => onFilterChange('completed')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.filterText,
            currentFilter === 'completed' ? styles.activeFilterText : null,
          ]}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeFilter: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748B',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
});