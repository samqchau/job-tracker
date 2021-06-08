import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppList from '../components/AppList';
import { fetchUserApps } from '../actions/appActions';
import { DragDropContext } from 'react-beautiful-dnd';
import { USER_APPS_SUCCESS } from '../constants/appConstants';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userApps = useSelector((state) => state.userApps);
  const { apps } = userApps;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(fetchUserApps());
  }, [dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let appsCopy = apps;

    if (destination.droppableId === source.droppableId) {
      let listName = destination.droppableId;
      let arr = appsCopy[listName];
      let app = arr.splice(source.index, 1);
      app = app[0];

      if (source.index < destination.index) {
        for (let i = source.index; i < destination.index; i++) {
          arr[i].index = arr[i].index - 1;
        }
      } else {
        for (let i = destination.index; i < source.index; i++) {
          arr[i].index = arr[i].index + 1;
        }
      }
      app.index = destination.index;
      arr.splice(destination.index, 0, app);
      appsCopy[listName] = arr;
      dispatch({ type: USER_APPS_SUCCESS, payload: appsCopy });

      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppList name='wishlist' icon='far fa-star' nameNumValue={1} />
      <AppList name='applied' icon='far fa-file' nameNumValue={2} />
      <AppList name='phone' icon='fas fa-phone-square-alt' nameNumValue={3} />
      <AppList name='on site' icon='fas fa-map-marker-alt' nameNumValue={4} />
      <AppList name='offer' icon='fas fa-trophy' nameNumValue={5} />
      <AppList name='rejected' icon='far fa-thumbs-down' nameNumValue={6} />
    </DragDropContext>
  );
};

export default HomeScreen;
