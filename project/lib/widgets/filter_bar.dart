import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/task_provider.dart';

class FilterBar extends StatelessWidget {
  const FilterBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<TaskProvider>(
      builder: (context, taskProvider, child) {
        return Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _FilterChip(
                label: 'All',
                selected: taskProvider.filter == 'all',
                onSelected: () => taskProvider.setFilter('all'),
              ),
              _FilterChip(
                label: 'Active',
                selected: taskProvider.filter == 'active',
                onSelected: () => taskProvider.setFilter('active'),
              ),
              _FilterChip(
                label: 'Completed',
                selected: taskProvider.filter == 'completed',
                onSelected: () => taskProvider.setFilter('completed'),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onSelected;

  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return FilterChip(
      label: Text(label),
      selected: selected,
      onSelected: (_) => onSelected(),
      showCheckmark: false,
    );
  }
}