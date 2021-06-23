import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import '../styles/demo.css';
import DemoAppList from '../components/DemoAppList';

const Demo = () => {
  const [apps, setApps] = useState([
    {
      id: 1,
      job_title: 'Software Engineer 1',
      company_name: 'Amazon',
      list: 'applied',
      favorited: false,
    },
  ]);

  const changeAppsTo = (apps) => {
    setApps(apps);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      let appsCopy = apps.map((app) => {
        return { ...app, list: destination.droppableId };
      });
      setApps(appsCopy);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <DemoAppList
          name='applied'
          icon='far fa-paper-plane'
          apps={apps}
          setApps={changeAppsTo}
        />
        <DemoAppList
          name='offer accepted'
          icon='fas fa-award'
          apps={apps}
          setApps={changeAppsTo}
        />
      </DragDropContext>
    </>
  );
};

export default Demo;
