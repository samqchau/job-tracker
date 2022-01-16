import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';
import {
  userAppsReducer,
  postAppReducer,
  updateAppReducer,
  toolTipReducer,
} from '../reducers/appReducer';
import { notePostReducer } from '../reducers/noteReducer';

const reducer = combineReducers({
  userApps: userAppsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  postApp: postAppReducer,
  updateApp: updateAppReducer,
  notePost: notePostReducer,
  toolTip: toolTipReducer,
});

const userInfoFromStorage = sessionStorage.getItem('userInfo')
  ? JSON.parse(sessionStorage.getItem('userInfo'))
  : { id: null, email: null, token: null };

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  toolTip: false,
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
