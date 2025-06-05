import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences.dart';
import '../models/task.dart';

class TaskProvider with ChangeNotifier {
  List<Task> _tasks = [];
  String _filter = 'all';

  List<Task> get tasks {
    switch (_filter) {
      case 'active':
        return _tasks.where((task) => !task.isCompleted).toList();
      case 'completed':
        return _tasks.where((task) => task.isCompleted).toList();
      default:
        return _tasks;
    }
  }

  String get filter => _filter;

  void setFilter(String filter) {
    _filter = filter;
    notifyListeners();
  }

  Future<void> loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final tasksJson = prefs.getString('tasks');
    if (tasksJson != null) {
      final List<dynamic> decoded = json.decode(tasksJson);
      _tasks = decoded.map((item) => Task.fromJson(item)).toList();
      notifyListeners();
    }
  }

  Future<void> _saveTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final encoded = json.encode(_tasks.map((task) => task.toJson()).toList());
    await prefs.setString('tasks', encoded);
  }

  void addTask(String title, [String? description]) {
    final task = Task(
      id: DateTime.now().toString(),
      title: title,
      description: description,
    );
    _tasks.insert(0, task);
    _saveTasks();
    notifyListeners();
  }

  void toggleTask(String id) {
    final taskIndex = _tasks.indexWhere((task) => task.id == id);
    if (taskIndex != -1) {
      _tasks[taskIndex] = _tasks[taskIndex].copyWith(
        isCompleted: !_tasks[taskIndex].isCompleted,
      );
      _saveTasks();
      notifyListeners();
    }
  }

  void deleteTask(String id) {
    _tasks.removeWhere((task) => task.id == id);
    _saveTasks();
    notifyListeners();
  }

  void clearCompletedTasks() {
    _tasks.removeWhere((task) => task.isCompleted);
    _saveTasks();
    notifyListeners();
  }
}