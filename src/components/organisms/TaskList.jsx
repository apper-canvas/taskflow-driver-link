import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, onArchive }) => {
  return (
    <motion.div layout className="space-y-3">
      <AnimatePresence>
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: index * 0.05 }}
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
              onArchive={onArchive}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;