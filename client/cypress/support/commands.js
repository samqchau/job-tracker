import '@testing-library/cypress/add-commands';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: 'AIzaSyAFR1OJZbSnm8KuINSeAUb-tmSiSa3uQ5g',
  authDomain: 'jobtrackr-9e291.firebaseapp.com',
  projectId: 'jobtrackr-9e291',
  storageBucket: 'jobtrackr-9e291.appspot.com',
  messagingSenderId: '322734507800',
  appId: '1:322734507800:web:0564323defd25f13fc006d',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
