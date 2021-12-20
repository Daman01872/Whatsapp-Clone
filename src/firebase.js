import firebase from "firebase/compat/app"
 import "firebase/compat/auth"
import "firebase/compat/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDIJSJ9g8FgPK_cgj4g6UKF-ygpNeTB8y0",
    authDomain: "whatsapp-clone-65b1e.firebaseapp.com",
    projectId: "whatsapp-clone-65b1e",
    storageBucket: "whatsapp-clone-65b1e.appspot.com",
    messagingSenderId: "1067498671329",
    appId: "1:1067498671329:web:fd93200e330255d8227ba0"
  };

  //-------> This special line of code connects everything <-------
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //-------> This is for database connection...
  const db = firebaseApp.firestore();

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth,provider }
  export default db;