import 'package:flutter/material.dart';

class EmptyState extends StatelessWidget {
  final String filter;

  const EmptyState({
    super.key,
    required this.filter,
  });

  @override
  Widget build(BuildContext context) {
    String message = 'No tasks found';
    String subtitle = 'Add a new task to get started';

    switch (filter) {
      case 'active':
        message = 'No active tasks';
        subtitle = 'Your active tasks will appear here';
        break;
      case 'completed':
        message = 'No completed tasks';
        subtitle = 'Complete some tasks to see them here';
        break;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.assignment_outlined,
            size: 64,
            color: Colors.grey[400],
          ),
          const SizedBox(height: 16),
          Text(
            message,
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 8),
          Text(
            subtitle,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Colors.grey[600],
                ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}