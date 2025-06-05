import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { Task } from '@/types/task';
import { useTasks } from '@/context/TaskContext';
import { Swipeable } from 'react-native-gesture-handler';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(1)).current;
  
  // Update animations when task.completed changes
  useEffect(() => {
    if (task.completed) {
      Animated.sequence([
        Animated.timing(checkmarkScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(checkmarkScale, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [task.completed, checkmarkScale, titleOpacity]);

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => deleteTask(task.id)}
      >
        <Trash2 size={24} color="#FFFFFF" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.checkbox,
            task.completed ? styles.checkboxChecked : null,
          ]}
          onPress={() => toggleTask(task.id)}
          activeOpacity={0.7}
        >
          <Animated.View
            style={{
              transform: [{ scale: checkmarkScale }],
            }}
          >
            {task.completed && <Check size={16} color="#FFFFFF" />}
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: titleOpacity,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={1}
          >
            {task.title}
          </Animated.Text>
          {task.description ? (
            <Animated.Text
              style={[styles.description, { opacity: titleOpacity }]}
              numberOfLines={2}
            >
              {task.description}
            </Animated.Text>
          ) : null}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1E293B',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748B',
    marginTop: 4,
  },
  deleteAction: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
});