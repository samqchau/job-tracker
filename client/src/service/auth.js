import firebase from '../config/firebase-config';

const socialMediaAuth = async (provider) => {
  try {
    let res = await firebase.auth().signInWithPopup(provider);
    console.log(res.user);
    return res.user;
  } catch (error) {
    return error;
  }
};

export default socialMediaAuth;
