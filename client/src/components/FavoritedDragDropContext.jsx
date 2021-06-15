import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

const FavoritedDragDropContext = ({ children }) => {
  return <DragDropContext>{children}</DragDropContext>;
};

export default FavoritedDragDropContext;
