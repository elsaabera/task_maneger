# Task Manager App

A beautifully designed task management application built with Flutter.

## Features

- Display a list of tasks with completion status
- Add new tasks with title and optional description
- Mark tasks as completed with visual feedback
- Swipe-to-delete task functionality
- Filter tasks (all, active, completed)
- Form validation for required fields
- Persistent storage using SharedPreferences
- Clean and modern Material Design 3 UI
- Smooth animations and transitions

## Getting Started

1. Ensure you have Flutter installed on your machine
2. Clone the repository
3. Run `flutter pub get` to install dependencies
4. Run `flutter run` to start the application

## Project Structure

```
lib/
├── models/
│   └── task.dart           # Task data model
├── providers/
│   └── task_provider.dart  # Task state management
├── screens/
│   └── home_screen.dart    # Main screen
├── widgets/
│   ├── add_task_modal.dart # New task form
│   ├── empty_state.dart    # Empty list view
│   ├── filter_bar.dart     # Task filtering
│   ├── task_item.dart      # Individual task
│   └── task_list.dart      # List of tasks
└── main.dart              # App entry point
```

## Dependencies

- provider: State management
- shared_preferences: Local storage
- google_fonts: Typography
- flutter_slidable: Swipe actions
- flutter_animate: Animations
