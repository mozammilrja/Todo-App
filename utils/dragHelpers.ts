import { DropResult } from 'react-beautiful-dnd';

export const handleDragEnd = (
  result: DropResult,
  moveTask: Function,
  reorderTasks: Function,
  moveTaskToList: Function
) => {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  if (source.droppableId === destination.droppableId) {
    // Reordering within the same list
    reorderTasks({
      listId: source.droppableId,
      sourceIndex: source.index,
      destIndex: destination.index,
    });
  } else {
    // Moving between lists
    moveTask({
      taskId: draggableId,
      sourceListId: source.droppableId,
      destListId: destination.droppableId,
      sourceIndex: source.index,
      destIndex: destination.index,
    });
    
    moveTaskToList({
      taskId: draggableId,
      newListId: destination.droppableId,
    });
  }
};

export const formatTime = (time?: string): string => {
  if (!time) return '';
  
  // Convert 24-hour format to 12-hour format
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 || 12;
  
  return `${displayHour}:${minutes} ${ampm}`;
};