import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTasks } from '@/context/TaskContext';
import { Trash2, Github, Mail, Info } from 'lucide-react-native';

export default function SettingsScreen() {
  const { tasks } = useTasks();
  
  const activeTasksCount = tasks.filter(t => !t.completed).length;
  const completedTasksCount = tasks.filter(t => t.completed).length;
  
  const confirmClearCompleted = () => {
    if (completedTasksCount === 0) {
      Alert.alert('No completed tasks', 'There are no completed tasks to clear.');
      return;
    }
    
    Alert.alert(
      'Clear Completed Tasks',
      'Are you sure you want to delete all completed tasks? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: () => {
            // In a real app, we would implement this functionality
            Alert.alert('Success', 'All completed tasks have been cleared.');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Summary</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{tasks.length}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{activeTasksCount}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedTasksCount}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <TouchableOpacity 
          style={styles.settingItem}
          onPress={confirmClearCompleted}
        >
          <Trash2 size={20} color="#EF4444" />
          <Text style={[styles.settingText, styles.dangerText]}>
            Clear Completed Tasks
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.settingItem}>
          <Info size={20} color="#3B82F6" />
          <Text style={styles.settingText}>
            Task Manager v1.0.0
          </Text>
        </View>
        
        <View style={styles.settingItem}>
          <Github size={20} color="#1E293B" />
          <Text style={styles.settingText}>
            github.com/username/task-manager
          </Text>
        </View>
        
        <View style={styles.settingItem}>
          <Mail size={20} color="#0EA5E9" />
          <Text style={styles.settingText}>
            support@taskmanager.app
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1E293B',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingText: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#1E293B',
    marginLeft: 12,
  },
  dangerText: {
    color: '#EF4444',
  },
});