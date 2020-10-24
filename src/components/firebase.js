import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDkk6MdO4zJCQ0KdGWgF2GffoUDG-YN8mc",
    authDomain: "discord-clone-4a7e6.firebaseapp.com",
    databaseURL: "https://discord-clone-4a7e6.firebaseio.com",
    projectId: "discord-clone-4a7e6",
    storageBucket: "discord-clone-4a7e6.appspot.com",
    messagingSenderId: "435455148822",
    appId: "1:435455148822:web:20a81ded4ff1ab9e57c637"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig)

const db=firebaseApp.firestore();
const auth= firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db;
