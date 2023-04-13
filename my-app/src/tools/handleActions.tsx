import { doc, writeBatch } from "firebase/firestore";
import { db } from "../services/firebase";


//function that deletes user in database by it's id
const handleDelete = async (id: string) => {
    try 
    {
      const batch = writeBatch(db);
      const docRef = doc(db, "users", id);
      //await docRef.update({isDeleted: true});
      await batch.update(docRef, {isDeleted: true});
      await batch.commit();
    } 
    catch (error) 
    {
      console.log(error);
    }
  }


  export {handleDelete}