import  firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCs00MrKCUffeuMkPveaSqEYUhQmLoUEqk",
  authDomain: "society-app-user.firebaseapp.com",
  projectId: "society-app-user",
  storageBucket: "society-app-user.appspot.com",
  messagingSenderId: "297455937813",
  appId: "1:297455937813:web:a5707167ccce31a7a2211c"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore()