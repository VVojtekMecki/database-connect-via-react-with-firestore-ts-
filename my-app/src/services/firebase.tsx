import {initializeApp} from 'firebase/app'
import {getFirestore, collection, getDocs} from 'firebase/firestore'

const firebaseConfig = {

    //here goes your firebase configuration
  };

  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//fetch all data from database (users)
async function getUsers(db: any) {
    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map(doc => doc.data());
    return usersList;
  }
  
  
  export {app, db} 