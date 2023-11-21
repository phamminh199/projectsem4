
import firebase from 'firebase/compat/app';

import "firebase/compat/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPWZSev-ZS6wCdpkVfyuxLCC5yobGOsJo",
  authDomain: "db-picture-aspnet-reactjs.firebaseapp.com",
  databaseURL: "https://db-picture-aspnet-reactjs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "db-picture-aspnet-reactjs",
  storageBucket: "db-picture-aspnet-reactjs.appspot.com",
  messagingSenderId: "196604723610",
  appId: "1:196604723610:web:0f1c48426af67d4680fa23",
  measurementId: "G-BC1FVL5TKH"
};
function listAll(folder) {
  const storageRef = firebase.storage().ref();

  var listRef = storageRef.child(folder);

  listRef
    .listAll()
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        
      });
      res.items.forEach((itemRef) => {
        console.log("itemRef: " + itemRef);
        itemRef.getDownloadURL().then((url) => {
          console.log("download url: " + url);
        });
      });
    })
    .catch((error) => {
      console.log(error)
  })
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const projectStorage = firebase.storage();

export { projectStorage, firebase as default };

/*
yarn add firebase@9.13.0
https://firebase.google.com/docs/web/modular-upgrade
*/

