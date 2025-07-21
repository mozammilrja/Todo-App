'use client';

import React, { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { toggleTask, deleteTask, updateTask } from '@/features/tasks/tasksSlice';
import { removeTaskFromList, setMainFocus } from '@/features/lists/listsSlice';
import { CheckCircle2, Circle, X, Star, Edit2, Check } from 'lucide-react';
import { formatTime } from '@/utils/dragHelpers';

interface TaskItemProps {
  taskId: string;
  index: number;
  listId: string;
}

const TaskItem = ({ taskId, index, listId }: TaskItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  
  const task = useAppSelector((state) => state.tasks.tasks[taskId]);
  const list = useAppSelector((state) => state.lists.lists.find(l => l.id === listId));
  const mainFocus = useAppSelector((state) => state.lists.mainFocus);

  const handleToggle = useCallback(() => {
    dispatch(toggleTask(taskId));
  }, [dispatch, taskId]);

  const handleDelete = useCallback(() => {
    dispatch(deleteTask(taskId));
    dispatch(removeTaskFromList({ listId, taskId }));
  }, [dispatch, taskId, listId]);

  const handleSetMainFocus = useCallback(() => {
    if (mainFocus === taskId) {
      dispatch(setMainFocus(undefined));
    } else {
      dispatch(setMainFocus(taskId));
    }
  }, [dispatch, mainFocus, taskId]);

  const handleEdit = useCallback(() => {
    setEditTitle(task?.title || '');
    setIsEditing(true);
  }, [task?.title]);

  const handleSaveEdit = useCallback(() => {
    if (editTitle.trim() && editTitle !== task?.title) {
      dispatch(updateTask({
        id: taskId,
        updates: { title: editTitle.trim() }
      }));
    }
    setIsEditing(false);
  }, [dispatch, taskId, editTitle, task?.title]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  }, [handleSaveEdit]);

  if (!task || !list) return null;

  const isMainFocus = mainFocus === taskId;

  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-200 group ${
            snapshot.isDragging ? 'shadow-lg scale-105 rotate-2' : 'hover:shadow-md'
          } ${task.completed ? 'opacity-60' : ''} ${
            isMainFocus ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: list.color }}
              ></div>
              
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleSaveEdit}
                  className="text-sm font-medium flex-1 bg-transparent border-b border-purple-500 focus:outline-none"
                  autoFocus
                />
              ) : (
                <span 
                  className={`text-sm font-medium flex-1 ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                  onDoubleClick={handleEdit}
                >
                  {task.title}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {task.time && (
                <span className="text-xs text-gray-400 font-medium">
                  {formatTime(task.time)}
                </span>
              )}
              
              {isEditing ? (
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-600"
                  title="Save changes"
                >
                  <Check className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-blue-500 transition-all"
                    title="Edit task"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={handleSetMainFocus}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      isMainFocus ? 'opacity-100 text-yellow-500' : 'text-gray-300 hover:text-yellow-500'
                    }`}
                    title={isMainFocus ? 'Remove from main focus' : 'Set as main focus'}
                  >
                    <Star className={`w-4 h-4 ${isMainFocus ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleToggle}
                    className="text-gray-300 hover:text-green-500 transition-colors"
                    title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"
                    title="Delete task"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(TaskItem);